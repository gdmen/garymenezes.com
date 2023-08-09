/**
 * Write-only the password as cookie
 */

import React, { useState } from 'react';
import { setSessionPassword } from '@mkitio/gatsby-theme-password-protect/src/utils/utils';
import Layout from "../../../components/layout"

import styles from "./PasswordProtect.module.css"


const CustomPasswordProtect = () => {
  const [password, setPassword] = useState("");

  const onSubmit = event => {
    event.preventDefault();
    setSessionPassword(password);
    window.location.reload(); // eslint-disable-line
  };

  return (
    <Layout>
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          placeholder="password"
          name="password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <button type="submit">
          Enter
        </button>
      </form>
    </Layout>
  );
};

export default CustomPasswordProtect;
