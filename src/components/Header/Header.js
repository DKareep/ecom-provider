
import './Styles/Header.scss'
import {useState} from "react";
import {Link} from "react-router-dom";

const Header = () => {

    const [openNav, setOpenNav] = useState(false)
    return (
        <header className={"header-wrapper"}>
            <Link className={"link-unset"} to={"/"}><h3>Dyntra</h3></Link>
            <button className={"toggle-btn"} onClick={() => setOpenNav(!openNav)}>{openNav ? "open" : "close"}</button>
            <nav className={`toggler ${openNav && 'toggler-switch'}`}>
                <ul className={"nav-items"}>
                    <li><Link className={"link-unset"} to={"/"}>Home</Link> </li>
                    <li><Link className={"link-unset"} to={"/about"}>About</Link></li>
                    <li><Link className={"link-unset"} to={"/cart"}>Cart</Link></li>
                </ul>
            </nav>

        </header>
    )
}

export default Header