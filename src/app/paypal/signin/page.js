"use client";
import React, { useState } from "react";
import { Form, Input, Button, Divider } from "antd";
import logo from "../../../../public/images/logo.png";
import Image from "next/image";

const LoginForm = () => {
  const [isHoveredFwPw, setIsHoveredFwPw] = useState(false);
  const [isHoveredLogin, setIsHoveredLogin] = useState(false);
  const [isHoveredSignup, setIsHoveredSignup] = useState(false);
  const [form] = Form.useForm();
  const handleMouseOverFwPw = () => {
    setIsHoveredFwPw(true);
  };

  const handleMouseOutFwPw = () => {
    setIsHoveredFwPw(false);
  };

  const handleMouseOverLogin = () => {
    setIsHoveredLogin(true);
  };

  const handleMouseOutLogin = () => {
    setIsHoveredLogin(false);
  };

  const handleMouseOverSignup = () => {
    setIsHoveredSignup(true);
  };

  const handleMouseOutSingup = () => {
    setIsHoveredSignup(false);
  };

  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  const dividerStyle = {
    display: "flex",
    alignItems: "center",
    width: "100%",
    borderTop: "1px solid #ccc",
  };

  const textStyle = {
    flexGrow: 1,
    textAlign: "center",
    margin: "0 10px",
  };

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      form={form}
      style={{
        maxWidth: "42rem",
        margin: "auto",
        border: "1px solid #eaeced",
        borderRadius: "12px",
        padding: "30px 5% 50px",
        marginTop: "120px",
      }}
    >
      <Image
        src={logo}
        alt=""
        style={{
          display: "block",
          margin: "0 auto 13.116%",
          width: "60px",
          height: "45px",
        }}
      />

      <Form.Item name="email" rules={[{ required: true, message: "Required" }]}>
        <Input
          placeholder="Email or mobile number"
          style={{
            height: "64px",
            border: "2px solid #CBD5E0",
            padding: "1rem 0.5rem",
            borderRadius: "4px",
            fontFamily: "pp-sans-big-regular,Helvetica Neue,Arial,sans-serif",
            fontSize: "18px",
            fontWeight: "400",
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item name="email" rules={[{ required: true, message: "Required" }]}>
        <Input
          placeholder="Password"
          style={{
            height: "64px",
            border: "2px solid #CBD5E0",
            padding: "1rem 0.5rem",
            borderRadius: "4px",
            fontFamily: "pp-sans-big-regular,Helvetica Neue,Arial,sans-serif",
            fontSize: "18px",
            fontWeight: "400",
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item>
        <div
          onMouseOver={handleMouseOverFwPw}
          onMouseOut={handleMouseOutFwPw}
          style={{
            color: "#1072eb",
            fontWeight: "bold",
            fontSize: "18px",
            textDecoration: isHoveredFwPw ? "underline" : "none",
          }}
        >
          Forgot password?
        </div>
      </Form.Item>

      <Form.Item>
        <Button
          onMouseOver={handleMouseOverLogin}
          onMouseOut={handleMouseOutLogin}
          htmlType="submit"
          style={{
            width: "100%",
            borderColor: isHoveredLogin ? "#1040c1" : "#142c8e",
            backgroundColor: isHoveredLogin ? "#1040c1" : "#142c8e",
            color: "#fff",
            fontSize: "18px",
            borderRadius: "25px",
            minHeight: "48px",
            padding: "8px 32px",
          }}
        >
          Log In
        </Button>
      </Form.Item>

      <Form.Item>
        <Divider plain>or</Divider>
      </Form.Item>

      <Form.Item>
        <Button
          onClick={() => {
            window.open(
              "https://www.paypal.com/vn/webapps/mpp/account-selection"
            );
          }}
          onMouseOver={handleMouseOverSignup}
          onMouseOut={handleMouseOutSingup}
          style={{
            width: "100%",
            border: isHoveredSignup
              ? "2px solid #142c8e"
              : "0.0125rem solid #142c8e",
            backgroundColor: "#fff",
            boxShadow: "inset 0 0 0 0.0625rem #142c8e",
            color: isHoveredSignup ? "#142c8e" : "#142c8e",
            fontSize: "18px",
            borderRadius: "25px",
            minHeight: "48px",
            padding: "8px 32px",
          }}
        >
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
