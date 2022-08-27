import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import axios from "axios";

import CountrySelector from "../CountrySelector";
import Input from "../CustomInput";

import styles from "./styles.module.css";

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

  const handleNameChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handlePasswordChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleEmailChange = ({ currentTarget: input }) => {
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
      // eslint-disable-next-line
      const { data: res } = await axios.post(url, data);
      navigate("/login");
    } catch (error) {
      if (selecteCountry === null) {
        setError("Kindly Choose a Country");
      } else {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div className={styles.centered}>
      <Form onSubmit={handleSubmit}>
        {error && <div className={styles.errors}>{error}</div>}
        <h1 className={styles.title}>Sigin up</h1>
        <div>
          <Input
            controlId="formBasicEmail"
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleEmailChange}
            value={data.email}
          />
          <Input
            controlId="formBasicName"
            type="name"
            placeholder="Name"
            name="name"
            onChange={handleNameChange}
            value={data.name}
          />
          <Input
            controlId="formBasicPassword"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handlePasswordChange}
            value={data.password}
          />
        </div>
        <div>
          {passwordError && (
            <div className={styles.errors}>Confirm password is not matched</div>
          )}
          <Input
            controlId="formBasicConfirmPassword"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleCheck}
            value={data.confirmPassword}
          />
        </div>
        <div className={styles.countryselector}>
          <div className={styles.countryselector2}>
            <CountrySelector setSelecteCountry={setSelecteCountry} />
          </div>{" "}
        </div>
        <div>
          <div className={styles.footer}>
            <div>
              <Form.Check
                className={styles.formcheck}
                name="terms"
                id="termsCheckbox"
                label="I agree to the"
                onClick={handleAllowSiginUpTerms}
              />{" "}
              <a href="/register">terms and conditions</a>
              <Form.Check
                className={styles.formcheck}
                name="privacy"
                id="privacyCheckbox"
                label="I agree to the "
                onClick={handleAllowSiginUpPrivacy}
              />{" "}
              <a href="/register">privacy policy</a>
            </div>
            <Button
              className={styles.btn}
              variant="primary"
              disabled={
                !allowSiginUpTerms || !allowSiginUpprivacy ? true : false
              }
              type="submit"
            >
              Sigin up
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Register;
