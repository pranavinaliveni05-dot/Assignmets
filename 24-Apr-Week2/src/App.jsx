 import { useState } from "react";
import EmployeeList from "./components/EmployeeList.jsx";

export default function App() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "John", score: 70, present: true },
    { id: 2, name: "Sara", score: 85, present: false }
  ]);

  const [allEmployees, setAllEmployees] = useState([
    { id: 1, name: "John", score: 70, present: true },
    { id: 2, name: "Sara", score: 85, present: false }
  ]);

  // ➕ Add Employee
  const addEmployee = () => {
    const name = prompt("Enter Name:");
    if (!name) return;

    const newEmp = {
      id: employees.length + 1,
      name,
      score: 50,
      present: true
    };

    const updated = [...employees, newEmp];
    setEmployees(updated);
    setAllEmployees(updated);
  };

  // ✏ Update Score
  const updateScore = (id) => {
    const score = prompt("Enter New Score:");
    if (score === null) return;

    const updated = employees.map(emp =>
      emp.id === id ? { ...emp, score: Number(score) } : emp
    );

    setEmployees(updated);
    setAllEmployees(updated);
  };

  // ✏ Edit Name
  const editEmployee = (id) => {
    const name = prompt("Enter new name:");

    const updated = employees.map(emp =>
      emp.id === id ? { ...emp, name: name || emp.name } : emp
    );

    setEmployees(updated);
    setAllEmployees(updated);
  };

  // 📌 Attendance
  const toggleAttendance = (id) => {
    const updated = employees.map(emp =>
      emp.id === id ? { ...emp, present: !emp.present } : emp
    );

    setEmployees(updated);
    setAllEmployees(updated);
  };

  // 🔍 Search
  const searchEmployee = (query) => {
    const q = query.toLowerCase();

    if (q === "") {
      setEmployees(allEmployees);
      return;
    }

    const filtered = allEmployees.filter(emp =>
      emp.name.toLowerCase().includes(q)
    );

    setEmployees(filtered);
  };

  // ❌ Delete
  const deleteEmployee = (id) => {
    const updated = employees.filter(emp => emp.id !== id);
    setEmployees(updated);
    setAllEmployees(updated);
  };

  // 📄 Download PDF
  const downloadPDF = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Employee Report", 14, 10);

    const tableData = employees.map(emp => [
      emp.id,
      emp.name,
      emp.score,
      emp.present ? "Present" : "Absent"
    ]);

    doc.autoTable({
      head: [["ID", "Name", "Score", "Attendance"]],
      body: tableData
    });

    doc.save("employees.pdf");
  };

  const actions = {
    updateScore,
    editEmployee,
    toggleAttendance,
    deleteEmployee,
    searchEmployee
  };

  return (
    <div className="container">
      <h1 className="title">Employee Performance Dashboard</h1>

      <div className="btn-group">
        <button onClick={addEmployee}>Add Employee</button>
        <button onClick={() => {
          const id = Number(prompt("Enter Employee ID:"));
          if (id) updateScore(id);
        }}>
          Update Score
        </button>
        <button onClick={downloadPDF}>Download PDF</button>
      </div>

      <EmployeeList employees={employees} actions={actions} />
    </div>
  );
}