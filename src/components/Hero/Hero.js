import './Styles/Hero.scss'
import {Link} from "react-router-dom";

const Hero = ({page}) => {
    return (
        <section className={"hero-section"}>
         <p><Link to={"/"}>Home</Link> / {page}</p>
        </section>
    )
}

export default Hero