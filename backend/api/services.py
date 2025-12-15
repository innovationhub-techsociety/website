from django.core.mail import EmailMessage
from django.conf import settings
import os

def send_admin_notification(user, competition, submission_text, submission_file):
    """
    Send email notification about a new submission to designated admin addresses.
    """
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

    recipient_list = getattr(settings, 'SUBMISSION_NOTIFICATION_EMAILS', [])
    if not recipient_list:
        print("Warning: No SUBMISSION_NOTIFICATION_EMAILS configured.")
        return

    email = EmailMessage(
        subject=subject,
        body=message,
        from_email=settings.EMAIL_HOST_USER,
        to=recipient_list,
    )

    # Attach uploaded file (if any)
    if submission_file:
        try:
            # submission_file is an UploadedFile; read its content
            submission_file.seek(0)
            content = submission_file.read()
            filename = getattr(submission_file, 'name', 'attachment')
            content_type = getattr(submission_file, 'content_type', 'application/octet-stream')
            email.attach(filename, content, content_type)
        except Exception as e:
            print(f"Failed to attach submission file: {e}")

    try:
        email.send(fail_silently=False)
    except Exception as e:
        print(f"Failed to send admin notification email: {e}")


def send_user_confirmation(user, competition):
    """
    Send a confirmation email to the user who submitted.
    """
    if not user.email:
        print(f"User {user.username} has no email address. Skipping confirmation.")
        return

    subject = f"Submission Received: {competition.title}"

    message = f"""
Dear {user.get_full_name() or user.username},

Thank you for your submission to "{competition.title}".

We have successfully received your submission and it is currently under review. We will notify you of any updates.

Best regards,
The Innovation Hub Team
    """

    email = EmailMessage(
        subject=subject,
        body=message,
        from_email=settings.EMAIL_HOST_USER,
        to=[user.email],
    )

    try:
        email.send(fail_silently=False)
    except Exception as e:
        print(f"Failed to send user confirmation email: {e}")
