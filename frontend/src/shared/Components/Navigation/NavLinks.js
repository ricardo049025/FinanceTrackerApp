import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../Context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      { auth.isLoggedIn &&
      <li>
        <NavLink to="/" exact>
          Summary
        </NavLink>
      </li>
      }
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/transaction">New Transaction</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
