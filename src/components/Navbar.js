import React, {useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom';
import M from "materialize-css";


const Navbar = (props) => {
    let sidenav_ref = useRef(null);
    let active_route = useLocation();
    useEffect(() => {
        M.Sidenav.init(sidenav_ref.current, {
            edge: "right",
        });
    }, []);

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
                        url: "/signout",
                        icon: "exit_to_app",
                        label: "Signout"
                    },];


    let active = "active teal darken-2";

    return (
        <>
        <div className = "navbar-fixed navbar-margin">
            <nav>
                <div className="nav-wrapper custom-navbar">
                    <div className="brand-logo left" >
                        <Link to="/">Flintzy</Link>
                    </div>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger right"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        {
                            routes.map((route, indx) => (
                                <li key={indx} className={active_route.pathname === route.url ? active : null}>
                                    <Link to={route.url}>
                                        <i className="material-icons left">{route.icon}</i>
                                        <span style={{fontSize: "13px"}}>{route.label}</span>
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
                <li key={indx}  className={active_route === route.url ? active : null}>
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
