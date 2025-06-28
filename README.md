# 🛍️ MyShop - Product Management Application

A modern, full-featured e-commerce product management application built with Next.js 14, TypeScript, and Tailwind CSS. This application provides a complete shopping experience with both customer-facing features and comprehensive admin management capabilities.

## 🌟 Live Demo

**Production URL:** https://product-management-3skhq4er6-alok-axs-projects.vercel.app

## ✨ Features

### 🏠 Customer Features
- **Landing Page**: Beautiful hero section with featured products and categories
- **Product Catalog**: Browse products with filtering and search capabilities
- **Product Details**: Detailed product pages with images, descriptions, and pricing
- **Shopping Cart**: Persistent cart with quantity management and real-time totals
- **Checkout Process**: Complete checkout flow with order summary
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark/Light Theme**: Toggle between themes for better user experience

### 🔧 Admin Features
- **Admin Dashboard**: Overview of sales, orders, and product statistics
- **Product Management**: 
  - Add, edit, and delete products
  - Bulk operations
  - Image upload support
  - Category and brand management
- **Order Management**: Track and manage customer orders
- **User Management**: Manage customer accounts and profiles
- **Analytics**: Sales reports and performance metrics

### 🛠️ Technical Features
- **Next.js 14**: Latest React framework with App Router
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Zustand**: Lightweight state management for cart and UI state
- **React Hook Form**: Form handling with validation
- **Zod**: Schema validation for forms and API data
- **TanStack Query**: Data fetching and caching
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Alok-AX/my-shop.git
   cd product-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
product-management-app/
├── app/                          # Next.js App Router pages
│   ├── admin/                    # Admin dashboard pages
│   ├── checkout/                 # Checkout flow pages
│   ├── products/                 # Product listing and detail pages
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── providers.tsx            # Context providers
├── components/                   # Reusable components
│   ├── admin/                   # Admin-specific components
│   ├── cart/                    # Shopping cart components
│   ├── checkout/                # Checkout components
│   ├── landing/                 # Landing page components
│   ├── layout/                  # Layout components
│   ├── ui/                      # Base UI components (shadcn/ui)
│   ├── product-card.tsx         # Product display component
│   └── product-form.tsx         # Product form component
├── hooks/                       # Custom React hooks
├── lib/                         # Utility libraries
│   ├── api.ts                   # API functions
│   ├── cart-store.ts            # Cart state management
│   ├── schemas.ts               # Zod validation schemas
│   └── utils.ts                 # Utility functions
├── public/                      # Static assets
└── styles/                      # Additional styles
```

## 🔧 Configuration

### Environment Variables
The application uses the DummyJSON API for product data. No additional environment variables are required for basic functionality.

### API Integration
- **Base URL**: `https://dummyjson.com`
- **Endpoints**:
  - `GET /products` - Fetch products with pagination
  - `GET /products/:id` - Get single product
  - `POST /products/add` - Create new product
  - `PUT /products/:id` - Update product
  - `DELETE /products/:id` - Delete product

## 🎨 UI Components

The application uses a comprehensive set of UI components built with Radix UI and styled with Tailwind CSS:

- **Navigation**: Header, sidebar, breadcrumbs
- **Forms**: Input fields, select dropdowns, checkboxes, radio buttons
- **Data Display**: Tables, cards, badges, avatars
- **Feedback**: Toasts, alerts, dialogs, modals
- **Layout**: Grid, flexbox, containers
- **Interactive**: Buttons, links, hover cards, tooltips

## 🛒 Shopping Cart Features

- **Persistent Storage**: Cart data persists across browser sessions
- **Quantity Management**: Add, remove, and update item quantities
- **Real-time Totals**: Automatic calculation of cart totals
- **Cart Sidebar**: Slide-out cart panel for easy access
- **Checkout Integration**: Seamless transition to checkout process

## 📊 Admin Dashboard

### Dashboard Overview
- Sales statistics and metrics
- Recent orders and activities
- Product performance insights
- User engagement data

### Product Management
- **CRUD Operations**: Create, read, update, delete products
- **Bulk Actions**: Select multiple products for batch operations
- **Image Management**: Upload and manage product images
- **Category Management**: Organize products by categories
- **Inventory Tracking**: Monitor stock levels

### Order Management
- **Order Tracking**: View order status and details
- **Customer Information**: Access customer details for each order
- **Order History**: Complete order history and analytics

### User Management
- **Customer Profiles**: View and manage customer accounts
- **User Analytics**: Track user behavior and preferences
- **Account Management**: Handle user account operations

## 🎯 Key Features Explained

### State Management
The application uses **Zustand** for state management, specifically for:
- Shopping cart state (items, quantities, totals)
- UI state (sidebar open/close, theme preferences)
- Form state management

### Data Fetching
**TanStack Query** is used for:
- Caching API responses
- Background data updates
- Optimistic updates
- Error handling and retries

### Form Validation
**Zod** schemas provide:
- Type-safe form validation
- Runtime data validation
- API response validation
- Error message customization

### Responsive Design
The application is built with a mobile-first approach:
- Responsive grid layouts
- Adaptive navigation
- Touch-friendly interactions
- Optimized for all screen sizes

## 🚀 Deployment

### Vercel Deployment
The application is configured for easy deployment on Vercel:

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Automatic Deployments**: Every push to main branch triggers deployment
3. **Preview Deployments**: Pull requests get preview URLs
4. **Environment Variables**: Configure any required environment variables

### Build Configuration
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Node Version**: 18.x

## 🧪 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Husky**: Git hooks for code quality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **DummyJSON**: For providing the product API
- **shadcn/ui**: For the beautiful UI components
- **Vercel**: For hosting and deployment
- **Next.js Team**: For the amazing framework
- **Tailwind CSS**: For the utility-first CSS framework

## 📞 Support

If you have any questions or need support:
- Create an issue on GitHub
- Contact: alok965801@gmail.com
- Project URL: https://github.com/Alok-AX/my-shop

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS** 