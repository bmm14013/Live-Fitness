import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { useState } from 'react';
import Home from "./Pages/Home";
import Members from "./Pages/Members";
import Locations from "./Pages/Locations";
import Instructors from "./Pages/Instructors"
import Classes from "./Pages/Classes"
import EditClass from "./Pages/EditClass"


function App() {
  const [classToEdit, setClassToEdit] = useState([]);
  return (
    <Router>
      <nav>
      <Link to="/"> Home </Link>
      <Link to="/members"> Members </Link>
      <Link to="/classes"> Classes </Link>
      <Link to="/locations"> Locations </Link>
      <Link to="/instructors"> Instructors </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Members />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/instructors" element={<Instructors />} />
        <Route path="/classes" element={<Classes setClassToEdit={setClassToEdit} />} />
        <Route path="/edit-class" element={<EditClass classToEdit={classToEdit} />} />
      </Routes>
    </Router>
  );
}

export default App;
