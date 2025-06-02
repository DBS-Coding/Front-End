# HistoTalk - Frontend Application

HistoTalkFE is a frontend application for interacting with historical figures through AI-powered chat. Currently featuring Mohammad Hatta, Indonesia's first Vice President and co-proclaimer of independence.

## Features

- Chat interface with historical figure persona (Mohammad Hatta)
- Responsive design for desktop and mobile
- Smooth animations and transitions
- Typing indicators for realistic conversation flow
- Suggested questions for easy conversation starters
- Historical facts and information about the figure

## Technologies Used

- React 19
- TypeScript (via Vite)
- Tailwind CSS for styling
- Framer Motion for animations
- Zustand for state management
- React Hook Form for form handling
- Axios for HTTP requests
- Lucide React for icons
- Vite as build tool
- PWA support

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/histotalkfe.git
   cd histotalkfe
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables (if needed)
   Create a `.env` file in the root directory with necessary variables:
   ```
   VITE_API_BASE_URL=your_api_url_here
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues

## Project Structure

```
histotalkfe/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable components
│   ├── presenters/      # Application logic
│   ├── views/           # Page components
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Entry point
│   └── vite-env.d.ts    # TypeScript declarations
├── .eslintrc.cjs        # ESLint configuration
├── .gitignore           # Git ignore rules
├── index.html           # Main HTML file
├── package.json         # Project dependencies
├── README.md            # This file
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.ts       # Vite configuration
```

## Deployment

The project is configured for easy deployment as a PWA (Progressive Web App). To build for production:

```bash
npm run build
```

The output will be in the `dist` directory, ready to be deployed to any static hosting service like:

- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Mohammad Hatta for his contributions to Indonesian independence
- All open-source libraries used in this project
