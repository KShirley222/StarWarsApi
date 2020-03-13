 import React, {useState} from 'react';
 import axios from 'axios';
 import {navigate} from '@reach/router';

 const Swapi= props =>{

    const [search, Setsearch] = useState("people");
    const [idNum, SetidNum] = useState("");
    const [responseData, setResponseData] = useState({});
    

    // search state change tracker
    const searchChange = e =>{
        let newSearch = e.target.value;
        Setsearch(newSearch );
        console.log( newSearch );
    }

    // Id change state tracker
    const idChange = e =>{
        let newId = e.target.value;
        SetidNum(newId);
        console.log( newId );
    }

    // OnSubmit push information
    const submitHandler = e =>{
        e.preventDefault();

        let nav = '/'+ search + '/' + idNum
        navigate(nav);

        axios.get(`https://swapi.co/api/${search}/${idNum}`)
        .then(response=>{setResponseData(response.data) } )
        .catch( () =>{
            console.log("Error");
        },[]
        );

        console.log( "submit successful");
        console.log(responseData);
    }

    const key = Object.keys(responseData);
    

     return(
        <div className="container">
            <div className ="jumbotron">
             <h1 style = {{marginLeft:"20%"}}>This is Star Wars</h1>
            </div>
            <div className = "row">
                <span className ="col-sm-2"></span>
             <form onSubmit={submitHandler} className = "form-group col-sm-8" >
                <select name = "search" onChange={searchChange} className ="form-control">
                     <option value="people">people</option>
                     <option value="planets">planets</option>
                     <option value="species">species</option>
                </select> 
                <input onChange = {idChange} type = "text" name="idNum" className ="form-control"></input>
                <input type="submit" value ="See information" className ="form-control"/>
             </form>
            </div>
            <div className = "row">
                <span className ="col-sm-2"/>
                <ul className ="list-group col-sm-8">
             {
                 key.map((keys,i) =>
                 <li key={i} className = "list-group-item">{keys} : {responseData[keys]}</li>
                 )
             }
             </ul>
         </div>
        </div>
     );

 }
 
export default Swapi;