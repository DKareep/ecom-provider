import './App.css';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Wrapper from "./pages/Wrapper/Wrapper";
import Products from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Wrapper/>}>
                    <Route path={"/"} element={<Products />} />
                    <Route path={"/cart"} element={<Cart />} />
                    <Route path={"/about"} element={<Cart/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
