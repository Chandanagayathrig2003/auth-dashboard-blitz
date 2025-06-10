
# Authentication Dashboard

## Project info

A modern authentication and user management dashboard built with React, TypeScript, and Tailwind CSS.

## Tech Stack

This project is built with:
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React (for icons)

## Features

- **Authentication Flow**: Complete signup, login, and logout functionality
- **Protected Routes**: Dashboard access only for authenticated users
- **User Profile Management**: Update email and password
- **Agent Configuration**: Interdependent dropdowns for provider, model, and language selection
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Smooth animations and interactive elements

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repository-url>
cd <your-project-name>
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth, Theme)
├── pages/              # Page components
├── hooks/              # Custom hooks
└── lib/                # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Authentication

The app uses localStorage to persist user authentication state and data. In a production environment, you would want to integrate with a proper backend authentication service.

## Data Storage

Currently uses localStorage for data persistence. The app includes:
- User registration data
- Authentication state
- Agent configuration preferences
- Theme preferences

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
