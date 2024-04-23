import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { FilterPaginationData } from "../common/filter-pagination-data";
import InPageNavigation from "../components/inpage-navigation.component";
import AnimationWrapper from "../common/page-animation";
import ManageProductsCard from "../components/manage-products-card.component";
import LoadMoreDataBtn from "../components/load-more.component";

function DashboardVendor() {
  let {
    userAuth,
    userAuth: { access_token, username },
  } = useContext(UserContext);

  const [products, setProducts] = useState(null);
  const [query, setQuery] = useState("");

  const getProducts = ({ page = 1, deletedDocCount = 0 }) => {
    axios
      .post(
        process.env.REACT_APP_SERVER_DOMAIN + "/vendor-dashboard",
        {
          page,
          query,
          deletedDocCount,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(async ({ data }) => {
        let formateData = await FilterPaginationData({
          state: products,
          data: data.products,
          page,
          user: access_token,
          countRoute: "/vendor-products-count",
          data_to_send: { query },
        });

        setProducts(formateData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (access_token) {
      if (products == null) {
        getProducts({ page: 1 });
      }
    }
  }, [access_token, products, query]);

  const handleSearch = (e) => {
    if(!e.target.value.length){
        setQuery("");
        setProducts(null);
    }
  }
  const handleKeyDown = (e) => {
    let searchQuery = e.target.value;

    setQuery(searchQuery);

    if(e.keyCode == 13 && searchQuery.length){
        setProducts(null);
    }
  }

  return (
    <div>
        <div className="my-6 px-4">
            <p className="text-3xl text-center font-bold">Hello <span className="text-3xl text-center font-bold text-red">{username}</span>, managae your products</p>
        </div>
       <div className="relative max-md:mt-5 md:mt-8 mb-10"><input type="search" className="w-full bg-grey p-4 pl-12 pr-6 rounded-full placeholder:text-dark-grey" placeholder="search products..."
       onChange={handleSearch}
       onKeyDown={handleKeyDown}/>
       <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none cursor-pointer md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
       </div>
    <InPageNavigation routes={["All products"]}>

        {
            products === null ? <p>loading...</p> : 
            products.results.length ? 
            <>
            {
                products.results.map((product, i) => {
                    return (
                    <div key={i}>
                        <ManageProductsCard product={{...product, index: i, setStateFunc: setProducts}}/>
                    </div>)
                })
            }

            <LoadMoreDataBtn state={products} fetchDataFun={getProducts} additionalParam={{deletedDocCount: products.deletedDocCount}}/>
            </>
            : <p>No products</p>
        }

    </InPageNavigation>
    </div>
);
}

export default DashboardVendor;
