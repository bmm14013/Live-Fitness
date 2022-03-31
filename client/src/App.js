import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from "./Pages/Home";
import Members from "./Pages/Members";
import Locations from "./Pages/Locations";
import Instructors from "./Pages/Instructors"
import Classes from "./Pages/Classes"
import MembersClasses from "./Pages/MembersClasses"
import InstructorLocation from "./Pages/InstructorLocation"


function App() {
  return (
    <Router>
      <nav>
      <Link to="/"> Home </Link>
      <Link to="/members"> Members </Link>
      <Link to="/classes"> Classes </Link>
      <Link to="/members_classes"> Class Registration </Link>
      <Link to="/locations"> Locations </Link>
      <Link to="/instructors"> Instructors </Link>
      <Link to="/instructor_location">Instructor Locations</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Members />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/instructors" element={<Instructors />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/members_classes" element={<MembersClasses />} />
        <Route path="/instructor_location" element={<InstructorLocation />} />
      </Routes>
    </Router>
  );
}

export default App;
