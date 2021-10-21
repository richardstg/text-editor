import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { AuthContext } from "../context/authcontext";

const Invite = (props) => {
  const [error, setError] = useState(null);
  const context = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const search = useLocation().search;
  const email = new URLSearchParams(search).get("email");

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
            email,
            password: formData.password,
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      context.login(data.userId, data.userEmail, data.token, null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="row">
      <div className="col-lg-4 offset-lg-4">
        <h3 className="mt-3 mb-3">Sign Up</h3>
        <p className="font-weight-bold">
          Create an account for:{" "}
          <span className="font-weight-bold">{email}</span>
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
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
      </div>
    </div>
  );
};

export default Invite;
