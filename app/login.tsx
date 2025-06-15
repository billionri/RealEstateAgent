// components/LoginForm.tsx

import React from 'react';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        {/* Decorative graphics could go here, using CSS for layout */}
      </div>

      <div className={styles.rightPane}>
        <h1 className={styles.title}>
          Welcome to<br />
          <span className={styles.highlight}>Real Estate Agent: Shop1</span>
        </h1>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="userId">User ID</label>
            <input type="email" id="userId" placeholder="example@gmail.com" />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="***********" />
          </div>

          <div className={styles.actions}>
            <label className={styles.checkbox}>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
          </div>

          <button type="submit" className={styles.loginButton}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
