import React, { useState } from 'react';
import './cases.css';
import axios from "axios";

function Mnewcase(props) {

    const [newcase, setCase] = useState({
        title: props.title,
        description: props.description
    });

    const handleDelete = () => {
        axios.delete("/data/deleteCase/" + props.title)
            .then(response => {
                console.log("delete response", response.data);
                if (response.data.success) {
                    window.location.reload();
                }
            })
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCase(prev => {
            return ({
                ...prev, [name]: value
            })
        })
    }

    const handleUpdate = () => {

        axios.put("/data/updateCase/" + props.title, newcase)
            .then(response => {
                if (response.data.success) {
                    document.getElementById("closeModel").click();
                    window.location.reload();
                }
            })
    }

    return (
        <React.Fragment>
            <div className='newCase row'>
                <div className='casechild col-md-3'>
                    <p>{props.sno + 1}</p>
                </div>
                <div className='casechild col-md-3'>
                    <button className='title' type="button" data-bs-toggle="collapse" data-bs-target={"#id" + props.sno}>{props.title}</button>
                </div>
                <div className='casechild col-md-3'>
                    <p>Created At: {props.createdAt}</p>
                </div>
                <div className='casechild col-md-2'>
                    <p>Time: {props.time}</p>
                </div>
                <div className='casechild col-md-1'>
                    <i className='fas fa-trash editIcon' onClick={handleDelete}></i>
                    <i className='fas fa-pencil editIcon' data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                </div>
            </div>
            <div id={"id" + props.sno} className='collapse description'>
                <div className='card card-body'>
                    {props.description}
                </div>
            </div>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Update Case</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Case Title</label>
                                <input name="title" type="text" class="form-control" id="exampleFormControlInput1" value={newcase.title} onChange={handleChange} />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Case Description</label>
                                <textarea name="description" class="form-control" id="exampleFormControlTextarea1" rows="3" value={newcase.description} onChange={handleChange}></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" id="closeModel" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleUpdate} class="btn" style={{ backgroundColor: "#b1040e", color: "white" }}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Mnewcase;