from django.core.mail import EmailMessage, get_connection
from django.conf import settings
import logging
import sys

# Set up logging
logger = logging.getLogger(__name__)

def _debug_email_config():
    """Log email configuration for debugging (without exposing password)."""
    config = {
        'EMAIL_BACKEND': getattr(settings, 'EMAIL_BACKEND', 'NOT SET'),
        'EMAIL_HOST': getattr(settings, 'EMAIL_HOST', 'NOT SET'),
        'EMAIL_PORT': getattr(settings, 'EMAIL_PORT', 'NOT SET'),
        'EMAIL_USE_TLS': getattr(settings, 'EMAIL_USE_TLS', 'NOT SET'),
        'EMAIL_HOST_USER': getattr(settings, 'EMAIL_HOST_USER', 'NOT SET'),
        'EMAIL_HOST_PASSWORD': '***SET***' if getattr(settings, 'EMAIL_HOST_PASSWORD', None) else 'NOT SET',
        'SUBMISSION_NOTIFICATION_EMAILS': getattr(settings, 'SUBMISSION_NOTIFICATION_EMAILS', []),
    }
    logger.info(f"[DEBUG] Email configuration: {config}")
    print(f"[DEBUG] Email configuration: {config}", file=sys.stderr)
    return config



import threading

def _send_email_thread(email_message, context_name="Unknown"):
    """
    Internal function to send an email in a separate thread.
    """
    try:
        print(f"[DEBUG] Sending email for {context_name} in background thread...", file=sys.stderr)
        email_message.send(fail_silently=True)
        print(f"[DEBUG] Email for {context_name} sent successfully.", file=sys.stderr)
    except Exception as e:
        print(f"[DEBUG] Failed to send email for {context_name} in background thread: {e}", file=sys.stderr)


def send_admin_notification(user, competition, submission_text, submission_file):
    """
    Send email notification about a new submission to designated admin addresses.
    Runs in a background thread to prevent blocking the response.
    """
    print(f"[DEBUG] send_admin_notification called for user={user.username}, competition={competition.title}", file=sys.stderr)
    
    # Debug email configuration first
    config = _debug_email_config()
    
    # Check if email is properly configured
    if not config['EMAIL_HOST_USER'] or config['EMAIL_HOST_USER'] == 'NOT SET':
        print("[DEBUG] EMAIL_HOST_USER is not configured. Skipping email send.", file=sys.stderr)
        return
    
    if not config['EMAIL_HOST_PASSWORD'] or config['EMAIL_HOST_PASSWORD'] == 'NOT SET':
        print("[DEBUG] EMAIL_HOST_PASSWORD is not configured. Skipping email send.", file=sys.stderr)
        return
    
    recipient_list = getattr(settings, 'SUBMISSION_NOTIFICATION_EMAILS', [])
    if not recipient_list:
        print("[DEBUG] No SUBMISSION_NOTIFICATION_EMAILS configured. Skipping email send.", file=sys.stderr)
        return
    
    print(f"[DEBUG] Preparing to send to recipients: {recipient_list}", file=sys.stderr)

    subject = f"New Submission: {competition.title} by {user.get_full_name() or user.username}"

    message = f"""
A new submission has been received:

Submitter Information:
- Name: {user.get_full_name() or user.username}
- Email: {user.email}
- Username: {user.username}
- LinkedIn Profile: {user.linkedin_profile or 'Not provided'}

Competition Details:
- Title: {competition.title}
- Type: {competition.get_type_display()}
- Category: {competition.category}

Submission Details:
- Submission Text: {submission_text or 'No text provided'}

Please review the submission and take appropriate action.
    """

    try:
        print(f"[DEBUG] Creating EmailMessage...", file=sys.stderr)
        email = EmailMessage(
            subject=subject,
            body=message,
            from_email=settings.EMAIL_HOST_USER,
            to=recipient_list,
        )

        # Attach uploaded file (if any)
        # Note: We must read the file content here in the main thread because 
        # the file object might be closed or garbage collected in the thread.
        if submission_file:
            try:
                print(f"[DEBUG] Attaching file: {getattr(submission_file, 'name', 'unknown')}", file=sys.stderr)
                submission_file.seek(0)
                content = submission_file.read()
                filename = getattr(submission_file, 'name', 'attachment')
                content_type = getattr(submission_file, 'content_type', 'application/octet-stream')
                email.attach(filename, content, content_type)
                print(f"[DEBUG] File attached successfully", file=sys.stderr)
            except Exception as e:
                print(f"[DEBUG] Failed to attach submission file: {e}", file=sys.stderr)

        print(f"[DEBUG] Starting background thread for admin notification...", file=sys.stderr)
        thread = threading.Thread(target=_send_email_thread, args=(email, "Admin Notification"))
        thread.start()
        print(f"[DEBUG] Background thread started.", file=sys.stderr)
        
    except Exception as e:
        print(f"[DEBUG] Exception in send_admin_notification setup: {type(e).__name__}: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc(file=sys.stderr)


def send_user_confirmation(user, competition):
    """
    Send a confirmation email to the user who submitted.
    Runs in a background thread.
    """
    print(f"[DEBUG] send_user_confirmation called for user={user.username}", file=sys.stderr)
    
    if not user.email:
        print(f"[DEBUG] User {user.username} has no email address. Skipping confirmation.", file=sys.stderr)
        return

    # Check if email is properly configured
    if not getattr(settings, 'EMAIL_HOST_USER', None):
        print("[DEBUG] EMAIL_HOST_USER is not configured. Skipping user confirmation email.", file=sys.stderr)
        return

    subject = f"Submission Received: {competition.title}"

    message = f"""
Dear {user.get_full_name() or user.username},

Thank you for your submission to "{competition.title}".

We have successfully received your submission and it is currently under review. We will notify you of any updates.

Best regards,
The Innovation Hub Team
    """

    try:
        print(f"[DEBUG] Creating user confirmation email...", file=sys.stderr)
        email = EmailMessage(
            subject=subject,
            body=message,
            from_email=settings.EMAIL_HOST_USER,
            to=[user.email],
        )

        print(f"[DEBUG] Starting background thread for user confirmation...", file=sys.stderr)
        thread = threading.Thread(target=_send_email_thread, args=(email, f"User Confirmation ({user.email})"))
        thread.start()
        print(f"[DEBUG] Background thread started.", file=sys.stderr)
        
    except Exception as e:
        print(f"[DEBUG] Exception in send_user_confirmation setup: {type(e).__name__}: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc(file=sys.stderr)
