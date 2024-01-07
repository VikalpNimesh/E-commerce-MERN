import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/layout/Home/Home.jsx";
import ProductCard from "./components/layout/Home/ProductCard.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductCard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
