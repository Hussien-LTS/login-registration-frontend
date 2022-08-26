import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import axios from "axios";

import Input from "../Input";

import styles from "../styles.module.css";

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
      navigate("/User");
      console.log(res);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className={styles.centered}>
      <Form onSubmit={handleSubmit}>
        <div> {error && <div>{error}</div>}</div>
        <h1>Log in</h1>
        <Input
          controlId="formBasicEmail"
          type="email"
          placeholder="Your Email"
          name="email"
          onChange={handleChange}
          value={data.email}
        />

        <Input
          controlId="formBasicPassword"
          type="password"
          placeholder="Your Password"
          name="password"
          onChange={handleChange}
          value={data.password}
        />
        <Form.Text>
          
          <a href="/">Forget Password?</a>
        </Form.Text>
        <Button className={styles.btn} variant="primary">
          Sigin in
        </Button>
        <div>
          <p className={styles.text}>Don't have an account? </p>
          <Link  to="/">
            <span type="button">Sigin up</span>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
