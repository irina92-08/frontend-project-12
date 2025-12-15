link to the [application](https://frontend-project-12-0alx.onrender.com/)

### Hexlet tests and linter status:
[![Actions Status](https://github.com/irina92-08/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/irina92-08/frontend-project-12/actions)

# Hexlet Chat - Real-time Messaging Application

## Project Description

Hexlet Chat is a modern real-time messaging application built with React and Redux, designed to demonstrate practical frontend development skills through a fully-featured chat platform. The application combines multiple technologies commonly used in production environments to solve real-world frontend challenges.

## 🚀 Key Features

- **Real-time messaging** with WebSocket integration
- **REST API** communication for data management
- **User authentication & authorization** with JWT tokens
- **Multi-channel chat system** with channel management
- **Message filtering** for content moderation
- **Responsive UI** built with React Bootstrap
- **Form handling** using Formik with validation
- **Internationalization** (i18n) support
- **Production-ready** with error monitoring (Rollbar)
- **Client-side routing** with React Router

## 🛠️ Technology Stack

### Core Framework
- **React 18** with Hooks for component-based architecture
- **Redux Toolkit** for predictable state management
- **React Router v6** for client-side navigation

### UI & Styling
- **React Bootstrap** with custom components
- **Bootstrap 5** for responsive design
- **CSS Modules** for component styling

### Forms & Validation
- **Formik** for form state management
- **Yup** for schema-based validation

### Real-time Communication
- **WebSocket** for instant message updates
- **REST API** for CRUD operations

### Development & Build Tools
- **Vite** for fast development and building
- **ESLint** with Airbnb configuration
- **Rollbar** for error monitoring in production


## 📋 Available Scripts

```bash
# Build frontend application for production
npm run build

# Start production server
npm run start

### Make Commands
```bash
# Build project
make build

# Start server
make start

# Install dependencies
make install
```

## 🔌 API Integration

The application connects to a backend REST API with the following endpoints:

- `POST /api/v1/login` - User authentication
- `POST /api/v1/signup` - User registration
- `GET /api/v1/channels` - Channel list
- `POST /api/v1/channels` - Create channel
- `PATCH /api/v1/channels/:id` - Update channel
- `DELETE /api/v1/channels/:id` - Remove channel
- `GET /api/v1/messages` - Retrieve messages
- `POST /api/v1/messages` - Send message

## 🗂️ State Management

The application uses Redux Toolkit with the following slices:

- **authSlice** - Authentication state and user data
- **channelsSlice** - Channel management and list
- **messagesSlice** - Message storage and updates
- **modalSlice** - Modal window state management
- **currentChatSlice** - Active chat session data

## 📝 Form Management

Complex forms are handled using Formik with Yup validation schemas:

- Login form with username/password validation
- Registration form with password confirmation
- Channel creation/editing forms
- Unique channel name validation

## 🌐 Localization

The i18n system is implemented through react-i18next with translations organized by pages and components. Currently, only Russian language is supported, but the architecture allows for easy addition of new languages.

## ⚠️ Error Handling

- **Rollbar integration** for production error tracking
- **Toast notifications** for user feedback
- **Network error handling** with fallback UI

## 🚢 Deployment

The project is configured for easy deployment with:

- Optimized production build via Vite
- Static file serving capability
- Environment variable configuration
