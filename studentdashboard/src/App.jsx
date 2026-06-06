import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './App.css';

// Child Component - Receives memoized delete function
const StudentList = React.memo(({ students, onDeleteStudent }) => {
  console.log("StudentList rendered"); // For debugging memoization
  
  return (
    <div className="student-list">
      <h3>Student List ({students.length})</h3>
      {students.length === 0 ? (
        <p className="empty-message">No students added yet.</p>
      ) : (
        <ul>
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
  // useState: Maintain list of student names
  const [students, setStudents] = useState([]);
  
  // useState: Track input field value
  const [studentName, setStudentName] = useState('');

  // useRef: Reference for input field
  const inputRef = useRef(null);

  // useEffect: Update browser tab title when student list changes
  useEffect(() => {
    const count = students.length;
    document.title = `Student Dashboard (${count} student${count !== 1 ? 's' : ''})`;
    
    // Cleanup function
    return () => {
      document.title = 'Student Management Dashboard';
    };
  }, [students]);

  // useEffect: Auto-focus input field when component loads
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // useMemo: Calculate total number of students
  const totalStudents = useMemo(() => {
    console.log("Calculating total students...");
    return students.length;
  }, [students]);

  // useMemo: Calculate total characters across all student names
  const totalCharacters = useMemo(() => {
    console.log("Calculating total characters...");
    return students.reduce((total, student) => total + student.length, 0);
  }, [students]);

  // useCallback: Memoized delete function
  const handleDeleteStudent = useCallback((indexToDelete) => {
    setStudents(prevStudents => 
      prevStudents.filter((_, index) => index !== indexToDelete)
    );
  }, []);

  // Function to add a new student
  const handleAddStudent = () => {
    const trimmedName = studentName.trim();
    
    if (trimmedName === "") {
      alert("Please enter a valid student name");
      return;
    }
    
    setStudents([...students, trimmedName]);
    setStudentName("");
    
    // Refocus on input after adding
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddStudent();
    }
  };

  // Function to focus input field (for the focus button)
  const focusInputField = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="dashboard">
      <h1>📚 Student Management Dashboard</h1>
      
      {/* Statistics Section */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">👨‍🎓</div>
          <div className="stat-info">
            <h3>Total Students</h3>
            <p className="stat-value">{totalStudents}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-info">
            <h3>Total Characters</h3>
            <p className="stat-value">{totalCharacters}</p>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="input-section">
        <input
          ref={inputRef}
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter student name..."
          className="student-input"
        />
        <button onClick={handleAddStudent} className="btn btn-add">
          ➕ Add Student
        </button>
        <button onClick={focusInputField} className="btn btn-focus">
          🎯 Focus Input
        </button>
      </div>

      {/* Student List - Child Component */}
      <StudentList 
        students={students} 
        onDeleteStudent={handleDeleteStudent}
      />
    </div>
  );
};

export default StudentManagementDashboard;
