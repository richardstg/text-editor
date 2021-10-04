import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/authcontext";

const Login = (props) => {
  const [error, setError] = useState(null);
  const context = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      context.login(data.userId, data.token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <h3 className="mt-3 mb-3">Login</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
          required
        />
        <p className="text-danger">{errors.email?.message}</p>
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          {...register("password", {
            required: "Password is required",
            // minLength: {
            //   value: 7,
            //   message: "Password need to have at least 7 characters",
            // },
          })}
          required
        />
        <p className="text-danger">{errors.password?.message}</p>
        <input
          type="submit"
          className="btn btn-primary mt-1 mb-1"
          value="Submit"
        />
      </form>
      {error && <p className="text-danger mt-1 mb-1">{error}</p>}
    </>
  );
};

export default Login;
