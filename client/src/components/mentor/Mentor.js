import React, { useEffect, useState } from "react";
import axios from "axios";
import './mentor.css';
import Messenger from "../../messenger/messenger";
import Student from "./student";
import { useLocation, useNavigate } from "react-router-dom";

function Mentor() {

    const { state } = useLocation();
    const user = state.data;

    console.log("mentor page", user);

    const navigate = useNavigate();

    const [data, setData] = useState();
    const [student, setStudent] = useState();
    const [convo, setConvo] = useState([]);
    const [caseModel, createModelCase] = useState({
        title: "",
        description: ""
    });
    const [cases, setCases] = useState();


    var navbar = document.getElementById("navbar");
    var navbarHeight = navbar?.offsetHeight;
    var vh = (window.innerHeight - navbarHeight) * 0.94;
    document.documentElement.style.setProperty('--vh', `${vh}px`);



    useEffect(() => {
        axios.get('https://mentormentee-server.onrender.com/data/mentor/' + user.Branch + '/' + user.Username)
            .then(response => {
                setData(response.data);
            })
    }, [])

    useEffect(() => {
        if (student) {
            axios.get("https://mentormentee-server.onrender.com/auth/conversation/" + student.REGISTRATIONNUMBER)
                .then(response => {
                    if (response.data.length != 0) {
                        setConvo(response.data);
                    } else {
                        setConvo([])
                    }
                })
        }
    }, [student])

    useEffect(() => {
        student && navigate(`/mentor/${student?.REGISTRATIONNUMBER}/cases`, { state: student?.REGISTRATIONNUMBER });
    }, [cases])

    function handleStudent(student) {
        setStudent(student[0]);
    }

    const handleConversation = () => {
        if (student) {
            axios.post('https://mentormentee-server.onrender.com/auth/conversation/' + user.Username + '/' + student.REGISTRATIONNUMBER)
                .then(response => {
                    if (response.data.success) {
                        alert("Conversation created succesfully!")
                    } else {
                        alert("Conversation created succesfully!")
                    }
                })
        }
    }

    const handleSubmitCase = () => {
        axios.post('https://mentormentee-server.onrender.com/data/case/' + student.REGISTRATIONNUMBER, caseModel)
            .then(response => {
                if (response.data.success) {
                    document.getElementById("closeModel").click();
                }
            })
    }

    const handleCase = (e) => {
        const { name, value } = e.target;
        createModelCase(prev => {
            return ({
                ...prev, [name]: value
            })
        })
    }

    const handleNavbar = () => {
        axios.get("https://mentormentee-server.onrender.com/data/cases/" + student?.REGISTRATIONNUMBER)
            .then(response => {
                setCases([response.data]);
            })

    }

    const handleToogle = () => {
        let className = document.getElementById("toggler").className;
        if (className == "btn-close") {
            document.getElementById("mentees").style.display = "none";
            document.getElementById("toggler").className = "navbar-toggler-icon";
        }

    }

    const handleMentees = () => {
        document.getElementById("mentees").style.display = "block";
        document.getElementById("toggler").click();
        document.getElementById("toggler").className = "btn-close";
    }



    return (
        <React.Fragment>
            <div className="contact">
                <div className="flex-box">
                    <div className="flex-item">
                        <span><i class="fas fa-phone"></i> Call us : 0891-2840555 / 0891-2866444  <i class="fas fa-envelope"></i> E-mail : moodle_support@gitam.edu</span>
                    </div>
                </div>
            </div>
            <div className="mentor">
                <div id="navbar" className="Navbar">

                    <nav class="navbar navbar-expand-lg navbar-light bg-light">

                        <div className="image">
                            <img src="Images/GITAM-logo.jpg" className="GitamLogo" />
                        </div>

                        <a class="navbar-brand" href="/mentor"></a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" >
                            <span id="toggler" onClick={handleToogle} class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav mr-auto navbarLinks">
                                <li class="nav-item active">
                                    <a class="nav-link" onClick={handleMentees}>My Mentees</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" onClick={handleNavbar} style={{ cursor: "pointer" }}>Cases</a>
                                </li>

                                <li class="nav-item mentorName">
                                    <a class="nav-link">{user?.Name}</a>
                                </li>
                            </ul>
                        </div>

                    </nav>

                </div>

                <div className="mentordashboard">
                    <div className="students" id="mentees">
                        {
                            data && data.map((student, index) =>

                                <Student
                                    key={index}
                                    data={student}
                                    function={handleStudent}
                                    branch={user.Branch}
                                />
                            )
                        }
                    </div>
                    <div className="controls" id="controls">
                        <div className="studentDetails">
                            <p className="p1">STUDENT DETAILS</p>
                            <table class="table table-striped">
                                <thead>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Name</th>
                                        <td>{student ? student.NAME : ""}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Degree</th>
                                        <td>{student ? student.DEGREE : ""}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Email</th>
                                        <td>{student ? student.EMAIL : ""}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Mobile Number</th>
                                        <td>{student ? student.MOBILENUMBER : ""}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Course</th>
                                        <td>{student ? student.COURSE : ""}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="p1">PARENT DETAILS</p>
                            <table class="table table-striped">
                                <thead>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Parent Name</th>
                                        <td>{student ? student.PARENTNAME : ""}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Parent Mobile</th>
                                        <td>{student ? student.PARENTMOBILE : ""}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Parent Email</th>
                                        <td>{student ? student.PARENTEMAIL : ""}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="activity flex-box">
                                <div className="cases flex-item">
                                    <span role="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="flex-text">Create a Case</span>
                                </div>
                                {
                                    convo.length > 0 ? null : <div className="messages flex-item">
                                        <span className="flex-text" onClick={handleConversation}>Start a conversation</span>
                                    </div>
                                }

                            </div>

                        </div>
                        <div id="chatBox" className="chatBox">
                            <p style={{ padding: "10px", fontSize: "25px", margin: 0, display:"none" }} className="conversationwith">Conversation with {student?.NAME}</p>
                            <Messenger user={user} conversation={convo} />
                        </div>
                    </div>

                </div>

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Case</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Case Title</label>
                                    <input name="title" type="text" class="form-control" id="exampleFormControlInput1" placeholder="Attendance Issue" onChange={handleCase} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlTextarea1" class="form-label">Case Description</label>
                                    <textarea name="description" class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={handleCase}></textarea>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" id="closeModel" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" onClick={handleSubmitCase} class="btn" style={{ backgroundColor: "#b1040e", color: "white" }}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Mentor;
