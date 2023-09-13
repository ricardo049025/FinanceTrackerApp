import React, {useState} from "react";
import { Link } from "react-router-dom";

import './MainNavigation.css';
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

const MainNavigation = props =>{
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawerHandler = (event) =>{
        setDrawerIsOpen(!drawerIsOpen);
    }

    return (
            <React.Fragment>
                {!drawerIsOpen ? null : <Backdrop openDrawerHandler={openDrawerHandler} />}
                { drawerIsOpen ? (<SideDrawer openDrawerHandler={openDrawerHandler}>
                    <nav className="main-navigation__drawer-nav">
                        <NavLinks/>
                    </nav>
                </SideDrawer>) : null }
                <MainHeader>
                    <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                        <span/>
                        <span/>
                        <span/>
                    </button>
                    <h1 className="main-navigation__title">
                    <Link to="/"> NS AppTracking </Link>
                    </h1>
                    <nav className="main-navigation__header-nav">
                        <NavLinks />
                    </nav>
                </MainHeader>
            </React.Fragment>)

}

export default MainNavigation;