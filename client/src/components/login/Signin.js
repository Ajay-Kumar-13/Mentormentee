import React, { useEffect, useState } from "react";
import './signin.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function Signin() {

    const navigate = useNavigate();

    const [newUser, setnewUser] = useState(false);
    const [details, setDetails] = useState({
        Name: "",
        username: "",
        password: "",
        branch: "",
        role: "",
        userDetails: {
            name: "",
            designation: '',
            department: "",
            mobile: "",
            email: "",
            id: ""
        }
    });
    const [user, setUser] = useState({
        Id: "",
        receiverId: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails(prev => {
            return ({
                ...prev, [name]: value
            })
        })
    }

    useEffect(() => {
        if (details.role) {
            axios.get("/auth/signin/" + details.username)
                .then(response => {
                    console.log("account", response.data.length);
                    console.log(response.data);
                    if (response.data.length == 0) {
                        console.log("account creating ...");
                        axios.post("/auth/signUp", details)
                            .then(response => {
                                if (response.data.success) {
                                    if (details.role === "student") {
                                        setUser(prev => {
                                            return ({
                                                ...prev, Id: details.username, receiverId: details.userDetails.id
                                            })
                                        })
                                        setDetails({
                                            Name: "",
                                            username: "",
                                            password: "",
                                            branch: "",
                                            role: "",
                                            userDetails: {
                                                name: "",
                                                designation: '',
                                                department: "",
                                                mobile: "",
                                                email: "",
                                                id: ""
                                            }
                                        });
                                        setnewUser(false);
                                        handleSubmit(details.username);
                                    } else if (details.role === "mentor") {
                                        setDetails({
                                            Name: "",
                                            username: "",
                                            password: "",
                                            branch: "",
                                            role: "",
                                            userDetails: {
                                                name: "",
                                                designation: '',
                                                department: "",
                                                mobile: "",
                                                email: "",
                                                id: ""
                                            }
                                        })
                                        setnewUser(false);
                                        handleSubmit(details.username);
                                    }
                                }
                            })
                    } else {
                        alert("Account already exits!")
                    }
                })

        }

    }, [details])

    useEffect(() => {
        axios.get("/auth/conversation/" + user.Id)
            .then(response => {
                if (response.data.length == 0) {
                    axios.post('/auth/conversation/' + user.Id + '/' + user.receiverId)
                        .then(response => {
                            if (response.data.success) {
                                console.log("conversation created!");
                                setDetails({
                                    Name: "",
                                    username: "",
                                    password: "",
                                    branch: "",
                                    role: "",
                                    userDetails: {
                                        name: "",
                                        designation: '',
                                        department: "",
                                        mobile: "",
                                        email: "",
                                        id: ""
                                    }
                                })
                                setUser({
                                    Id: "",
                                    receiverId: ""
                                });
                                setnewUser(false);
                            }
                        })
                }
            })
    }, [user])

    const handleSubmit = (username) => {
        axios.get('/auth/signin/' + username)
            .then(response => {
                const data = response.data[0]

                if (data.Role === "mentor" && details.password == response.data[0].Password) {
                    navigate('/mentor', { state: { data } });
                }
                else if (data.Role === "student" && details.password == response.data[0].Password) {
                    navigate('/student', { state: { data } });
                }
            })
    }

    const handleSignup = () => {
        axios.get("/data/" + details.branch + '/' + details.username)
            .then(response => {
                if (response.data.length != 0) {
                    const userDetails = {
                        name: response.data[0].Mentor,
                        designation: response.data[0].Designation,
                        department: response.data[0].MentorDept,
                        mobile: response.data[0].MentorMobile,
                        email: response.data[0].MentorEmailID,
                        id: response.data[0].EmpID
                    }
                    setDetails(prev => {
                        return ({
                            ...prev, userDetails: userDetails, Name: response.data[0].NAME, role: "student"
                        })
                    })
                } else {
                    axios.get("/data/mentor/" + details.branch + '/' + details.username)
                        .then(response => {
                            const userDetails = {
                                name: response.data[0].Mentor,
                                designation: response.data[0].Designation,
                                department: response.data[0].MentorDept,
                                mobile: response.data[0].MentorMobile,
                                email: response.data[0].MentorEmailID,
                                id: response.data[0].EmpID
                            }

                            setDetails(prev => {
                                return ({
                                })
                            })
                        })
                }

            })
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
            <div className="signin">
                <div className="flex-container">
                    <div className="card flex-item">
                        <div className="card-header">
                            <img src="Images/GITAM_logo.png" className="image" />
                        </div>
                        <div className="card-body">
                            <div className="row">

                                {
                                    newUser ?
                                        <React.Fragment>
                                            <div className="col-md-6 form-body">
                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Username</label>
                                                    <input type="email" onChange={handleChange}
                                                        class="form-control" id="exampleInputEmail1"
                                                        placeholder="Enter your ID"
                                                        name="username"
                                                        value={details.username} />
                                                </div>
                                                <div class="form-group">
                                                    <label for="exampleInputPassword1">Password</label>
                                                    <input type="password"
                                                        onChange={handleChange}
                                                        class="form-control"
                                                        id="exampleInputPassword1"
                                                        placeholder="Password"
                                                        name="password"
                                                        value={details.password}
                                                    />
                                                </div>
                                                <div className="inputField">
                                                    <label for="selectInput" className="form-label kanit">Select Your Branch</label>
                                                    <select class="form-select kanit" name="branch" value={details.branch} aria-label="Default select example" id="selectInput" onChange={handleChange}>
                                                        <option selected>-- select --</option>
                                                        <option value="Test">Test</option>
                                                        <option value="BioTech">BioTech</option>
                                                        <option value="B.Tech Civil">B.Tech Civil</option>
                                                        <option value="B.Tech CSE">B.Tech CSE</option>
                                                        <option value="B.Tech CSE Specliztion">B.Tech CSE Specliztion</option>
                                                        <option value="B.Tech EECE">B.Tech EECE</option>
                                                        <option value="B.Tech Mech">B.Tech Mech</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <button className="btn" onClick={handleSignup}>Signup</button>
                                                </div>
                                            </div>
                                        </React.Fragment> :
                                        <React.Fragment>
                                            <div className="col-md-6 form-body">
                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Username</label>
                                                    <input type="email" onChange={handleChange}
                                                        class="form-control" id="exampleInputEmail1"
                                                        placeholder="Enter Username"
                                                        name="username"
                                                        value={details.username} />
                                                </div>
                                                <div class="form-group">
                                                    <label for="exampleInputPassword1">Password</label>
                                                    <input type="password"
                                                        onChange={handleChange}
                                                        class="form-control"
                                                        id="exampleInputPassword1"
                                                        placeholder="Password"
                                                        name="password"
                                                        value={details.password}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <button className="btn" onClick={() => handleSubmit(details.username)}>Log In</button>
                                                </div>
                                            </div>
                                        </React.Fragment>

                                }
                                <div className="col-md-6">
                                    <div className="forget-password">
                                        <a href="#">Forgotten your username or password?
                                            <br />
                                            <strong>If you are unable to log into your Moodle account, please contact your department.</strong>
                                        </a>
                                        <br></br>
                                        <a href="#" className="create-account" onClick={() => { setnewUser(!newUser) }}>{newUser ? "Already have an account?" : "Don't have an account?"}</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default Signin;