import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "0.5rem",
  boxShadow: 0,
  p: 4,
};

function AuthModal({ handleClose, open }) {
  const [isLogin, setIsLogin] = useState(true);

  // Called by RegisterForm on successful register to switch to login
  const switchToLogin = () => setIsLogin(true);
  // Called by LoginForm to switch to register form
  const switchToRegister = () => setIsLogin(false);

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={style}>
        {isLogin ? (
          <LoginForm
            switchToRegister={switchToRegister}
            handleClose={handleClose}
          />
        ) : (
          <RegisterForm switchToLogin={switchToLogin} />
        )}
      </Box>
    </Modal>
  );
}

export default AuthModal;