import {memo} from "react";
import {Link} from "react-router-dom";

const Product = memo(({id,image,name}) => {
    return (
        <div className={"product"}>
            <Link to={`/${id}`} >
            <img className={"product-image"} src={image} alt=""/>
            {name}
            </Link>
        </div>
    )
})
export default Product