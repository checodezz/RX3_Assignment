import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import {
  addStudentsAsync,
  updateStudentAsync,
} from "../features/students/studentSlice";

const AddStudent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const student = location.state || {};
  const status = useSelector((state) => state.students.status);

  const [name, setName] = useState(student.name || "");
  const [age, setAge] = useState(student.age || "");
  const [grade, setGrade] = useState(student.grade || "");
  const [gender, setGender] = useState(student.gender || "");
  const [attendance, setAttendance] = useState(student.attendance || "");
  const [marks, setMarks] = useState(student.marks || "");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (student._id) {
      const updatedStudent = {
        name,
        age,
        grade,
        gender,
        marks,
        attendance,
      };
      dispatch(updateStudentAsync({ studentId: student._id, updatedStudent }));
      setMessage("Student Updated Successfully");
    } else {
      if (name && grade && age && gender) {
        const newStudent = {
          name,
          age,
          grade,
          gender,
        };
        dispatch(addStudentsAsync(newStudent));
        setMessage("Student Added Successfully");
      }
    }

    setIsSubmitted(true);
  };

  useEffect(() => {
    if (status === "succeeded") {
      setIsSubmitted(true);
    }
  }, [status]);

  if (isSubmitted) {
    return (
      <div className="container text-center p-5">
        <div className="alert alert-success" role="alert">
          {message}
        </div>
        <Link className="btn btn-primary mt-3" to="/">
          Go to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-light">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">
                {student._id ? "Update Student" : "Add Student"}
              </h1>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    required
                    min={5}
                    max={100}
                    className="form-control"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Gender: </label>
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                      className="form-check-input me-2"
                    />
                    <label className="form-check-label me-3">Male</label>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                      className="form-check-input me-2"
                    />
                    <label className="form-check-label">Female</label>
                  </div>
                </div>
                {student._id && (
                  <>
                    <div className="mb-3">
                      <input
                        type="number"
                        min={10}
                        max={100}
                        className="form-control"
                        value={attendance}
                        onChange={(e) => setAttendance(e.target.value)}
                        placeholder="Attendance"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="number"
                        min={1}
                        max={100}
                        className="form-control"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                        placeholder="Marks"
                      />
                    </div>
                  </>
                )}
                <button type="submit" className="btn btn-primary w-100">
                  {student._id ? "Update" : "Add"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
