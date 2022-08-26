import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { RiEarthFill } from "react-icons/ri";

import styles from "./styles.module.css";

function CountrySelector(props) {
  const [country, setCountry] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (country) => {
    setCountry(country);
    props.setSelecteCountry(country);
  };

  return (
    <div className={styles.countryselector}>
      <Select
        options={options}
        country={country}
        onChange={changeHandler}
        placeholder={<div> {<RiEarthFill />} Choose country</div>}
      />
    </div>
  );
}

export default CountrySelector;
