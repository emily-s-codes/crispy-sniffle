import "./Navbar.css"
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <ul className="navbarUL">
            <li>
                <NavLink path="/">Log In</NavLink>
            </li>
        </ul>
    );
}

export default Navbar;