import React from "react";
import "./showKeeper.css";
import axios from "axios";

function ShowKeeper ({ keeperList, setKeeperList }) {

    function deleteKeeper(id) {
        axios.post("http://localhost:5000/api/delete", { id })
        .then(res => setKeeperList(res.data))
    }

    return (
        <div className="showKeeper row">
            {
                keeperList.map( keeper => (
                    <div className="keeperCard col-md-3" key={keeper._id}>
                        <h1 className="title">
                            {keeper.title} 
                            <i className="deleteIcon fa fa-trash" aria-hidden="true" onClick={() => deleteKeeper(keeper._id)} ></i>
                            </h1>
                        <textarea 
                            className="descriptionBox" 
                            value={keeper.description} 
                            readOnly />
                    </div>
                ))
            }
        </div>
    )
}


export default ShowKeeper;