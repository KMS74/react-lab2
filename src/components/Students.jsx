import React, { useState } from "react";

const Students = () => {
  const [students, setStudents] = useState([]);

  return (
    <div className="container">
      {/* Student Form */}
      <form className="w-75 mx-auto my-4 p-4">
        <div class="mb-3">
          <label htmlFor="name" class="form-label">
            Student Name
          </label>
          <input
            type="text"
            className="form-control border"
            id="name"
            placeholder="Enter student name"
          />
        </div>
        <div class="mb-3">
          <label htmlFor="age" class="form-label">
            Student Age
          </label>
          <input
            type="text"
            className="form-control border"
            id="age"
            placeholder="Enter student age"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Add Student
        </button>
      </form>
    </div>
  );
};

export default Students;
