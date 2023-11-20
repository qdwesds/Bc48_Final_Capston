import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form, Input } from "antd";
import { userServ } from "./../../services/userServ";
import { login } from "../../redux/Slice/userSlice";
import { getLocal, saveLocal, unsetLocal } from "../../utils/localStorage";
import toastify from "../../utils/toastify/toastify";

const ProfileForm = ({ user, setIsEdit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const labelItem = (labelText) => (
    <span className="text-lg font-medium text-pickled-bluewood-400 capitalize">
      {labelText}
    </span>
  );

  const formik = useFormik({
    initialValues: {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
    },
    onSubmit: (values) => {
      userServ
        .editProfile(values)
        .then(() => {
          if (values.email && values.email.length > 0) {
            if (!getLocal("user")) {
              userServ
                .login({ email: values.email, password: values.password })
                .then((res) => {
                  dispatch(login(res.data.content));
                  saveLocal("user", res.data.content);
                  setIsEdit(false);
                  toastify("success", "User updated successfully");
                })
                .catch((err1) => {
                  toastify(
                    "warn",
                    "User updated successfully with interface error"
                  );
                  unsetLocal("user");
                  toastify("info", "Please log in again");
                  navigate("/sign-in");
                });
            }
          }
        })
        .catch((err) => {
          toastify("error", err.response.data.message);
        });
    },
    
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Please enter your name here"),
      email: Yup.string().required("Please enter your email here"),
      password: Yup.string().required("Your password should not be empty"),
      phoneNumber: Yup.string().required("Phone number is required"),
    }),
  });
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    setFieldValue,
    errors,
    touched,
    resetForm,
  } = formik;
  return (
    <Form
      id="profileForm"
      onFinish={handleSubmit}
      size="large"
      layout="vertical"
    >
      <Form.Item label={labelItem("ID")}>
        <Input
          name="id"
          disabled
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.id}
        />
      </Form.Item>

      <Form.Item label={labelItem("Name")}>
        <Input
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
        />
        {errors.name && touched.name && (
          <span className="text-red-500">{errors.name}</span>
        )}
      </Form.Item>

      <Form.Item label={labelItem("Email")}>
        <Input
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        {errors.email && touched.email && (
          <span className="text-red-500">{errors.email}</span>
        )}
      </Form.Item>

      <Form.Item label={labelItem("Password")}>
        <Input
          name="password"
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
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.phoneNumber}
        />
        {errors.phoneNumber && touched.phoneNumber && (
          <span className="text-red-500">{errors.phoneNumber}</span>
        )}
      </Form.Item>

      <Form.Item className="form-btn-group">
        <Button
          type="primary"
          htmlType="submit"
          className="btn-login bg-blue-500 text-white border-none rounded-[4px] hover:bg-blue-800 font-semibold text-xl transition-all duration-[400ms] order-3"
        >
          Submit
        </Button>
        <Button
          htmlType="button"
          onClick={resetForm()}
          className="btn-login bg-gray-500 text-white border-none rounded-[4px] hover:bg-gray-700 font-semibold text-xl transition-all duration-[400ms] order-2"
        >
          Reset
        </Button>
        <Button
          htmlType="button"
          onClick={() => {
            setIsEdit(false);
          }}
          className="btn-reset border-none text-gray-500 text-xl order-1"
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
