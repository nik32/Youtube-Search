import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import M from "materialize-css";


const Navbar = (props) => {
    let sidenav_ref = useRef(null);
    let active_route = useLocation();
    useEffect(() => {
        M.Sidenav.init(sidenav_ref.current, {
            edge: "right",
        });
    }, []);

    function handleSignout() {
        props.setToken(null);
        localStorage.removeItem("token");
    }

    const routes = [{
        url: "/",
        icon: "youtube_searched_for",
        label: "Youtube Search"
    },
    {
        url: "/dummy",
        icon: "dashboard",
        label: "Dummy"
    },
    {
        url: "/signin",//The URL is "/signin" coz - once user click on signout button, the token will have already been destroyed by handleSignout(). So we can just directly go to signin instead of going to /signout (which will have no UI) and then redirecting to signin
        icon: "exit_to_app",
        label: "Signout"
    },];


    let active = "active teal darken-2";

    return (
        <>
            <div className="navbar-fixed navbar-margin">
                <nav>
                    <div className="nav-wrapper custom-navbar">
                        <div className="brand-logo left" >
                            <Link to="/">Flintzy</Link>
                        </div>
                        <a  href="#click" data-target="mobile-demo" 
                            style={{cursor:"pointer"}} className="sidenav-trigger right">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="right hide-on-med-and-down">
                            {
                                routes.map((route, indx) => (
                                    <li key={indx} className={active_route.pathname === route.url ? active : null}
                                        onClick={route.url === "/signin" ? handleSignout : null}>{/*The signout logic had to be handled here coz you are calling setToken() while logging out. And if you call the setToken() [which is a setState() call] directly in the signout component then it will be a bad setToken call as you will be calling setToken while the signout component is rendering. But here instead of calling, you are passing it through a refernece of handleSignout function, which will be called when user clicks on the "li", which can only happen when UI is fully rendered */}
                                        <Link to={route.url}>
                                            <i className="material-icons left">{route.icon}</i>
                                            <span style={{ fontSize: "13px" }}>{route.label}</span>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </nav>
            </div>
            <ul className="sidenav sidenav-close" id="mobile-demo" ref={sidenav_ref}>
                {
                    routes.map((route, indx) => (
                        <li key={indx} className={active_route === route.url ? active : null}
                            onClick={route.url === "/signin" ? handleSignout : null}>
                            <Link to={route.url}>
                                <i className="material-icons left">{route.icon}</i>
                                {route.label}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </>
    );
}

export default Navbar;
