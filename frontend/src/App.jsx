import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import './App.css';

import Products from './pages/Products';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import AdminDashboard from './pages/AdminDashboard';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import About from './pages/About';
import Orders from './pages/Orders';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
              <Toaster
                position="top-right"
                toastOptions={{
                  className: 'dark:bg-slate-900 dark:text-slate-100 dark:border dark:border-slate-800 shadow-lg text-sm rounded-xl',
                  duration: 3500,
                }}
              />
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/terms" element={<Terms />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
