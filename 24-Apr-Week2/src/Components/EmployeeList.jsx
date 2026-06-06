export default function EmployeeList({ employees, actions }) {
  return (
    <>
      <input
        type="text"
        placeholder="Search Employee..."
        onChange={(e) => actions.searchEmployee(e.target.value)}
        className="search-box"
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Score</th>
            <th>Attendance</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="5">No Employees Found</td>
            </tr>
          ) : (
            employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.score}</td>

                <td>
                  <button onClick={() => actions.toggleAttendance(emp.id)}>
                    {emp.present ? "Present" : "Absent"}
                  </button>
                </td>

                <td>
                  <button onClick={() => actions.editEmployee(emp.id)}>
                    Edit Name
                  </button>
                  <button onClick={() => actions.updateScore(emp.id)}>
                    Edit Score
                  </button>
                  <button onClick={() => actions.deleteEmployee(emp.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}