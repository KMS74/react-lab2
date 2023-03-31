import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// TODO: Refactore the code into Components

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filterdStudents, setFilterdStudents] = useState([]);
  const [filterKey, setFilterKey] = useState("");
  const [showFilterd, setShowFilterd] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3, "Minmum characters is 3").required("Required"),
      age: Yup.number().min(18, "Age must be above 18").required("Required"),
    }),
    onSubmit: (values) => {
      students.push(values);
      formik.resetForm();
      setShowFilterd(false);
    },
  });

  useEffect(() => {
    console.log("Filter Key", filterKey);
    const filterdData = performFiliter(filterKey);
    setFilterdStudents(filterdData);
  }, [filterKey]);

  const performFiliter = (key) => {
    setFilterKey(key.trim().toLocaleLowerCase());
    // filter by name or age
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(key) ||
        student.age.toString().includes(key)
    );
  };

  const handleFilterChange = (e) => {
    setFilterKey(e.target.value);
    setShowFilterd(true);
  };

  return (
    <div className="container">
      {/* Student Form */}
      <div className="row">
        <h2 className="text-center display-4 my-3"> Student List</h2>
        <form onSubmit={formik.handleSubmit} className="w-75 mx-auto my-4 p-4">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Student Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter student name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="text-danger">{formik.errors.name}</p>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Student Age
            </label>
            <input
              type="text"
              className="form-control"
              id="age"
              placeholder="Enter student age"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.age}
            />
            {formik.touched.age && formik.errors.age ? (
              <p className="text-danger">{formik.errors.age}</p>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary">
            Add Student
          </button>
        </form>
      </div>

      {students.length > 1 && (
        <div className="row">
          {/* Filter Box */}
          <label htmlFor="filter" className="form-label">
            Filter By
          </label>
          <input
            type="text"
            className="form-control w-50"
            id="filter"
            value={filterKey}
            placeholder="Search for students"
            onChange={(e) => handleFilterChange(e)}
          />
        </div>
      )}
      {students.length > 0 && (
        <div className="row">
          {/* Student Table */}
          <table className="table my-4">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
              </tr>
            </thead>
            <tbody>
              {showFilterd ? (
                filterdStudents.length > 0 ? (
                  filterdStudents.map((student, i) => (
                    <tr key={student.name}>
                      <td>{i + 1}</td>
                      <td>{student.name}</td>
                      <td>{student.age}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="lead text-danger">
                      Not fount any student matched with {filterKey}
                    </td>
                  </tr>
                )
              ) : (
                students.map((student, i) => (
                  <tr key={student.name}>
                    <td>{i + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Students;
