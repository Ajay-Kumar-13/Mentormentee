import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './cases.css';
import Mnewcase from "./Mnewcase";
import axios from "axios";

function Mentorcases() {
    const { state } = useLocation();
    const [cases, setCases] = useState();

    useEffect(() => {
        axios.get("/data/cases/" + state)
            .then(response => {
                setCases([response.data]);
            })
    }, [])



    return (
        <React.Fragment>
            <div className="contact">
                <div className="flex-box">
                    <div className="flex-item">
                        <span><i class="fas fa-phone"></i> Call us : 0891-2840555 / 0891-2866444  <i class="fas fa-envelope"></i> E-mail : moodle_support@gitam.edu</span>
                    </div>
                </div>
            </div>
            <div className="casesNewPage">
                <div className="firstbar">
                    <p>Recently created cases</p>
                </div>

                {
                    cases && cases[0]?.length === 0 && <div className="nocases">No cases created</div>
                }

                <div className="secondDiv">
                    <div class="alert alert-success" role="alert">
                        Case Deleted succesfully!
                    </div>
                    {
                        cases && cases[0].map((object, index) =>
                            <Mnewcase
                                key={index}
                                sno={index}
                                title={object.title}
                                createdAt={object.createdAt}
                                time="4:30PM"
                                description={object.description}
                                regno={state}
                            />
                        )
                    }

                </div>
            </div>

        </React.Fragment>
    )
}

export default Mentorcases;