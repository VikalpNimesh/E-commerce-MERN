import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../layout/Home/ProductCard.jsx";
import "./Products.css";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import {
  clearErrors,
  getAllProductsFail,
  getAllProductsRequest,
  getAllProductsSuccess,
} from "../../store/slices/productSlice";
import axios from "axios";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";

const Products = () => {
  const { keyword } = useParams();
  const { products, error, resultPerPage, loading, productCount } = useSelector(
    (state) => state.products
  );
  const alert = useAlert();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    const fetchData = async (keyword = "", currentPage = 1) => {
      try {
        dispatch(getAllProductsRequest());
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}`
        );
        console.log(data);
        dispatch(getAllProductsSuccess(data));
      } catch (error) {
        dispatch(getAllProductsFail(error.response.data.message));
      }
    };

    if (error) {
      alert.error(error);
      clearErrors();
    }

    fetchData(keyword, currentPage);
  }, [dispatch, error, keyword, alert, currentPage]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products?.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))}
          </div>
        </div>
      )}

      {resultPerPage < productCount && (
        <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </>
  );
};

export default Products;
