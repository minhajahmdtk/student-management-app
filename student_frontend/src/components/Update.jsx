import * as Form from "@radix-ui/react-form";
import "../assets/style.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInterceptor";

const Update = () => {
  const { id } = useParams();

  const [form, setForm] = useState({
    regNo: "",
    candidateName: "",
    course: "",
    email: "",
    marks: "",
    password: "",
  });

  useEffect(() => {
    axiosInstance
      .get(`/students/${id}`)
      .then((response) => {
        console.log(response.data);
        setForm(response.data.student);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  function handleUpdate(e) {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    axiosInstance
      .put(`/students/${id}`, form)
      .then((response) => {
        alert("Student updated successfully");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <Form.Root
        className="FormRoot"
        onSubmit={handleSubmit}
      >
        <Form.Field
          className="FormField"
          name="regNo"
        >
          <Form.Label className="FormLabel">
            Register Number
          </Form.Label>

          <Form.Control asChild>
            <input
              className="Input"
              type="text"
              name="regNo"
              value={form.regNo}
              onChange={handleUpdate}
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Field
          className="FormField"
          name="candidateName"
        >
          <Form.Label className="FormLabel">
            Candidate Name
          </Form.Label>

          <Form.Control asChild>
            <input
              className="Input"
              type="text"
              name="candidateName"
              value={form.candidateName}
              onChange={handleUpdate}
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Field
          className="FormField"
          name="course"
        >
          <Form.Label className="FormLabel">
            Course
          </Form.Label>

          <Form.Control asChild>
            <input
              className="Input"
              type="text"
              name="course"
              value={form.course}
              onChange={handleUpdate}
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Field
          className="FormField"
          name="email"
        >
          <Form.Label className="FormLabel">
            Email
          </Form.Label>

          <Form.Control asChild>
            <input
              className="Input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleUpdate}
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Field
          className="FormField"
          name="marks"
        >
          <Form.Label className="FormLabel">
            Marks
          </Form.Label>

          <Form.Control asChild>
            <input
              className="Input"
              type="number"
              name="marks"
              value={form.marks}
              onChange={handleUpdate}
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild>
          <button className="Button">
            Update
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};

export default Update;