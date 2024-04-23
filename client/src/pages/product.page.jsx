import { useEffect, useState } from "react";
import ProductCard from "../components/product-card.component";
import axios from "axios";
import { FilterPaginationData } from "../common/filter-pagination-data";

const ProductPage = () => {

    let [products, setProduct] = useState(null);
 
    const fetchProducts = ({page = 1}) => {
        axios.post(process.env.REACT_APP_SERVER_DOMAIN + "/get-all-product", {page})
        .then(async ({data}) => {
            let formateData = await FilterPaginationData({
                state: products,
                data:data.products,
                page,
                countRoute: "/all-product-count",
            });
            setProduct(formateData);
            console.log(products)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchProducts({page:1});
    }, [])

    return (
        <div className="flex items-center justify-center gap-4 flex-wrap">
        
        {
            products === null ? (
                <p>
                    Loading...
                </p>
            ) : products.results ? (
                products.results.map((product, i) => {
                    return (
                    <ProductCard product={product} />
                 );
                 })
            ) : (
                <>No products</>
            )
        }
        </div>
    )
}

export default ProductPage;