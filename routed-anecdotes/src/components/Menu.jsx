import { NavLink } from "react-router";

const Menu = () => (
  <nav className="tabs" aria-label="Main">
    <NavLink className="nav-link" to="/" end>anecdotes</NavLink>
    <NavLink className="nav-link" to="/create">create new</NavLink>
    <NavLink className="nav-link" to="/about">about</NavLink>
  </nav>
);

export default Menu;
