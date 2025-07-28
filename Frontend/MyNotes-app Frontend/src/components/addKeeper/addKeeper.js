import { useState } from "react";
import "./addKeeper.css";
import axios from "axios";

function AddKeeper( { setKeeperList }) {

     const[keeperObj, setKeeperObj]= useState({
        title:"",
        description:""
     });

     function handleChange(event) {
        const { name, value } = event.target;
           setKeeperObj((keeperObj) => {
              return {
                ...keeperObj,
                [name]: value,
               };
            });
        } 

        function add() {
            if(keeperObj.title){
                axios.post("http://localhost:5000/api/addNew",keeperObj )
                .then(res => setKeeperList(res.data))
                setKeeperObj({
                title: "",
                description:""
            })
            }
        }

    return (
         <div className="addKeeper">
            <input
            className="inputBox titleInput"
            type="text"
            name="title"
            autoComplete="off"
            placeholder="Add Title"
            onChange={handleChange}
            value={keeperObj.title}
          />

           <textarea
           className="inputBox description"
           name="description"
           placeholder="Add Description Here..."
           onChange={handleChange}
           value={keeperObj.description}     
         />

         <div className="addButton" onClick={add}>Add</div>

         </div>

     );
}

export default AddKeeper;