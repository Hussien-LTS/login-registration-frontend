import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import axios from "axios";

import Input from "../CustomInput";

import styles from "./styles.module.css";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3001/v1/Login";
      const { data: res } = await axios.post(url, data);
      console.log(res);
      localStorage.setItem("token", res.data);
      navigate("/user");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className={styles.centered}>
      <Form onSubmit={handleSubmit}>
        {error && <div className={styles.errors}>{error}</div>}
        <h1 className={styles.title}>Log in</h1>

        <Input
          className={styles.input}
          controlId="formBasicEmail"
          type="email"
          placeholder="Your Email"
          name="email"
          onChange={handleChange}
          value={data.email}
        />

        <Input
          className={styles.input}
          controlId="formBasicPassword"
          type="password"
          placeholder="Your Password"
          name="password"
          onChange={handleChange}
          value={data.password}
        />
        <div className={styles.forget_password}>
          <p>
            <a href="/">Forget Password?</a>
          </p>
        </div>
        <Button className={styles.btn} variant="primary" type="submit">
          Sigin in
        </Button>
        <div className={styles.footer}>
          <p>
            Don't have an account? <a href="/"> Sigin up</a>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Login;
