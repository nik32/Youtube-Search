import React, {useState, useEffect, useRef} from 'react';
import M from "materialize-css";

import CardList from '../components/CardList';



function Dummy() {
    const tabs_mob = useRef(null); 
    const carousel_mob = useRef(null);
    const select = useRef(null); 
    const tabs = useRef(null); 
    const carousel = useRef(null);
    const [carousel_instance, setInstance] = useState(null);

    function next() {
        if(carousel_instance)
            carousel_instance.next();
    }

    function previous() {
        if(carousel_instance)
            carousel_instance.prev();
    }

    useEffect(() => {
        M.Tabs.init(tabs_mob.current);
        M.Carousel.init(carousel_mob.current, {noWrap: true, dist: 0, padding: 25});
        M.FormSelect.init(select.current);
        M.Tabs.init(tabs.current);
        let instance = M.Carousel.init(carousel.current, {noWrap: true, dist: 0, padding: 25});
        setInstance(instance);
    }, []);

    return (
        [<div className="container hide-on-small-only" key="c1">
            <div className="row">

                <div className="col s10" style={{marginTop:"11px"}}>
                    <ul className="tabs z-depth-1" ref={tabs}>
                        <li className="tab col s6" key="t1"><a href="#" className="active">Tab 1</a></li>
                        <li className="tab col s6" key="t2"><a href="#">Tab 2</a></li>
                    </ul>
                </div>
                
                <div className="input-field col s2">
                    <select className="browser-default z-depth-1" ref={select} id="dummy-select"
                            style={{fontFamily:"Quicksand"}}>
                        <option value="1" style={{fontFamily:"Quicksand"}}>Youtube</option>
                        <option value="2" style={{fontFamily:"Quicksand"}}>Twitter</option>
                    </select>
                    <label htmlFor="dummy-select" />
                </div>

            </div>
            <div className="row">

                <div className="col s1" style={{marginTop:"15%"}}>
                    <a className="btn-floating btn-medium waves-effect waves-light red" onClick={previous}><i className="material-icons">chevron_left</i></a>
                </div>
                
                <div className="col s10">
                    <div className="carousel carousel-slider" ref={carousel}>
                        <a className="carousel-item"><CardList mob={false}/></a>
                        <a className="carousel-item"><CardList mob={false}/></a>
                        <a className="carousel-item"><CardList mob={false}/></a>
                    </div>
                </div>
                
                <div className="col s1" style={{marginTop:"15%"}}>
                    <a className="btn-floating btn-medium waves-effect waves-light red" onClick={next}><i className="material-icons">chevron_right</i></a>
                </div>
            
            </div>
        </div>,

        <div className="container hide-on-med-and-up" key="c2">
            {/* Code for mobiles */}
            <div className="row" style={{marginLeft:"10.5px",marginRight:"10.5px"}}>
                <a className="waves-effect waves-light btn red col s5">Youtube</a>
                <div className="col s2"></div>
                <a className="waves-effect waves-light btn red col s5">Twitter</a>
            </div>
            <div className="row">
                <div className="carousel carousel-slider" ref={carousel_mob}>
                    <a className="carousel-item"><CardList mob={true}/></a>
                    <a className="carousel-item"><CardList mob={true}/></a>
                    <a className="carousel-item"><CardList mob={true}/></a>
                </div>
            </div>
            <div className="row" style={{position: "fixed", bottom: "0", right: "0", left: "0", margin:"1px 0px", width: "100%"}}>
                <ul className="tabs z-depth-3" ref={tabs_mob}>
                    <li className="tab col s6" key="t1"><a className="active">Tab 1</a></li>
                    <li className="tab col s6" key="t2"><a>Tab 2</a></li>
                </ul>
            </div>
        </div>]
    );
}

window.onresize = (e) =>    {   
    if(document.location.pathname === "/dummy")
        document.location.reload();//because carasoul needs reload on resolution change to display properly
}

export default Dummy;

