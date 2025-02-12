"use client";
import React from "react";
import LoginForm from "../../components/LoginForm";

export default function LoginPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "0 16px",
      }}
    >
      <LoginForm />
    </div>
  );
}
