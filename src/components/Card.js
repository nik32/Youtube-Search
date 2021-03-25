import React, {useEffect, useRef} from 'react';
import M from 'materialize-css';

function Card(props) {
    const para_ref = useRef(null);
    
    let cursor_style;
    if(props.setVideoID)
        cursor_style = {cursor: "pointer"};

    function setVideoHandler() { 
        if(typeof props.setVideoID === 'function'){
            props.setVideoID();
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0;// For Chrome, Firefox, IE anOpera
        }
    }
    
    useEffect(() => M.Tooltip.init(para_ref.current, {margin: 0, html: props.title, exitDelay: 0}));

    return (
        <div className="col s6 m4 l4">
            <div className="card" style={{height: "225px"}}>
                <div className="card-image " style={{width: "100%", height: "65%", overflow: "hidden"}}>
                    <img    src={props.img} style={cursor_style} alt="card image"
                            onClick={setVideoHandler}/>
                    <span   className="card-title" 
                            style={{fontWeight:"normal"}}>
                                {props.caption}
                    </span>
                </div>
                <div className="card-content activator" style={{width: "100%", height: "35%", cursor: "pointer"}}>
                    <p  className="activator"
                        style={{color: 'black', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}} 
                        ref={para_ref}>
                            {props.title}
                    </p>
                    {props.channel ? <a href={`https://www.youtube.com/channel/${props.channel}`} 
                                        target="_blank">
                                        [Channel]
                                     </a> : null}
                    {props.playlist ? <a href={`https://www.youtube.com/playlist?list=${props.playlist}`} 
                                         target="_blank">
                                        [Playlist]
                                       </a> : null}
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">{props.title}
                        <i className="material-icons right">close</i>
                    </span>
                    {props.description}
                </div>
            </div>
        </div>
    );
}

export default Card;
