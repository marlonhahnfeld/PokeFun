import React from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../server/authutil";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../styles/RegisterForm.css";
import { useNavigate, Link } from "react-router-dom";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {},
  });
  const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await registerUser(data.username, data.password);
      if (response.result === "success") {
        console.log("Registered successfully");
        navigate("/");
      }

      if (response.result === "error") {
        setError("username", {
          type: "manual",
          message: response.details,
        });
      }
    } catch (e) {
      console.error(e.message);
      setError("username", {
        type: "manual",
        message: "An error occurred while registering.",
      });
      setError("register", {
        type: "manual",
        message: e.message,
      });
    }
  };

  return (
    <div className="registerform-container">
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("username", {
            required: "Username is required",
            pattern: {
              value: /^.{4,}$/,
              message: "Invalid username",
            },
          })}
          type="text"
          label="Username"
          variant="outlined"
          size="medium"
          margin="normal"
        />
        <TextField
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          type="password"
          label="Password"
          variant="outlined"
          size="medium"
          margin="normal"
        />
        <TextField
          {...register("confirmPassword", {
            required: "Please confirm password",
            validate: (value) =>
              value === password || "The passwords do not match",
          })}
          type="password"
          label="Confirm Password"
          variant="outlined"
          size="medium"
          margin="normal"
        />
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          margin="normal"
        >
          {isSubmitting ? "Loading..." : "Register"}
        </Button>
      </form>
      <div className="errors">
        {errors.username && <div>{errors.username.message}</div>}
        {errors.password && <div>{errors.password.message}</div>}
        {errors.confirmPassword && <div>{errors.confirmPassword.message}</div>}
      </div>
      <Link to="/login">Already an account? Click here</Link>
    </div>
  );
};

export default RegisterForm;
