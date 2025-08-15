import os
import sys
import django
from django.core.wsgi import get_wsgi_application

# Add the project directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Set Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
os.environ['VERCEL'] = '1'

# Initialize Django
django.setup()

# Get WSGI application
application = get_wsgi_application()

# Vercel handler
def handler(request, context):
    return application(request, context) 