import { useDispatch, useSelector } from "react-redux";
import {
  setSchoolStats,
  setTopStudent,
} from "../features/students/studentSlice";
import { useEffect } from "react";

const SchoolView = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);

  useEffect(() => {
    if (students.length > 0) {
      const totalStudents = students.length;
      const averageAttendance =
        students.reduce((acc, curr) => acc + curr.attendance, 0) /
        totalStudents;

      const averageMarks =
        students.reduce((acc, curr) => acc + curr.marks, 0) / totalStudents;

      const topStudent = students.reduce(
        (top, student) => (student.marks > top.marks ? student : top),
        students[0]
      );

      dispatch(
        setSchoolStats({
          totalStudents,
          averageAttendance: averageAttendance.toFixed(2),
          averageMarks: averageMarks.toFixed(2),
        })
      );
      dispatch(setTopStudent(topStudent.name));
    }
  }, [students, dispatch]);

  const { totalStudents, averageAttendance, averageMarks } = useSelector(
    (state) => state.students.schoolStats
  );
  const topStudent = useSelector(
    (state) => state.students.schoolStats.topStudent
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">School Overview</h1>
      <div className="row text-center">
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card shadow-sm border-primary">
            <div className="card-body">
              <h5 className="card-title text-primary">Total Students</h5>
              <p className="card-text display-4">{totalStudents}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card shadow-sm border-success">
            <div className="card-body">
              <h5 className="card-title text-success">Average Attendance</h5>
              <p className="card-text display-4">{averageAttendance}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card shadow-sm border-warning">
            <div className="card-body">
              <h5 className="card-title text-warning">Average Marks</h5>
              <p className="card-text display-4">{averageMarks}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mb-4">
          <div
            className="card shadow-sm border-info"
            style={{ height: "100%" }}
          >
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title text-info">Top Student</h5>
              <p
                className="card-text display-4"
                style={{
                  fontSize: "1.5rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {topStudent || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolView;
