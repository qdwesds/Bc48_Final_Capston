import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form, Input } from "antd";
import {
  LockOutlined,
  MailOutlined,
  MobileOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { userServ } from "../../../services/userServ";
import toastify from "../../../utils/toastify/toastify";

const UserEditModal = ({ user, fetchUserList }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user?.email,
      name: user?.name,
      password: user?.password,
      phoneNumber: user?.phoneNumber,
    },
    onSubmit: (values) => {
      let userEdit = { ...values, id: user.userId };
      userServ
        .editUser(userEdit)
        .then((res) => {
          toastify("success", "Update user successfully!");
          fetchUserList();
        })
        .catch((err) => {
          toastify("error", err.response.data.message);
        });
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Please do not leave email empty"),
      password: Yup.string().required("Please do not leave password empty"),
      name: Yup.string().required("Please do not leave name empty"),
      phoneNumber: Yup.string().required(
        "Please do not leave phone number empty"
      ),
    }),
  });
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    resetForm,
  } = formik;
  const labelItem = (labelText) => (
    <p className="text-lg font-medium">
      <span className="text-red-600">*</span> {labelText}
    </p>
  );
  return (
    <Form onFinish={handleSubmit} layout="vertical" size="large">
      <Form.Item label={labelItem("Email")}>
        <Input
          name="email"
          prefix={<MailOutlined className="" />}
          placeholder="abc@gmail.com"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        {errors.email && touched.email && (
          <span className="text-red-500">{errors.email}</span>
        )}
      </Form.Item>
      <Form.Item label={labelItem("User Name")}>
        <Input
          name="name"
          prefix={<IdcardOutlined className="" />}
          placeholder="Your name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
        />
        {errors.name && touched.name && (
          <span className="text-red-500">{errors.name}</span>
        )}
      </Form.Item>
      <Form.Item label={labelItem("Password")}>
        <Input
          type="password"
          name="password"
          prefix={<LockOutlined className="" />}
          placeholder="Enter your password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        {errors.password && touched.password && (
          <span className="text-red-500">{errors.password}</span>
        )}
      </Form.Item>
      <Form.Item label={labelItem("Phone Number")}>
        <Input
          name="phoneNumber"
          prefix={<MobileOutlined className="" />}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.phoneNumber}
        />
        {errors.phoneNumber && touched.phoneNumber && (
          <span className="text-red-500">{errors.phoneNumber}</span>
        )}
      </Form.Item>
      <Form.Item className="text-end">
        <Button
          type="primary"
          htmlType="submit"
          className="bg-blue-500 mt-3 text-lg font-semibold hover:bg-blue-400 duration-300"
        >
          Update User
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserEditModal;
