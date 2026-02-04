# Company Website

A modern, professional company website built with React and Bootstrap showcasing products, services, solutions, resources, and company information.

## Features

- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Modern UI**: Clean and professional design using Bootstrap 5 components
- **Multiple Pages**:
  - Home: Hero section with company overview and key features
  - Products: Catalog of products with detailed information
  - Services: Comprehensive service offerings
  - Solutions: Industry-specific solutions
  - Resources: Documentation, tutorials, and case studies
  - About: Company information, mission, vision, and team

## Tech Stack

- **React 19** - UI framework
- **React Router DOM 7** - Client-side routing
- **Bootstrap 5** - CSS framework
- **React Bootstrap** - Bootstrap components for React
- **React Icons** - Icon library
- **Vite** - Build tool and dev server
- **pnpm** - Package manager

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)

### Installation

1. Navigate to the project directory:
   ```bash
   cd company-website
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## Available Scripts

- `pnpm run dev` - Start the development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview the production build locally
- `pnpm run lint` - Run ESLint

## Project Structure

```
company-website/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── Services.jsx
│   │   ├── Solutions.jsx
│   │   ├── Resources.jsx
│   │   └── About.jsx
│   ├── data/           # Mock data
│   │   ├── productsData.js
│   │   ├── servicesData.js
│   │   └── solutionsData.js
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Application entry point
├── public/             # Static assets
└── package.json
```

## Customization

### Update Company Information

1. **Company Name**: Update in `src/components/Header.jsx` and `src/components/Footer.jsx`
2. **Contact Information**: Edit `src/components/Footer.jsx`
3. **Products**: Modify `src/data/productsData.js`
4. **Services**: Modify `src/data/servicesData.js`
5. **Solutions**: Modify `src/data/solutionsData.js`
6. **About Page**: Edit team members and company stats in `src/pages/About.jsx`

### Styling

- Bootstrap classes are used throughout for responsive design
- Custom styles can be added to `src/index.css`
- Colors and theme can be customized by modifying Bootstrap variables

## Building for Production

To create a production build:

```bash
pnpm run build
```

The built files will be in the `dist/` directory and can be deployed to any static hosting service.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.
