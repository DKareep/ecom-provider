import {useParams, useNavigate, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useProducts} from "../../contexts/ProductsContext/Products";
import "./Styles/SingleProduct.scss"
import {useCart} from "../../contexts/CartContext/Cart";
import Hero from "../../components/Hero/Hero";
import ItemsCounter from "../../components/ItemsCounter/ItemsCounter";
import {FiCheck} from "react-icons/fi";

const SingleProduct = () => {

    const {addToCart} = useCart()
    const {fetchSingleProduct, productDetails, errorProductDetail, loadingProductDetail} = useProducts()
    const {name, image, description, colors} = productDetails

    const [defaultColor, setDefaultColor] = useState("")
    const [amount, setAmount] = useState(1)
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(colors?.length > 0) {
        setDefaultColor(colors[0])
        }
    }, [colors])
    useEffect(() => {
        fetchSingleProduct(id)
    }, [id, fetchSingleProduct]);

    useEffect(() => {
        if (errorProductDetail) {
            setTimeout(() => {
                navigate("/")
            }, 3000)
        }
    }, [errorProductDetail, navigate])


    const increaseAmount = () =>{
        setAmount((amount) => {
            return amount + 1
        })
    }
    const decreaseAmount = () =>{
        setAmount((amount) => {
            return amount - 1
        })
    }


    if (loadingProductDetail) {
        return <div className={"product-details"}>Loading...</div>
    }
    if (errorProductDetail) {
        return <div className={"product-details"}>Something went wrong...</div>
    }

    return (
        <>
            <Hero page={id} />
            <br/>
            <div className={"product-details"}>
                <div>
                    <img src={image} alt=""/>
                </div>
                <div>
                    <h3>{name}</h3>
                    <br/>
                    {description}
                    <br/>

                    <ul>{colors?.map((color,index)=>  <li key={color+index} onClick={() => setDefaultColor(color)}><div key={color} className={"product-color"} style={{background: color}}>
                        {color === defaultColor && <FiCheck color={"white"}/>}
                    </div></li>)}</ul>
                    <br/>
                    <br/>
                    <ItemsCounter amount={amount} increment={increaseAmount} decrement={decreaseAmount}/>

                    <Link to={"/cart"} onClick={() => addToCart({id, name, description, image, defaultColor, amount, productDetails})}>
                        <button>Add to cart</button>
                    </Link>
                </div>


            </div>

        </>
    )
}
export default SingleProduct