# Todo App Frontend

A beautiful and modern React frontend for the Django Todo application, built with Vite, Tailwind CSS, and React Router.

## Features

### 🎨 User Interface
- **Modern Design**: Clean, professional UI with beautiful gradients and animations
- **Responsive Layout**: Fully responsive design that works on all devices
- **Smooth Animations**: Fade-in, slide-up, and bounce animations for better UX
- **Interactive Elements**: Hover effects, loading states, and visual feedback

### 🔐 Authentication
- **Login Page**: Beautiful login form with username/password
- **Signup Page**: Registration form with password confirmation
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Token Management**: Secure token storage and automatic logout on expiration

### ✅ Todo Management
- **Dashboard**: Overview with statistics and filtering options
- **Add Todos**: Expandable form to create new todos
- **Edit Todos**: Inline editing for title, description, and due time
- **Delete Todos**: Confirmation dialog for safe deletion
- **Mark Complete**: Toggle completion status with visual feedback
- **Filtering**: Filter by all, active, or completed todos

### 🛠 Technical Features
- **API Integration**: Axios for backend communication
- **Error Handling**: Comprehensive error messages and loading states
- **Form Validation**: Real-time validation and user feedback
- **State Management**: React Context for authentication state
- **Routing**: React Router with protected routes

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Beautiful icons
- **Djoser** - Django authentication (backend)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Django backend running on `http://localhost:8000`

### Installation

1. **Clone and navigate to the frontend directory:**
   ```bash
   cd todo-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## API Configuration

The frontend expects the Django backend to be running on `http://localhost:8000` with the following endpoints:

### Authentication Endpoints
- `POST /api/auth/users/` - User registration
- `POST /api/auth/token/login/` - User login
- `POST /api/auth/token/logout/` - User logout
- `GET /api/auth/users/me/` - Get current user

### Todo Endpoints
- `GET /api/todos/` - Get all todos
- `POST /api/todos/` - Create new todo
- `PUT /api/todos/{id}/` - Update todo
- `PATCH /api/todos/{id}/` - Partial update (toggle completion)
- `DELETE /api/todos/{id}/` - Delete todo

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AddTodo.jsx     # Add new todo form
│   ├── Navigation.jsx  # Top navigation bar
│   ├── ProtectedRoute.jsx # Route protection
│   └── TodoItem.jsx    # Individual todo item
├── contexts/           # React contexts
│   └── AuthContext.jsx # Authentication state
├── pages/              # Page components
│   ├── Dashboard.jsx   # Main todo dashboard
│   ├── Login.jsx       # Login page
│   └── Signup.jsx      # Registration page
├── services/           # API services
│   └── api.js         # Axios configuration and API calls
├── App.jsx            # Main app component
├── index.css          # Global styles and Tailwind imports
└── main.jsx          # App entry point
```

## Customization

### Colors
The app uses a custom primary color palette defined in `tailwind.config.js`. You can modify the colors by updating the `primary` object:

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    // ... more shades
  }
}
```

### API Base URL
To change the API base URL, update the `API_BASE_URL` constant in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://your-backend-url/api';
```

## Features in Detail

### Authentication Flow
1. User visits the app
2. If not authenticated, redirected to login
3. After successful login, redirected to dashboard
4. Token stored in localStorage for persistence
5. Automatic logout on token expiration

### Todo Management
1. **Adding**: Click "Add new todo" button to expand form
2. **Editing**: Click edit icon to enable inline editing
3. **Completing**: Click checkbox to toggle completion
4. **Deleting**: Click delete icon with confirmation dialog
5. **Filtering**: Use filter buttons to view different todo states

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Flexible grid layouts
- Touch-friendly buttons and interactions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
