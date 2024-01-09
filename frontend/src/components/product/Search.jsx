import { useState } from "react";
// import MetaData from "../layout/MetaData";
import "./Search.css";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Search = ({ history }) => {
  let navigate = useNavigate();
  //   let history = useHistory();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      //   history.push(`/products/${keyword}`);
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
      //   history.push("/products");
    }
  };

  return (
    <>
      {/* <MetaData title="Search A Product -- ECOMMERCE" /> */}
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          value={keyword}
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
