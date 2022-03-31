import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
    return <div>
        <body>
            <h1> Welcome to <b>LIVE</b> Fitness</h1>
            <h2>Our members, available classes, class registration, instructors and locations are below.</h2>
            <p>Please navigate to the members tab in order to add a new member or view an existing member. Navigate to classes
                to view a list of all available classes or to update/delete current classes, navigate to locations to view
                create, update or delete all available locations, and navigate to instructors to view, update, or delete
                instructors. The registration tab will allow you to
                register members to an available class, view the date, time, and location of a class, the instructor teaching
                the course, and a list of all members attending
                the class </p>
            <ul>
                <button><Link to="/members"> MEMBERS </Link></button>
                <p>The members page will allow you to add, delete, or update members.</p>
                <button><Link to="/classes"> CLASSES </Link></button>
                <p>The classes page will allow you to add, delete, or update a class. 
                    You can also filter and serach by class name, date/time, instructor, and location.</p>
                <button><Link to="/instructors"> INSTRUCTORS </Link></button>
                <p>The instructors page will allow you to add, delete, or update an instructor. </p>
                <button><Link to="/locations"> LOCATIONS </Link></button>
                <p>The locations page will allow you to view all of our locations as well as add, update or delete a location</p>
                <button><Link to="/instructor_locations">INSTRUCTOR LOCATIONS</Link></button>
                <p>The instructor locations page will allow you to view instructor locations, and edit or delete the instructor locations</p>
                <button><Link to="/registration"> CLASS REGISTRATION </Link></button>
                <p>The class registration page will allow you to register for a class by class ID and members ID. In addition, 
                    page will allow you to delete or update a member that is already registered.
                </p>
            </ul>
        </body>
    </div>
}

export default Home;