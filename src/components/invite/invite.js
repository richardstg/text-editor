import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authcontext";
import { useForm } from "react-hook-form";

const Invite = (props) => {
  // const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const context = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const inviteHandler = async (formData) => {
    setError(null);
    setInviteSuccess(false);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/invite`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + context.token,
          },
          body: JSON.stringify({
            textId: props.textId,
            email: formData.email,
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      setInviteSuccess(true);
      reset({ email: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card p-4 bg-light mt-3">
      <h6>Invite a friend to edit the text</h6>
      <form onSubmit={handleSubmit(inviteHandler)}>
        {/* <label>Email</label> */}
        <input
          placeholder="Enter the email address..."
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
        <input type="submit" className="btn btn-secondary" value="Submit" />
      </form>
      {error && <p className="text-danger">{error}</p>}
      {inviteSuccess && <p className="text-success mt-2">Invite was sent!</p>}
    </div>
  );
};

export default Invite;
