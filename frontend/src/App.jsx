import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/layout/Header/Header.jsx";
const Home = lazy(() => import("./components/layout/Home/Home.jsx"));
// const ProductCard = lazy(() => import("./components/layout/Home/ProductCard.jsx"));
import Footer from "./components/layout/Footer/Footer";
import Loader from "./components/Loader/Loader.jsx";
import ProductCardDetails from "./components/product/ProductCardDetails.jsx";
import Products from "./components/product/Products.jsx";
import Search from "./components/product/Search.jsx";

const App = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductCardDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route path="/search" element={<Search />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Suspense>
    </>
  );
};

export default App;
