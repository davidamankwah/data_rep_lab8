//imports
import React from 'react';
import { useParams } from 'react-router-dom'; //import react router dom
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function Edit(props) {
    // The useParams hook returns an object of key/value pairs of
    // the dynamic params from the current URL that were matched by
    //the <Route path>.
    
    
    let { id } = useParams();
    // update arrays using the React useState()
    // and without the Array object's push() method
    const [title, setTitle] = useState("");
    const [cover, setCover] = useState("");
    const [author, setAuthor] = useState("");
    // useNavigate return a function that we can use to navigate
    const navigate = useNavigate();

    //useEffect Hook is similar componentDidMount
    useEffect( ()=> {
    //axios is a promised based web client
    //make a HTTP Request with GET method and pass as part of the
    //url.
    //reads record to database
    axios.get('http://localhost:4000/api/book/' + id)
    .then( (response) =>{
        // Assign Response data to the arrays using useState.
        //update variables
        setTitle(response.data.title);
        setCover(response.data.cover);
        setAuthor(response.data.author);
    } )
    .catch(function(error) {
        console.log(error);
    })
    }, []);

    //execute event when submit
    const handleSubmit = (event) => {
        event.preventDefault();

        //define newbook object 
        const newBook = {
            //set id,cover,author
            id:id,   
            title:title,
            cover:cover,
            author:author
        };
        //Sends you to the book you want edited
        //pass up edited books
        axios.put('http://localhost:4000/api/book/' + id, newBook)
        .then((res) => {
        console.log(res.data); //output book data to console
        navigate('/read'); //direct read page
        });
    }

    return(
        <div>
            {/* call handleSubmit event when clicking edit book */}
            <form onSubmit={handleSubmit}>  
              {/* edit book   */}
            <div className="form-group">
                <label>Add Book Title: </label>
                <input type="text" className="form-control"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            {/* eidt cover */}
            <div className="form-group">
                <label>Add Cover: </label>
                <input type="text"
                className="form-control"
                value={cover}
                onChange={(e) => setCover(e.target.value)}
                />
            </div>
            {/* edit author */}
            <div className="form-group">
                <label>Add Author: </label>
                <input type="text"
                className="form-control"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                />
            </div>
            <div className="form-group">
              {/* submit button to edit book information   */}
            <input type="submit" value="Edit Book" className="btn btn-primary"/>
            </div>
            </form>
        </div>
    )
}