  import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './App.css';

// Child Component - Receives memoized delete function
const StudentList = React.memo(({ students, onDeleteStudent }) => {
  console.log("StudentList rendered");
  
  return (
    <div className="student-list">
      <h3>Student List ({students.length})</h3>
      {students.length === 0 ? (
        <p className="empty-message">No students added yet.</p>
      ) : (
        <ul className="list-unstyled">
          {students.map((student, index) => (
            <li key={index}>
              <span>{student}</span>
              <button
                onClick={() => onDeleteStudent(index)}
                className="delete-btn"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

const StudentManagementDashboard = () => {
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const count = students.length;
    document.title = `Student Dashboard (${count} student${count !== 1 ? 's' : ''})`;
    return () => {
      document.title = 'Student Management Dashboard';
    };
  }, [students]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const totalStudents = useMemo(() => {
    console.log("Calculating total students...");
    return students.length;
  }, [students]);

  const totalCharacters = useMemo(() => {
    console.log("Calculating total characters...");
    return students.reduce((total, student) => total + student.length, 0);
  }, [students]);

  const handleDeleteStudent = useCallback((indexToDelete) => {
    setStudents(prevStudents =>
      prevStudents.filter((_, index) => index !== indexToDelete)
    );
  }, []);

  const handleAddStudent = () => {
    const trimmedName = studentName.trim();
    if (trimmedName === "") {
      alert("Please enter a valid student name");
      return;
    }
    setStudents([...students, trimmedName]);
    setStudentName("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddStudent();
    }
  };

  const focusInputField = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="container py-4">
      <div className="dashboard">
        <h1>📚 Student Management Dashboard</h1>
        
        {/* Statistics Section - Bootstrap row/col added */}
        <div className="stats-container row g-3 mb-4">
          <div className="col-md-6">
            <div className="stat-card">
              <div className="stat-icon">👨‍🎓</div>
              <div className="stat-info">
                <h3>Total Students</h3>
                <p className="stat-value">{totalStudents}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-info">
                <h3>Total Characters</h3>
                <p className="stat-value">{totalCharacters}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Input Section - Bootstrap grid added */}
        <div className="input-section row g-2 mb-4">
          <div className="col-md-7">
            <input
              ref={inputRef}
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter student name..."
              className="student-input w-100"
            />
          </div>
          <div className="col-md-3">
            <button onClick={handleAddStudent} className="btn btn-add w-100">
              ➕ Add Student
            </button>
          </div>
          <div className="col-md-2">
            <button onClick={focusInputField} className="btn btn-focus w-100">
              🎯 Focus Input
            </button>
          </div>
        </div>
        
        {/* Student List - Child Component */}
        <StudentList
          students={students}
          onDeleteStudent={handleDeleteStudent}
        />
      </div>
    </div>
  );
};

export default StudentManagementDashboard;