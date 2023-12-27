import Hero from "../../components/Hero/Hero";
import "./Styles/Products.scss"
import {useProducts} from "../../contexts/ProductsContext/Products";
import Product from "../../components/Product/Product";
import {useFilters} from "../../contexts/FilterContext/Filters";
import {FiGrid, FiList, FiCheckCircle} from "react-icons/fi";

import {filterUniqueValues} from '../../utils/helper'

const Products = () => {

    const {products, loadingProducts, errorProducts} = useProducts()


    const {
        filtered_products,
        switchView,
        grid_view,
        updateSort,
        sort,
        filters,
        updateFilters,
        resetFilters
    } = useFilters()

    const {

        search,
        company,
        category,
        color,
        max_price,
        price,
        free_shipping

    } = filters


    const categories = filterUniqueValues(products, 'category')
    const companies = filterUniqueValues(products, 'company')
    const colors = filterUniqueValues(products, 'colors')
    if (loadingProducts) {
        return <div>Loading...</div>
    }

    if (errorProducts) {
        return <div>Error...</div>
    }


    return (
        <section className={"products-page"}>
            <Hero page={"Products"}/>
            <section className={"products-container"}>
                <aside>
                    <form onSubmit={(e) => e.preventDefault()}>

                        <div>
                            <label htmlFor={"search"}>Search</label>
                            <br/>
                            <input type="text"
                                   id={"search"}
                                   name={"search"}
                                   value={search}
                                   onChange={updateFilters}
                            />
                        </div>
                    </form>


                    <h3>Category</h3>
                    {categories.map(categoryItem => <button
                        key={categoryItem}
                        onClick={updateFilters}
                        name={"category"}
                        value={categoryItem}
                        className={`filter-button ${category === categoryItem.toLowerCase() && 'filter-button-active'}`}>
                        {categoryItem}</button>)}
                    <h3>Company</h3>
                    {companies.map(companyItem => <button
                        key={companyItem}
                        value={companyItem}
                        onClick={updateFilters}
                        name={"company"}
                        className={`filter-button ${company === companyItem.toLowerCase() && 'filter-button-active'}`}>
                        {companyItem}
                    </button>)}
                    <h3>Colors</h3>

                    {colors.map(colorItem => {
                        if(colorItem === 'all') {
                            return <button
                                name={"color"}
                                key={colorItem}

                                className={`filter-button ${color === colorItem.toLowerCase() && 'filter-button-active'}`}
                                style={{display: 'inline'}}
                                onClick={updateFilters}
                                data-color={colorItem}
                            >all</button>
                        }
                        return <button
                            name={"color"}
                            key={colorItem}
                            className={`color-button`}
                            style={ {background: colorItem !== 'all' && colorItem } }
                            onClick={updateFilters}
                            data-color={colorItem}
                        >{colorItem === color && colorItem !== 'all' ? <FiCheckCircle size={12} color={"white"}  /> : null}</button>

                    } ) }
                    <h3>Price</h3>
                    <p>{price}$</p>
                    <input type="range"
                           name={"price"}
                           min={0}
                           max={max_price}
                           value={price}
                           onChange={updateFilters}
                    />

                    <br/>
                    <br/>
                    <label htmlFor="shipping">Free shipping</label>
                    <input id={"shipping"} type="checkbox"
                           name={"free_shipping"}
                           onChange={updateFilters}
                           checked={free_shipping}/>



                    <br/>
                    <br/>
                    <br/>
                    <button onClick={resetFilters}>Clear Filters</button>
                </aside>

                <section>
                    <p>Products</p>

                    {filtered_products < 1 ? <div>No products available</div> :

                        <>
                    <div className="view-sort-container">
                        <ul className={"switch-view"}>
                            <li onClick={() => switchView('grid')}><FiGrid className={grid_view && "active-btn"}/></li>
                            <li onClick={() => switchView('list')}><FiList className={!grid_view && "active-btn"}/></li>
                            <li>{filtered_products?.length} Products Found</li>
                        </ul>

                        <div className="sort-container">
                            <form action="">
                                <label htmlFor="sort-dropdown">Sort by</label>
                                <select name="sort" id="sort-dropdown" value={sort} onChange={updateSort}>
                                    <option value="price-lowest">Price Lowest</option>
                                    <option value="price-highest">Price Highest</option>
                                    <option value="name-az">Name (a-z)</option>
                                    <option value="name-za">Name (z-a)</option>
                                </select>
                            </form>
                        </div>
                    </div>

                    <section className={grid_view ? "all-products-grid" : "all-products-list"}>
                        {filtered_products?.map((product) => {
                            return (
                                <Product key={product.id} {...product} grid_view={grid_view}/>
                            )
                        })}
                    </section></> }
                </section>
            </section>

        </section>


    )
}

export default Products