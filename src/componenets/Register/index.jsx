import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import axios from "axios";

import CountrySelector from "../CountrySelector";
import Input from "../Input";

import styles from "../styles.module.css";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
  });

  const [error, setError] = useState("");
  const [selecteCountry, setSelecteCountry] = useState(null);
  const [passwordError, setPasswordError] = useState(false);
  const [allowSiginUpTerms, setAllowSiginUpTerms] = useState(false);
  const [allowSiginUpprivacy, setAllowSiginUpPrivacy] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleCheck = ({ currentTarget: input }) => {
    input.value === ""
      ? setPasswordError(false)
      : input.value !== data.password
      ? setPasswordError(true)
      : setPasswordError(false);
  };

  const handleAllowSiginUpTerms = () => {
    setAllowSiginUpTerms(!allowSiginUpTerms);
  };

  const handleAllowSiginUpPrivacy = () => {
    setAllowSiginUpPrivacy(!allowSiginUpprivacy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3001/v1/register";
      data.country = selecteCountry.label;
      const { data: res } = await axios.post(url, data);
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
      <div className={styles.centered}>
          <Form onSubmit={handleSubmit}>
            {error && <div>{error}</div>}
            <h1>Sigin up</h1>

            <Input
              controlId="formBasicEmail"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
            />

            <Input
              controlId="formBasicPassword"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
            />

            <Input
              controlId="formBasicName"
              type="name"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={data.name}
            />

            {passwordError && <div>Confirm password is not matched</div>}
            <Input
              controlId="formBasicConfirmPassword"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleCheck}
              value={data.confirmPassword}
            />

            <Form.Group className="mb-3" controlId="formBasicCountrySelector">
              <CountrySelector setSelecteCountry={setSelecteCountry} />
            </Form.Group>

            <div>
              <div className="mb-3">
                <Form.Check
                  style={{ display: "inline", textDecoration: "none" }}
                  name="terms"
                  id="checkbox"
                  label="I agree to the terms and conditions "
                  onClick={handleAllowSiginUpTerms}
                />{" "}
                <a href="#" >
                  terms and conditions
                </a>
              </div>
              <div className="mb-3">
                <Form.Check
                  style={{ display: "inline" }}
                  name="privacy"
                  id="checkbox"
                  label="I agree to the privacy policy "
                  onClick={handleAllowSiginUpPrivacy}
                />{" "}
                <a href="#" >
                  privacy policy
                </a>
              </div>

              <Button
                className={styles.btn}
                variant="primary"
                disabled={
                  !allowSiginUpTerms || !allowSiginUpprivacy ? true : false
                }
              >
                Sigin up
              </Button>
            </div>
          </Form>
      </div>
  );
};

export default Register;
