import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import WhyChooseUs from "./components/WhyChooseUs"
import Products from "./components/Products"
import Celebrations from "./components/Celebrations"
import CTA from "./components/CTA"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import AdminLogin from "./admin/AdminLogin"
import AdminDashboard from "./admin/AdminDashboard"
import ProductManagement from "./admin/ProductManagement"
import CelebrationManagement from "./admin/CelebrationManagement"
import ProductEditPage from "./admin/ProductEditPage"
import AdminGuard from "./admin/AdminGuard"

function PublicWebsite() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhyChooseUs />
        <Products />
        <Celebrations />
        <CTA />
        <Contact />
      </main>
      <Footer />

      <a
        href="https://wa.me/94776501169?text=Hello%20Lead%20Bag%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products."
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Lead Bag on WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-emerald-500 px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-900/20 transition duration-300 hover:-translate-y-1 hover:bg-emerald-600 sm:bottom-7 sm:right-7"
      >
        <span className="text-lg">◉</span>
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </a>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicWebsite />} />
        <Route path="/admin" element={<AdminLogin />} />

        <Route element={<AdminGuard />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<ProductManagement />} />
          <Route path="/admin/products/edit/:id" element={<ProductEditPage />} />
          <Route path="/admin/celebrations" element={<CelebrationManagement />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
