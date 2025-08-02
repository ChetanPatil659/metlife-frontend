# MetLife Insurance Application

A modern, pixel-perfect React application for insurance management with a dark theme design.

## Features

### 🏠 Home Page
- Hero section with background image (`bg.png`)
- Feature highlights with icons
- Call-to-action sections
- Responsive design

### 📊 Dashboard Page
- Real-time metrics and KPIs
- Interactive period selector (Week/Month/Quarter/Year)
- Data visualization placeholders
- Recent activities feed
- Quick action buttons

### 👤 Profile Page
- User information management
- Policy overview
- Notification center
- Settings and preferences
- Tabbed interface for better organization

### 🎨 Design System
- Dark theme throughout
- Consistent color palette (blues, grays, whites)
- Modern UI components
- Responsive design for all screen sizes
- Notification banners matching the design spec

## Technology Stack

- **React 19** - Latest React version
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

## Project Structure

```
src/
├── components/
│   ├── Navigation.jsx          # Main navigation component
│   └── NotificationBanner.jsx  # Reusable notification banner
├── pages/
│   ├── HomePage.jsx            # Landing page with hero section
│   ├── DashboardPage.jsx       # Analytics and metrics dashboard
│   └── ProfilePage.jsx         # User profile and settings
├── App.jsx                     # Main app component with routing
└── main.jsx                    # Application entry point
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Key Features

### Navigation
- Fixed top navigation with backdrop blur
- Mobile-responsive hamburger menu
- Active state indicators
- Smooth transitions

### Notification Banner
- Matches the design from the provided images
- Dismissible functionality
- Action button support
- Fixed bottom positioning

### Responsive Design
- Mobile-first approach
- Breakpoint-specific layouts
- Touch-friendly interactions
- Optimized for all screen sizes

### Dark Theme
- Consistent black/gray color scheme
- Blue accent colors for interactive elements
- High contrast for accessibility
- Modern glassmorphism effects

## Design Patterns Used

- **Component Composition** - Reusable components with props
- **State Management** - React hooks for local state
- **Conditional Rendering** - Dynamic UI based on state
- **Event Handling** - Interactive elements with proper handlers
- **Responsive Design** - Mobile-first with progressive enhancement

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

The application uses modern React patterns and follows production-ready standards:

- Strict TypeScript-like prop validation
- Comprehensive JSDoc documentation
- Modular component architecture
- Clean separation of concerns
- Scalable folder structure
