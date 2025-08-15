# 🚀 Render Deployment Guide

## Quick Start Checklist

### ✅ Completed Steps
- [x] Created `render.yaml` configuration file
- [x] Updated Django settings for production
- [x] Created `requirements.txt` with all dependencies
- [x] Created `build.sh` script for backend
- [x] Updated frontend API configuration
- [x] Created comprehensive `.gitignore`
- [x] Initialized Git repository
- [x] Committed all changes

### 🔄 Next Steps

#### 1. Push to GitHub/GitLab
```bash
# Create a new repository on GitHub/GitLab
# Then run these commands:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

#### 2. Deploy on Render

1. **Go to Render Dashboard:**
   - Visit [render.com](https://render.com)
   - Sign up/Login with your GitHub/GitLab account

2. **Create Blueprint:**
   - Click "New +" button
   - Select "Blueprint"
   - Connect your repository
   - Render will automatically detect `render.yaml`

3. **Configure Services:**
   - Render will create 3 services:
     - `todo-backend` (Django API)
     - `todo-frontend` (React App)
     - `todo-database` (PostgreSQL)

4. **Wait for Deployment:**
   - Backend will deploy first (takes 5-10 minutes)
   - Frontend will deploy after backend is ready
   - Database will be created automatically

#### 3. Get Your URLs
After deployment, you'll get:
- Backend API: `https://todo-backend-xxxx.onrender.com`
- Frontend App: `https://todo-frontend-xxxx.onrender.com`

#### 4. Test Your Application
1. Visit your frontend URL
2. Create a new account
3. Test creating, editing, and deleting todos

## 🔧 Manual Configuration (if needed)

### Backend Environment Variables
If you need to set environment variables manually:
- `SECRET_KEY`: Generate with `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`
- `DEBUG`: `False`
- `ALLOWED_HOSTS`: `.onrender.com`
- `CORS_ALLOWED_ORIGINS`: Your frontend URL

### Frontend Environment Variables
- `VITE_API_URL`: Your backend URL (e.g., `https://todo-backend-xxxx.onrender.com`)

## 🐛 Troubleshooting

### Common Issues

#### 1. Build Fails
**Error:** `ModuleNotFoundError: No module named 'django'`
**Solution:** Check `requirements.txt` has all dependencies

#### 2. Database Connection Error
**Error:** `connection to server at "localhost" failed`
**Solution:** Ensure `DATABASE_URL` is set correctly in environment variables

#### 3. CORS Errors
**Error:** `Access to fetch at '...' from origin '...' has been blocked by CORS policy`
**Solution:** Update `CORS_ALLOWED_ORIGINS` with your frontend URL

#### 4. Static Files Not Loading
**Error:** `404 Not Found` for static files
**Solution:** Check `STATIC_ROOT` and `STATICFILES_STORAGE` in settings

#### 5. Frontend Can't Connect to Backend
**Error:** `Failed to fetch`
**Solution:** 
- Check `VITE_API_URL` environment variable
- Ensure backend is running and accessible
- Verify CORS settings

### Debug Commands

#### Check Backend Logs
```bash
# In Render dashboard, go to your backend service
# Click on "Logs" tab to see real-time logs
```

#### Check Frontend Build
```bash
# Locally test the build
cd todo-frontend
npm run build
# Check if dist/ folder is created successfully
```

#### Test Database Connection
```bash
# In Render dashboard, go to your database service
# Copy the connection string and test locally
```

## 📞 Support

### Render Support
- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com)

### Django Deployment
- [Django Deployment Checklist](https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/)
- [Django on Render](https://render.com/docs/deploy-django)

### React/Vite Deployment
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React on Render](https://render.com/docs/deploy-create-react-app)

## 🎉 Success!

Once deployed successfully:
1. Your TODO app will be live on the internet
2. Users can sign up and manage their todos
3. The app will automatically scale with traffic
4. You can monitor performance in Render dashboard

## 🔄 Updates

To update your deployed app:
```bash
# Make your changes locally
git add .
git commit -m "Update description"
git push origin main
# Render will automatically redeploy
``` 