# Lead Bag (Pvt) Ltd — Official Website

A modern, responsive website for **Lead Bag (Pvt) Ltd**, a bag manufacturing business. The website showcases the company's products, manufacturing capabilities, company celebrations, and contact information while providing a secure administration dashboard for managing website content.

## 🚀 Features

### 🌐 Public Website

* **Home Page:** Attractive hero section introducing the company.
* **About Us:** Information about the company and its business.
* **Why Choose Us:** Highlights the company's strengths and services.
* **Product Catalog:** Displays bags with product images, categories, descriptions, availability, and available colors.
* **Product Filtering:** Helps visitors browse products by category.
* **Product Details:** Provides additional product information.
* **WhatsApp Inquiries:** Allows customers to inquire about specific products directly through WhatsApp.
* **Celebrations Gallery:** Showcases company events and celebrations.
* **Contact Section:** Provides a way for customers to contact the business.
* **Responsive Design:** Optimized for desktop, tablet, and mobile devices.

### 🔐 Admin Dashboard

The website includes a dedicated administration area for authorized administrators.

Administrators can:

* Sign in securely using Supabase Authentication.
* View a dashboard with product and celebration statistics.
* Add, edit, and delete products.
* Upload and replace product images.
* Manage product colors.
* Update product descriptions and availability.
* Add, edit, and delete company celebrations.
* Upload and manage celebration images.
* Sign out securely.

### 🛡️ Security

* Supabase Authentication for administrator sign-in.
* Admin route protection using `AdminGuard`.
* Role verification through the Supabase `is_admin()` function.
* PostgreSQL Row Level Security (RLS) policies to restrict data modifications to authorized administrators.
* Public visitors can view published website content but cannot modify products or celebrations through the application.
* Environment variables are used to configure Supabase credentials.

## 🛠️ Technologies Used

| Technology        | Purpose                                                           |
| ----------------- | ----------------------------------------------------------------- |
| React             | Building the user interface                                       |
| Vite              | Development server and build tool                                 |
| Tailwind CSS      | Responsive styling and layout                                     |
| JavaScript (ES6+) | Application functionality                                         |
| React Router      | Client-side routing                                               |
| Supabase          | Database, authentication, and image storage                       |
| PostgreSQL        | Storing products, colors, celebrations, and administrator records |
| Supabase Storage  | Storing product and celebration images                            |
| ESLint            | Code quality and linting                                          |
| WhatsApp          | Customer product inquiries                                        |

## 📁 Project Structure

```text
lead-bag-website/
├── public/
│   ├── images/
│   └── media/
├── src/
│   ├── admin/
│   │   ├── AdminGuard.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── ProductManager.jsx
│   │   ├── ProductManagement.jsx
│   │   ├── AddProduct.jsx
│   │   ├── EditProduct.jsx
│   │   ├── ProductEditPage.jsx
│   │   ├── CelebrationManager.jsx
│   │   ├── CelebrationManagement.jsx
│   │   ├── AddCelebration.jsx
│   │   └── EditCelebration.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── WhyChooseUs.jsx
│   │   ├── Products.jsx
│   │   ├── Celebrations.jsx
│   │   ├── CTA.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── lib/
│   │   └── supabaseClient.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env.local
├── .gitignore
├── index.html
├── package.json
└── README.md
```

*The exact files and folders may vary slightly depending on the current version of the project.*

## ⚙️ Getting Started

### Prerequisites

Install the following before running the project:

* [Node.js](https://nodejs.org/)
* npm, which is included with Node.js
* A Supabase account and configured project
* Git (optional, for version control)

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Navigate into the project directory:

```bash
cd lead-bag-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Replace the placeholder values with the appropriate credentials from your Supabase project.

**Important:** Never commit `.env.local` or expose your Supabase secret/service-role key in frontend code.

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

### 5. Run ESLint

```bash
npm run lint
```

### 6. Build for Production

```bash
npm run build
```

Vite generates the production-ready files in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

## 🗄️ Supabase Configuration

The application uses Supabase for database operations, authentication, and image storage.

### Database Tables

The project uses the following tables:

* **`products`** — Product names, categories, descriptions, image URLs, and availability.
* **`product_colors`** — Product-specific color names and color values.
* **`celebrations`** — Company celebration titles, descriptions, and image URLs.
* **`admin_users`** — Identifies users authorized to administer the website.

### Storage Buckets

* **`product-images`** — Stores product photos.
* **`celebration-images`** — Stores celebration photos.

### Access Control

Configure Row Level Security policies so public visitors can read the appropriate website content while only authorized administrators can insert, update, or delete records and upload or remove images.

The `is_admin()` database function and `admin_users` table are part of the administrator verification mechanism.

Before deploying, verify that the database tables, policies, storage buckets, and administrator account are configured correctly.

## 🔑 Admin Access

Open the administrator login page:

```text
/admin
```

After successful authentication and administrator verification, the administrator can access:

| Route                      | Purpose                  |
| -------------------------- | ------------------------ |
| `/admin`                   | Administrator login      |
| `/admin/dashboard`         | Administration dashboard |
| `/admin/products`          | Product management       |
| `/admin/products/edit/:id` | Edit a product           |
| `/admin/celebrations`      | Celebration management   |

Only users registered in the administrator allowlist should have management permissions. Do not rely solely on hiding admin pages in the frontend; enforce permissions through Supabase RLS policies as well.

## 📱 Customer Inquiries

Customers can browse products and use the WhatsApp inquiry feature to contact the business about a specific bag.

This helps customers ask questions about product availability, colors, and bulk orders without requiring an online payment system.

## 🚀 Deployment

The website can be deployed to a static hosting platform such as Vercel or Netlify.

Before deployment:

1. Run `npm run lint`.
2. Run `npm run build`.
3. Configure the required environment variables in the hosting platform.
4. Verify Supabase authentication and database policies.
5. Ensure all images and videos load correctly.
6. Test the website on desktop and mobile devices.
7. Test administrator login, product management, and celebration management.
8. Configure the hosting platform to support React Router routes on direct navigation.

## 🔮 Future Improvements

Potential future enhancements include:

* Editable company information from the admin dashboard.
* Additional product categories and catalog filters.
* Improved product gallery and image navigation.
* More advanced inventory management.
* Customer inquiry tracking.
* Search engine optimization (SEO).
* Custom domain and production deployment.
* Automated backups and monitoring.

## 👨‍💻 Development

This project was developed to establish a professional online presence for Lead Bag (Pvt) Ltd and simplify the management of product and company information.

The public website focuses on showcasing products and helping customers contact the business, while the administration dashboard allows authorized users to maintain website content without directly editing the source code.

## 📄 License

This project is intended for Lead Bag (Pvt) Ltd. Add an appropriate license if the source code will be distributed or reused publicly.
