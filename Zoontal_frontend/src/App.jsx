import "./App.css";
import HomePage from "./landing_page/home/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./landing_page/Navbar";
import Footer from "./landing_page/Footer";
import CataloguePage from "./landing_page/catalogue/CataloguePage";
import AboutPage from "./landing_page/about/AboutPage";
import ProductPage from "./landing_page/product/ProductPage";
import BlogPage from "./landing_page/blog/BlogPage";
import BlogDetail from "./landing_page/blog/BlogDetail";
import AdminPage from "./landing_page/admin/AdminPage";
import EditProductPage from "./landing_page/admin/EditProductPage";
import { AuthProvider } from "./context/AuthContext";
import AddProductPage from "./landing_page/admin/AddProductPage";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Navbar />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/collection" element={<CataloguePage />} />
              <Route path="/collection/:slug" element={<CataloguePage />} />
              <Route path="/product/:id" element={<ProductPage />} />

              {/* <Route path="/about" element={<AboutPage />} /> */}
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/edit/:id" element={<EditProductPage />} />

              <Route path="/admin/add-product" element={<AddProductPage />} />
            </Routes>

            <Footer />
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </>
  );
}

export default App;
