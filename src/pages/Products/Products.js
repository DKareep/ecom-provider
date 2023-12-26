import Hero from "../../components/Hero/Hero";
import "./Styles/Products.scss"
import {useProducts} from "../../contexts/ProductsContext/Products";
import Product from "../../components/Product/Product";
import {useFilters} from "../../contexts/FilterContext/Filters";
import { FiGrid } from "react-icons/fi";
import { FiList } from "react-icons/fi";
const Products = () => {

    const { loadingProducts, errorProducts} = useProducts()

    const { filtered_products, switchView, grid_view, updateSort, sort} = useFilters()

    if(loadingProducts) {
        return  <div>Loading...</div>
    }

    if(errorProducts) {
        return  <div>Error...</div>
    }

    if(filtered_products < 1) {
        return <div>No products available</div>
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

                    <div className="view-sort-container">
                    <ul className={"switch-view"}>
                        <li onClick={() => switchView('grid')}><FiGrid className={grid_view && "active-btn"}/></li>
                        <li onClick={() => switchView('list')}><FiList className={!grid_view && "active-btn" }/></li>
                        <li>{filtered_products?.length} Products Found</li>
                    </ul>

                        <div className="sort-container">
                            <form action="">
                                <label htmlFor="sort">Sort by</label>
                                <select name="sort" id="sort-dropdown" value={sort} onChange={updateSort}>
                                    <option value="price-lowest">Price Lowest</option>
                                    <option value="price-highest">Price Highest</option>
                                    <option value="name-az">Name (a-z)</option>
                                    <option value="name-za">Name (z-a)</option>
                                </select>
                            </form>
                        </div>
                    </div>

                    <section className={grid_view ? "all-products-grid" :"all-products-list"}>
                    {filtered_products?.map((product) => {
                        return(
                     <Product key={product.id} {...product} grid_view={grid_view} />
                        )
                    })}
                    </section>
                </section>
            </section>

        </section>


    )
}

export default Products