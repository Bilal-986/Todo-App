# TODO Application

A full-stack TODO application built with Django REST API backend and React frontend.

## Project Structure

```
TODO/
├── todo-backend/          # Django REST API
│   ├── config/           # Django settings
│   ├── todos/            # Todo app
│   ├── requirements.txt  # Python dependencies
│   └── build.sh         # Build script for deployment
├── todo-frontend/        # React frontend
│   ├── src/             # React components
│   ├── package.json     # Node.js dependencies
│   └── vite.config.js   # Vite configuration
└── render.yaml          # Render deployment configuration
```

## Features

- User authentication (signup/login)
- Create, read, update, delete todos
- Protected routes
- Responsive design
- RESTful API

## Deployment on Render

This project is configured for easy deployment on Render using the `render.yaml` file.

### Prerequisites

1. A Render account (free tier available)
2. Your code pushed to a Git repository (GitHub, GitLab, etc.)

### Deployment Steps

1. **Connect to Render:**
   - Go to [render.com](https://render.com)
   - Sign up or log in
   - Click "New +" and select "Blueprint"

2. **Connect Repository:**
   - Connect your Git repository
   - Render will automatically detect the `render.yaml` file

3. **Deploy:**
   - Render will create:
     - A Django backend service
     - A React frontend service
     - A PostgreSQL database
   - All services will be automatically deployed

4. **Environment Variables:**
   - The backend will automatically get a generated `SECRET_KEY`
   - Database connection will be automatically configured
   - CORS settings will be configured for the frontend URL

### Manual Deployment (Alternative)

If you prefer to deploy services manually:

#### Backend Deployment

1. Create a new **Web Service** on Render
2. Connect your repository
3. Set build command: `cd todo-backend && chmod +x build.sh && ./build.sh`
4. Set start command: `cd todo-backend && gunicorn config.wsgi:application --bind 0.0.0.0:$PORT`
5. Add environment variables:
   - `SECRET_KEY`: Generate a secure key
   - `DEBUG`: `False`
   - `ALLOWED_HOSTS`: `.onrender.com`
   - `CORS_ALLOWED_ORIGINS`: Your frontend URL

#### Frontend Deployment

1. Create a new **Static Site** on Render
2. Connect your repository
3. Set build command: `cd todo-frontend && npm install && npm run build`
4. Set publish directory: `todo-frontend/dist`
5. Add environment variable:
   - `VITE_API_URL`: Your backend URL

#### Database

1. Create a new **PostgreSQL** database on Render
2. Copy the database URL to your backend environment variables as `DATABASE_URL`

## Local Development

### Backend Setup

```bash
cd todo-backend
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend Setup

```bash
cd todo-frontend
npm install
npm run dev
```

## API Endpoints

- `POST /api/auth/users/` - User registration
- `POST /api/auth/token/login/` - User login
- `GET /api/todos/` - Get all todos (authenticated)
- `POST /api/todos/` - Create new todo (authenticated)
- `PUT /api/todos/{id}/` - Update todo (authenticated)
- `DELETE /api/todos/{id}/` - Delete todo (authenticated)

## Technologies Used

### Backend
- Django 5.2.4
- Django REST Framework
- Djoser (authentication)
- PostgreSQL (production)
- SQLite (development)

### Frontend
- React 18
- Vite
- React Router
- Axios

## Environment Variables

### Backend
- `SECRET_KEY`: Django secret key
- `DEBUG`: Debug mode (True/False)
- `ALLOWED_HOSTS`: Comma-separated list of allowed hosts
- `DATABASE_URL`: Database connection string
- `CORS_ALLOWED_ORIGINS`: Comma-separated list of allowed origins

### Frontend
- `VITE_API_URL`: Backend API URL

## Troubleshooting

### Common Issues

1. **Build fails on Render:**
   - Check that all dependencies are in `requirements.txt`
   - Ensure `build.sh` has execute permissions
   - Verify Python version compatibility

2. **Database connection issues:**
   - Ensure `DATABASE_URL` is set correctly
   - Check that PostgreSQL service is running
   - Verify database credentials

3. **CORS errors:**
   - Update `CORS_ALLOWED_ORIGINS` with your frontend URL
   - Ensure frontend is making requests to the correct backend URL

4. **Static files not loading:**
   - Run `python manage.py collectstatic` locally
   - Check `STATIC_ROOT` and `STATICFILES_STORAGE` settings

## Support

For deployment issues, check:
- Render documentation: https://render.com/docs
- Django deployment guide: https://docs.djangoproject.com/en/5.2/howto/deployment/
- Vite deployment guide: https://vitejs.dev/guide/static-deploy.html 