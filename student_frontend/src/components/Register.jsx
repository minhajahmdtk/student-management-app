import * as Form from "@radix-ui/react-form";

import "../assets/style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInterceptor";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    regNo: "",
    candidateName: "",
    course: "",
    email: "",
    marks: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    axiosInstance
      .post("/students/add", form)
      .then((response) => {
        alert("Registration Successful");
        console.log("Registration Successful", response.data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="container">
      <Form.Root className="FormRoot" onSubmit={handleSubmit}>
        <Form.Field className="FormField" name="regNo">
          <Form.Label className="FormLabel">
            Register Number
          </Form.Label>

          <Form.Control asChild>
            <input
              className="Input"
              type="text"
              name="regNo"
              value={form.regNo}
              onChange={handleChange}
              placeholder="Enter register number"
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="candidateName">
          <Form.Label className="FormLabel">
            Candidate Name
          </Form.Label>

          <Form.Control asChild>
            <input
              className="Input"
              type="text"
              name="candidateName"
              value={form.candidateName}
              onChange={handleChange}
              placeholder="Enter candidate name"
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="course">
          <Form.Label className="FormLabel">
            Course
          </Form.Label>

          <Form.Control asChild>
            <input
              className="Input"
              type="text"
              name="course"
              value={form.course}
              onChange={handleChange}
              placeholder="Enter course"
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="email">
          <Form.Label className="FormLabel">
            Email
          </Form.Label>

          <Form.Control asChild>
            <input
              className="Input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="marks">
          <Form.Label className="FormLabel">
            Marks
          </Form.Label>

          <Form.Control asChild>
            <input
              className="Input"
              type="number"
              name="marks"
              value={form.marks}
              onChange={handleChange}
              placeholder="Enter marks"
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="password">
          <Form.Label className="FormLabel">
            Password
          </Form.Label>

          <Form.Control asChild>
            <input
              className="Input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild>
          <button className="Button">
            Register
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};

export default Register;