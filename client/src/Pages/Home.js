import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
    return <div>
        <body>
            <h1> Welcome to <b>LIVE</b> Fitness</h1>
            <h2>The LIVE fitness mission is to support our clients everyday through actionable fitness
                strategies that instill all around health and wellness, whether clients are at our gyms
                participating in one of our fitness classes or at home living a healthy life style. We are
                here for them!!!
            </h2>
            <p> Our members, available classes, registration, instructors and locations are below:</p>
            <table>
                <thead>
                    <th><button><Link to="/members"> MEMBERS </Link></button></th>
                    <th><button><Link to="/classes"> CLASSES </Link></button></th>
                    <th><button><Link to="/instructors"> INSTRUCTORS </Link></button></th>
                    <th><button><Link to="/locations"> LOCATIONS </Link></button></th>
                    <th><button><Link to="/instructor_locations">INSTRUCTOR LOCATIONS</Link></button></th>
                    <th><button><Link to="/registration"> CLASS REGISTRATION </Link></button></th>
                </thead>
                <tbody>
                    <td>Visit the Members page to view all members, search for a member by first and last name or
                        search by ID
                    </td>
                    <td>Visit the Classes page to view all classes, or search for a class by ID, class name, or location.</td>
                    <td>Visit the Instructors page to view all instructors, add, delete, or update a current instructor.</td>
                    <td>Visit the Locations page to view all of our current location, add, delete, or update a location.</td>
                    <td>Visit the Instructor Locations page to view all instructor locations, and add or delete an instructor location.</td>
                    <td>Visit the Class Registration page to register a member to a class or delete a member from registration</td>
                </tbody>
            </table>
        </body>
    </div>
}

export default Home;