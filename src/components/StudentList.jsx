import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../features/students/studentSlice";

const StudentList = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">Student View</h1>
        <Link className="btn btn-primary" to="/addStudent">
          Add Student
        </Link>
      </div>
      <h2 className="text-secondary mb-4">Student List</h2>
      <div className="row">
        {students.map((student) => (
          <div className="col-md-4 mb-4" key={student._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-capitalize">{student.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Grade: {student.grade}
                </h6>
                <p className="card-text">
                  <strong>Age:</strong> {student.age} <br />
                  <strong>Gender:</strong> {student.gender} <br />
                  <strong>Attendance:</strong> {student.attendance || "N/A"}{" "}
                  <br />
                  <strong>Marks:</strong> {student.marks || "N/A"}
                </p>
                <Link
                  to={`/studentDetails/${student._id}`}
                  className="btn btn-outline-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
