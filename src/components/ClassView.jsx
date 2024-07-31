import { useSelector, useDispatch } from "react-redux";
import { setFilter, setSortBy } from "../features/students/studentSlice";

const ClassView = () => {
  const dispatch = useDispatch();

  const { students, filter, sortBy } = useSelector((state) => state.students);

  const filteredStudents = students.filter((student) => {
    if (filter === "all") return true;
    if (filter === "male") return student.gender === "male";
    if (filter === "female") return student.gender === "female";
  });

  const sortedStudents = filteredStudents.sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "marks") {
      return b.marks - a.marks;
    } else if (sortBy === "attendance") {
      return b.attendance - a.attendance;
    }
  });

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Class View</h1>

      <div className="row mb-4">
        <div className="col-md-6">
          <label htmlFor="filter" className="form-label">
            Filter by Gender:
          </label>
          <select
            id="filter"
            className="form-select"
            onChange={(e) => dispatch(setFilter(e.target.value))}
            value={filter}
          >
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="sort" className="form-label">
            Sort by:
          </label>
          <select
            id="sort"
            className="form-select"
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            value={sortBy}
          >
            <option value="name">Name</option>
            <option value="marks">Marks</option>
            <option value="attendance">Attendance</option>
          </select>
        </div>
      </div>

      <ul className="list-group">
        {sortedStudents.map((student) => (
          <li
            key={student._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              <strong>{student.name}</strong> - Marks: {student.marks} -
              Attendance: {student.attendance}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassView;
