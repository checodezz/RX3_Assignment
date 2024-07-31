import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudentAsync } from "../features/students/studentSlice";
const StudentDetails = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const status = useSelector((state) => state.students.status);
  const { studentId } = useParams();
  const selectedStudent = students.find((student) => student._id === studentId);

  const handleDeleteBtn = () => {
    dispatch(deleteStudentAsync(studentId));
  };

  if (status === "loading") return <p className="text-center">Loading...</p>;
  if (status === "error")
    return <p className="text-center text-danger">Error loading students...</p>;
  if (!selectedStudent)
    return (
      <div className="container text-center p-5">
        <div className="alert alert-success" role="alert">
          Student Deleted Successfully
        </div>
        <Link className="btn btn-primary mt-3" to="/">
          Go to Homepage
        </Link>
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-light">
            <div className="card-body">
              <h1 className="card-title text-primary mb-3">
                {selectedStudent.name}
              </h1>
              <h5 className="card-subtitle mb-3 text-muted">
                Grade: {selectedStudent.grade}
              </h5>
              <p className="card-text">
                <strong>Age:</strong> {selectedStudent.age} <br />
                <strong>Gender:</strong> {selectedStudent.gender} <br />
                <strong>Attendance:</strong>{" "}
                {selectedStudent.attendance || "N/A"} <br />
                <strong>Marks:</strong> {selectedStudent.marks || "N/A"}
              </p>
              <div className="d-flex justify-content-between mt-4">
                <Link
                  className="btn btn-outline-primary"
                  to={{
                    pathname: `/addStudent`,
                  }}
                  state={selectedStudent}
                >
                  Edit Details
                </Link>
                <button className="btn btn-danger" onClick={handleDeleteBtn}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
