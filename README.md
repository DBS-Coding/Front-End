# HistoTalk - Frontend Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES14-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-purple)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC)](https://tailwindcss.com/)

HistoTalkFE is a frontend application for interacting with historical figures through AI-powered chat. Currently featuring Ir. Soekarno & Mohammad Hatta, Indonesia's first President and Vice President, co-proclaimer of independence.

![HistoTalk Interface](/public/cover.jpg)

## Features

### User Features

- Interactive chat with historical figures
- Responsive design for desktop and mobile devices
- Smooth animations and transitions for enhanced user experience
- Typing indicators for realistic conversation flow
- Suggested questions for easy conversation starters
- Historical facts and educational content about the figure
- Session persistence for returning users

### Technical Features

- Progressive Web App (PWA) support for offline capability
- Optimized performance with React 19
- Responsive UI with Tailwind CSS
- State management with Zustand
- Form validation with React Hook Form

## Technologies Used

- React 19
- JavaScript
- Tailwind CSS for styling
- Framer Motion for animations
- Zustand for state management
- React Hook Form for form handling
- Axios for HTTP requests
- Lucide React for icons
- Vite as build tool
- PWA support
- TensorflowJS

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/DBS-Coding/Front-End.git
   mv Front-End histotalk-frontend
   cd histotalk-frontend
   ```

2. Install dependencies

   ```bash
   pnpm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a .env file in the root directory with necessary variables:
   ```
   VITE_API_BASE_URL=
   VITE_API_MODEL_TFJS_URL=
   VITE_API_MODEL_RAG_URL=
   VITE_API_BASE_URL_ETL=
   ```

### Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build locally
- `pnpm run lint` - Run ESLint
- `pnpm run lint:fix` - Fix linting issues

## Project Structure

```
histotalk-frontend/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable components
│   │   ├── chat/        # Chat-related components
│   │   ├── common/      # Shared UI components
│   │   └── feedback/    # User feedback components
│   ├── api/             # API service functions
│   ├── hooks/           # Custom React hooks
│   ├── presenters/      # Application logic
│   ├── store/           # State management with Zustand
│   ├── types/           # TypeScript type definitions
│   ├── views/           # Page components
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Entry point
│
├── .eslintrc.cjs        # ESLint configuration
├── .gitignore           # Git ignore rules
├── index.html           # Main HTML file
├── package.json         # Project dependencies
├── README.md            # This file
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite configuration
```

## Backend API

This frontend application communicates with a Node.js/Express backend API. The API repository can be found at [histotalk-backend](https://github.com/DBS-Coding/Back-End).

Key API endpoints:

- `/api/auth` - Authentication endpoints
- `/api/chat` - Chat processing endpoints
- `/api/figures` - Historical figures information endpoints

## Deployment

The project is configured for easy deployment as a Progressive Web App (PWA). To build for production:

```bash
pnpm run build
```

The output will be in the `dist` directory, ready to be deployed to any static hosting service like:

- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## Performance Optimization

This application implements several performance optimizations:

- Code splitting with React.lazy
- Image optimization with modern formats
- Service worker for caching and offline support
- Memoization of expensive calculations
- Tree-shaking for smaller bundle size

## Browser Support

HistoTalk supports all modern browsers:

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

Internet Explorer is not supported.

## Troubleshooting

### Common Issues

**API Connection Errors**

- Ensure your .env file has the correct `VITE_API_BASE_URL` value
- Check if the backend server is running
- Verify network connectivity and CORS settings

**Build Failures**

- Try clearing the cache with `pnpm run clean` then rebuilding
- Ensure all dependencies are installed with `pnpm install`
- Check for TypeScript errors that might prevent successful compilation

**PWA Issues**

- Clear site data and cache if the PWA doesn't update properly
- Ensure service worker registration is working correctly

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please ensure your code follows our style guidelines and passes all tests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Ir. Soekarno & Mohammad Hatta for the contributions to Indonesian independence
- All open-source libraries used in this project
- The React and Vite communities for their excellent documentation
- Contributors and testers who have helped improve this application

## Roadmap

Future enhancements planned for HistoTalk:

- Add more historical figures (Cut Nyak Dien, Kartini, etc.)
- Add multilingual support
- Create a mobile app version using React Native
- Integrate voice interface for spoken conversations

---

© 2025 HistoTalk Team. All rights reserved.
