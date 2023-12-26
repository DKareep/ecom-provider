import {memo} from "react";
import {Link} from "react-router-dom";

const Product = memo(({id, image, name, description, price, grid_view}) => {

    if (grid_view) {
        return (
            <Link className={"link-unset"} to={`/${id}`}>
                <div className={"product-grid"}>
                    <img className={"product-image"} src={image} alt="product"/>
                    <p className={"product-details"}> <span>{name}</span><span>{price}$</span></p>
                </div>
            </Link>
        )
    }
    return (
        <Link className={"link-unset"} to={`/${id}`}>
            <div className={"product-list"}>
                <img className={"product-image"} src={image} alt=""/>
                <div>
                    <p>{name}</p>
                    <p>{description}</p>
                </div>
            </div>
        </Link>
    )

})
export default Product