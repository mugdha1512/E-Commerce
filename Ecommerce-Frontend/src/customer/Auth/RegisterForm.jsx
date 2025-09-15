import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { register, getUser } from "../../State/Auth/Action";

function RegisterForm({ switchToLogin }) {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((store) => store.auth);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };

    dispatch(register(userData));
    console.log("Register data:", userData);

    // Optional: after successful register you can call switchToLogin or close modal
    // switchToLogin();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ flex: 1 }}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
            />
          </div>
          <div style={{ flex: 1 }}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="family-name"
            />
          </div>
        </div>
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
            fullWidth
            autoComplete="new-password"
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
            Register
          </Button>
        </div>
      </form>

      <div className="flex justify-center">
        <div className="py-3 flex items-center">
          <p>If you have already account?</p>
          <Button onClick={switchToLogin} className="ml-5">
            Login
          </Button>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;