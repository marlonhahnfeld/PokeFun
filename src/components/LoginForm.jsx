import React from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../server/authutil";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LoginForm.css";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {},
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await loginUser(data.username, data.password);
      if (response.result === "success") {
        console.log("Logged in successfully");
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
        message: "An error occurred while logging in.",
      });
    }
  };

  return (
    <div className="loginform-container">
      <Grow in={true} timeout={1000} className="login-title">
        <Typography variant="h2" title="">
          Login
        </Typography>
      </Grow>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("username", { required: "Username is required" })}
          type="text"
          label="Username"
          variant="outlined"
          size="medium"
          margin="normal"
          color="primary"
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
        />
        <TextField
          {...register("password", { required: "Password is required" })}
          type="password"
          label="Password"
          variant="outlined"
          size="medium"
          margin="normal"
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
        />
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          margin="normal"
        >
          {isSubmitting ? "Loading..." : "Login"}
        </Button>
      </form>
      <div className="errors">
        {errors.username && <div>{errors.username.message}</div>}
        {errors.password && <div>{errors.password.message}</div>}
      </div>
      <Link to="/register">Don't have an account? Click here</Link>
    </div>
  );
};

export default LoginForm;
