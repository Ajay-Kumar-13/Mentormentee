import React,{useState} from "react";
import axios from "axios";

function Student(props) {


    const handleClick = () => {
        document.getElementById("toggler").click();
        document.getElementById("chatBox").style.display = "block"
        axios.get("https://mentormentee-server.onrender.com/data/"+props.branch+'/'+props.data.REGISTRATIONNUMBER)
            .then(response => {
                props.function(response.data);
            })
    }

    return(
        <React.Fragment>
            <div className="student" id="studentDiv" onClick={handleClick}>
            
                <span>{props.data.REGISTRATIONNUMBER}</span>
            </div>
        </React.Fragment>
    );  
}

export default Student;
