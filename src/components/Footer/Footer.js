import "./Styles/Footer.scss"

const Footer = () => {
    return (
        <footer className={"footer-wrapper"}>
            <p>All rights reserved {new Date().getFullYear()}</p>
        </footer>
    )
}

export default Footer