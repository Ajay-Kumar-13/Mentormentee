import React, {useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './cases.css';
import Newcase from "./Newcase";

function Cases() {
    const {state} = useLocation();
    const [cases, setCases] = useState();
    
    useEffect(() => {
        setCases(state.cases);
    }, [state])


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
                    {
                        cases && cases[0].map((object, index) => 
                            <Newcase 
                                key={index}
                                sno = {index}
                                title = {object.title}
                                createdAt={object.createdAt}
                                time="4:30PM"
                                description={object.description}
                            />
                        )
                    }

                </div>
            </div>

        </React.Fragment>
    )
}

export default Cases;