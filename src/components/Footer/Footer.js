import "./Styles/Footer.scss";

const Footer = () => {
  return (
    <footer className={"footer-wrapper"}>
      <p>&copy; All rights reserved {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
