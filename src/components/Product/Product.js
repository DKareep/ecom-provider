import {memo} from "react";

const Product = memo(({image,name}) => {
    return (
        <div className={"product"}>
            <img className={"product-image"} src={image} alt=""/>
            {name}
        </div>
    )
})
export default Product