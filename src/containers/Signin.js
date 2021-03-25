import React from 'react';
import {useHistory} from 'react-router-dom';
import M from "materialize-css";

import flintzy from '../misc/Flintzy.png';

function Signin(props) {
    const histroy_obj = useHistory();
    function setData() {
        const username = document.getElementsByTagName("input")[0].value;
        const password = document.getElementsByTagName("input")[1].value;
        if(username !== "" && password !== ""){
            localStorage.setItem("token", true);
            props.setToken(true);
            histroy_obj.replace("/");
            M.toast({html: `Welcome ${username}  :)`, classes: "#c62828 green darken-3"});
        }
        else
            M.toast({html: "Enter Email/Password", classes: "#c62828 red darken-3"});
    }

    return (
        <div className="row" style={{position: "fixed", height: "100%", width: "100%",overflow: "auto" /*overflow: 'hidden' */}}>
            <div className="col s12 m4 l6" style={{padding: "7% 10%"}}>
                <center><i className="material-icons medium">account_circle</i></center>
                <center><h4 style={{margin: "5% 0"}}>Signin</h4></center>
                <div className="input-field">
                    <input type="text" className="validate" id="u_name"/>
                    <label htmlFor="u_name">Username</label>
                </div>
                <div className="input-field">
                    <input type="password" className="validate" id="password"/>
                    <label htmlFor="password">Password</label>
                </div>
                <center>
                    <button className="btn waves-effect waves-light" onClick={setData} name="action" 
                            style={{marginTop: "8%"}}>
                                Signin
                                <i className="material-icons right">arrow_forward</i>
                    </button>
                </center>
            </div>
            <div className="col s12 m8 l6" style={{padding: "0px 0px"}}>
                <div className="card">
                    <div className="card-image">
                        <img src={flintzy} alt="flintzy.com logo"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin;
