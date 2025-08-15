FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Create health check endpoint
RUN echo 'from django.http import HttpResponse\nfrom django.views.decorators.csrf import csrf_exempt\n@csrf_exempt\ndef health(request):\n    return HttpResponse("OK")' > health_view.py

# Add health check to URLs
RUN sed -i '/from django.urls import path/a from . import health_view' config/urls.py
RUN sed -i '/urlpatterns = \[/a path("health/", health_view.health, name="health"),' config/urls.py

# Expose port
EXPOSE 8000

# Run the application
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"] 