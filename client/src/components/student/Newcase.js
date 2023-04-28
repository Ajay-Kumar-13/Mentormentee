import React from 'react';
import './cases.css'

function Newcase(props) {

    return (
        <React.Fragment>
            <div className='newCase row'>
                <div className='casechild col-md-3'>
                    <p>{props.sno + 1}</p>
                </div>
                <div className='casechild col-md-3'>
                    <button className='title' type="button" data-bs-toggle="collapse" data-bs-target={"#id"+props.sno}>{props.title}</button>
                </div>
                <div className='casechild col-md-3'>
                    <p>Created At: {props.createdAt}</p>
                </div>
                <div className='casechild col-md-3'>
                    <p>Time: {props.time}</p>
                </div>
            </div>
            <div id={"id"+props.sno} className='collapse description'>
                <div className='card card-body'>
                    {props.description}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Newcase;