import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { login } from "../../State/Auth/Action"; // Import your login action

function LoginForm({ switchToRegister, handleClose }) {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    // Dispatch login action here
    // Optionally await response if login returns a promise
    await dispatch(login(userData));

    // After login success, close modal
    handleClose();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            style={{ marginTop: "1rem" }}
          />
        </div>
        <div>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            autoComplete="current-password"
            style={{ marginTop: "1rem" }}
          />
        </div>
        <div>
          <Button
            className="w-full"
            variant="contained"
            type="submit"
            size="large"
            sx={{ padding: ".8rem 0", marginTop: "1rem", bgcolor: "#4F39F6" }}
          >
            Login
          </Button>
        </div>
      </form>

      <div className="flex justify-center">
        <div className="py-3 flex items-center">
          <p>If you don't have an account?</p>
          <Button onClick={switchToRegister} className="ml-5">
            Register
          </Button>
        </div>
      </div>
    </>
  );
}

export default LoginForm;