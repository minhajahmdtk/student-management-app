import * as Form from "@radix-ui/react-form";
import { Link, useNavigate } from "react-router-dom";
import "../assets/style.css";
import { useState } from "react";
import axiosInstance from "../../axiosInterceptor";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post("/api/students/login", form)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("loginToken", response.data.token);
        }

        localStorage.setItem("isLoggedIn", "true");

        alert("Login Successful");

        console.log(response.data);

        navigate("/studentlist");
      })
      .catch((error) => {
        alert("Invalid Email or Password");
        console.error(error);
      });
  };

  return (
    <div className="container">
      <Form.Root className="FormRoot" onSubmit={handleSubmit}>
        <h2>Login</h2>

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
              placeholder="Enter your password"
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild>
          <button className="Button">
            Login
          </button>
        </Form.Submit>

        <p className="RegisterLink">
          New user?{" "}
          <Link to="/register">
            Register here
          </Link>
        </p>
      </Form.Root>
    </div>
  );
};

export default Login;