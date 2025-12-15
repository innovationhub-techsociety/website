import traceback
from django.http import JsonResponse

class ExceptionLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            response = self.get_response(request)
            return response
        except Exception as e:
            # Print full traceback to console/logs so we can see it in Render dashboard
            print("CRITICAL UNHANDLED EXCEPTION:")
            traceback.print_exc()
            
            # Return a JSON response with the error details
            # We explicitly set CORS headers here to ensure the frontend can read the error
            response = JsonResponse({
                'error': 'Internal Server Error',
                'details': str(e),
                'traceback': traceback.format_exc()
            }, status=500)
            
            # Allow all origins for this error response to ensure visibility
            response['Access-Control-Allow-Origin'] = '*'
            response['Access-Control-Allow-Headers'] = '*'
            return response
