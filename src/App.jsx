import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Header from "./components/Header";
import AddStudent from "./components/AddStudent";
import StudentList from "./components/StudentList";
import StudentDetails from "./components/StudentDetails";
import ClassView from "./components/ClassView";
import SchoolView from "./components/SchoolView";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/addStudent" element={<AddStudent />} />
          <Route
            path="/studentDetails/:studentId"
            element={<StudentDetails />}
          />
          <Route path="/classView" element={<ClassView />} />
          <Route path="/schoolView" element={<SchoolView />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
