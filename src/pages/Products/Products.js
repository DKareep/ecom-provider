import Hero from "../../components/Hero/Hero";
import "./Styles/Products.scss"
import {useProducts} from "../../contexts/ProductsContext/Products";
import Product from "../../components/Product/Product";

const Products = () => {

    const {products, loadingProducts, errorProducts} = useProducts()


    if(loadingProducts) {
        return  <div>Loading...</div>
    }
    if(errorProducts) {
        return  <div>Error...</div>
    }

    return (
        <section className={"products-page"}>
            <Hero page={"Products"}/>

            <section className={"products-container"}>
                <aside>

                    <p>Category</p>

                    <p>Company</p>

                    <p>Colors</p>

                    <p>Price</p>

                    <button>Clear Filters</button>
                </aside>

                <section>
                    <p>Products</p>
                    <section className={"products-list"}>
                    {products?.map((product) => {
                        return(
                     <Product key={product.id} {...product} />
                        )
                    })}
                    </section>
                </section>
            </section>

        </section>


    )
}

export default Products