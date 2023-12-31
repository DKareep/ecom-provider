import Hero from "../../components/Hero/Hero";
import "./Styles/Products.scss";
import { useProducts } from "../../contexts/ProductsContext/Products";
import Product from "../../components/Product/Product";
import { useFilters } from "../../contexts/FilterContext/Filters";
import { FiGrid, FiList, FiCheckCircle } from "react-icons/fi";

import { filterUniqueValues } from "../../utils/helper";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";

const Products = () => {
  const { products, loadingProducts, errorProducts } = useProducts();

  const {
    filtered_products,
    switchView,
    grid_view,
    updateSort,
    sort,
    filters,
    updateFilters,
    resetFilters,
  } = useFilters();

  const { search, company, category, color, max_price, price, free_shipping } =
    filters;

  const categories = filterUniqueValues(products, "category");
  const companies = filterUniqueValues(products, "company");
  const colors = filterUniqueValues(products, "colors");
  const formattedPrice = Number(price / 100).toFixed(2);
  return (
    <section className={"products-page"}>
      {errorProducts ? (
        <Error />
      ) : (
        <>
          <Hero page={"Products"} />
          {loadingProducts ? (
            <Loading />
          ) : (
            <section className={"products-container"}>
              <aside>
                <form onSubmit={(e) => e.preventDefault()}>
                  <section className={"search-container"}>
                    <label htmlFor={"search"}>Search</label>
                    <br />
                    <input
                      type="text"
                      id={"search"}
                      name={"search"}
                      value={search}
                      onChange={updateFilters}
                    />
                  </section>
                </form>

                <section className={"company-category-container"}>
                  <p className={"filter-header-text"}>Category</p>
                  {categories.map((categoryItem) => (
                    <button
                      key={categoryItem}
                      onClick={updateFilters}
                      name={"category"}
                      value={categoryItem}
                      className={`filter-button ${
                        category === categoryItem.toLowerCase() &&
                        "filter-button-active"
                      }`}
                    >
                      {categoryItem}
                    </button>
                  ))}
                </section>
                <section className={"company-filter-container"}>
                  <p className={"filter-header-text"}>Company</p>
                  {companies.map((companyItem) => (
                    <button
                      key={companyItem}
                      value={companyItem}
                      onClick={updateFilters}
                      name={"company"}
                      className={`filter-button ${
                        company === companyItem.toLowerCase() &&
                        "filter-button-active"
                      }`}
                    >
                      {companyItem}
                    </button>
                  ))}
                </section>

                <section className={"color-filter-container"}>
                  <p className={"filter-header-text"}>Colors</p>

                  {colors.map((colorItem) => {
                    if (colorItem === "all") {
                      return (
                        <button
                          name={"color"}
                          key={colorItem}
                          className={`filter-button all-colors ${
                            color === colorItem.toLowerCase() &&
                            "filter-button-active"
                          }`}
                          onClick={updateFilters}
                          data-color={colorItem}
                        >
                          all
                        </button>
                      );
                    }
                    return (
                      <button
                        name={"color"}
                        key={colorItem}
                        className={`color-button`}
                        style={{ background: colorItem !== "all" && colorItem }}
                        onClick={updateFilters}
                        data-color={colorItem}
                      >
                        {colorItem === color && colorItem !== "all" ? (
                          <FiCheckCircle size={12} color={"white"} />
                        ) : null}
                      </button>
                    );
                  })}
                </section>
                <section className="price-filter-container">
                  <p className={"filter-header-text"}>Price</p>
                  <p className={"filter-price"}>{formattedPrice}$</p>
                  <input
                    type="range"
                    name={"price"}
                    min={0}
                    max={max_price}
                    value={price}
                    onChange={updateFilters}
                  />
                </section>

                <section className="freeshipping-container">
                  <label htmlFor="shipping">Free shipping</label>
                  <input
                    id={"shipping"}
                    type="checkbox"
                    name={"free_shipping"}
                    onChange={updateFilters}
                    checked={free_shipping}
                  />
                </section>

                <button className={"clear-btn"} onClick={resetFilters}>
                  Clear Filters
                </button>
              </aside>

              <section className={"products-section"}>
                {filtered_products < 1 ? (
                  <p className={"no-products"}>No products available</p>
                ) : (
                  <>
                    <div className="view-sort-container">
                      <ul className={"switch-view"}>
                        <li onClick={() => switchView("grid")}>
                          <FiGrid
                            className={`grid-list-switch-btn ${
                              grid_view && "active-btn"
                            }`}
                          />
                        </li>
                        <li onClick={() => switchView("list")}>
                          <FiList
                            className={`grid-list-switch-btn ${
                              !grid_view && "active-btn"
                            }`}
                          />
                        </li>
                        <li>{filtered_products?.length} Products Found</li>
                      </ul>

                      <div className="sort-container">
                        <form action="">
                          <label
                            className={"sort-by-text"}
                            htmlFor="sort-dropdown"
                          >
                            Sort by
                          </label>
                          <select
                            name="sort"
                            id="sort-dropdown"
                            value={sort}
                            onChange={updateSort}
                          >
                            <option value="price-lowest">Price Lowest</option>
                            <option value="price-highest">Price Highest</option>
                            <option value="name-az">Name (a-z)</option>
                            <option value="name-za">Name (z-a)</option>
                          </select>
                        </form>
                      </div>
                    </div>

                    <section
                      className={
                        grid_view ? "all-products-grid" : "all-products-list"
                      }
                    >
                      {filtered_products?.map((product) => {
                        return (
                          <Product
                            key={product.id}
                            {...product}
                            grid_view={grid_view}
                          />
                        );
                      })}
                    </section>
                  </>
                )}
              </section>
            </section>
          )}
        </>
      )}
    </section>
  );
};

export default Products;
