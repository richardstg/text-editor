import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/authcontext";

const SignUp = (props) => {
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
        `${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
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
      <h3 className="mt-3 mb-3">Sign Up</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          className="form-control"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid email",
            },
          })}
          type="email"
          required
        />
        <p className="text-danger">{errors.email?.message}</p>
        <label>Password (at least 7 characters)</label>
        <input
          type="password"
          className="form-control"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 7,
              message: "Password need to have at least 7 characters",
            },
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

export default SignUp;
