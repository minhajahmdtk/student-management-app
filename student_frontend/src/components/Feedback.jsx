import * as Form from "@radix-ui/react-form";
import "../assets/style.css";
import { useState } from "react";
import axiosInstance from "../../axiosInterceptor";



const Feedback = () => {
  
  const [form, setForm] = useState({
    email: "",
    course: "",
    feedback: ""
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
      .post("http://localhost:3000/feedbacks/add", form)
      .then((response) => {
        alert("Feedback submitted Successfully");
        console.log("Feedback Successful", response.data);
        
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }


  return (
    <div className="container">
      <Form.Root
        className="FormRoot"
        onSubmit={handleSubmit}
      >
        <h2>Feedback</h2>

        {/* Email */}
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

        {/* Course */}
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
              placeholder="Enter your course"
              required
            />
          </Form.Control>
        </Form.Field>

        {/* Feedback */}
        <Form.Field className="FormField" name="feedback">
          <Form.Label className="FormLabel">
            Feedback
          </Form.Label>
          <Form.Control asChild>
            <textarea
              className="Input"
              name="feedback"
              value={form.feedback}
              onChange={handleChange}
              placeholder="Write your feedback"
              rows="5"
              required
              style={{
                height: "120px",
                paddingTop: "12px",
                resize: "none"
              }}
            />

          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button className="Button">
            Submit Feedback
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};

export default Feedback;