import "./Styles/Hero.scss";
import { Link } from "react-router-dom";

const Hero = ({ page }) => {
  return (
    <section className={"hero-section"}>
      <p>
        <Link className={"link-unset"} to={"/"}>
          Home
        </Link>{" "}
        &gt; {page}
      </p>
    </section>
  );
};

export default Hero;
