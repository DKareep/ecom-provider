import { useParams} from "react-router-dom";
import {useEffect} from "react";
import {useProducts} from "../../contexts/ProductsContext/Products";
import "./Styles/SingleProduct.scss"
const SingleProduct = () => {
    const {id} = useParams()

    const {fetchSingleProduct, productDetails, errorProductDetail, loadingProductDetail} = useProducts()

    const {name, image, description} = productDetails
    useEffect(() => {
        fetchSingleProduct(id)
    }, [id, fetchSingleProduct]);

    if(loadingProductDetail) {
        return  <div className={"product-details"}>Loading...</div>
    }
    if(errorProductDetail) {
        return  <div className={"product-details"}>Something went wrong...</div>
    }

    return (
        <div className={"product-details"}>
            <div>
                <img src={image} alt=""/>
            </div>
            <div>
               <h3>{name}</h3>
                <br/>
                {description}
            </div>

        </div>
    )
}
export default SingleProduct