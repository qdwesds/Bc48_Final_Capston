import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { userServ } from "./../../services/userServ";
import { login } from "../../redux/Slice/userSlice";
import { saveLocal, unsetLocal } from "../../utils/localStorage";
import toastify from "../../utils/toastify/toastify";
import { setLoadingEnd, setLoadingStart } from "../../redux/Slice/loadingSlice";

const ProfileForm = ({
  layout = "vertical",
  size = "large",
  user,
  setIsEdit,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const labelItem = (labelText) => (
    <span className="text-lg font-medium text-pickled-bluewood-400 capitalize">
      {labelText}
    </span>
  );

  const [form] = Form.useForm();

  const initialValues = {
    id: user.id,
    name: user.name,
    email: user.email,
    passWord: user.passWord,
    phoneNumber: user.phoneNumber,
  };

  const onFinish = (values) => {
    dispatch(setLoadingStart());
    userServ
      .editProfile(values)
      .then(() => {
        userServ
          .login({
            email: values.email,
            passWord: values.passWord,
          })
          .then((res) => {
            dispatch(login(res.data.content));
            saveLocal("user", res.data.content);
            setIsEdit(false);
            toastify("success", "User updated successfully");
            dispatch(setLoadingEnd());
          })
          .catch((err2) => {
            console.log(err2);
            toastify("warn", "User updated successfully with interface error");
            unsetLocal("user");
            dispatch(setLoadingEnd());
            toastify("info", "Please log in again");
            navigate("login");
          });
      })
      .catch((err1) => {
        console.log(err1);
        toastify("error", err1.response.data.message);
        dispatch(setLoadingEnd());
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.setFieldsValue({
      name: "",
      email: "",
      passWord: "",
      phoneNumber: "",
    });
  };
  return (
    <Form
      form={form}
      name="user_profile"
      layout={layout}
      size={size}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label={labelItem("My ID")} name="id">
        <Input disabled />
      </Form.Item>
      <Form.Item
        label={labelItem("Name")}
        name="name"
        rules={[{ required: true, message: "Please input your Name here" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={labelItem("Email")}
        name="email"
        rules={[
          { required: true, message: "Please add your email here" },
          {
            type: "email",
            message: "Please use correct email format",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={labelItem("Password")}
        name="passWord"
        rules={[
          { required: true, message: "Your password should not be empty" },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label={labelItem("Phone number")}
        name="phoneNumber"
        rules={[
          { required: true, message: "Phone number is required" },
          {
            pattern: /^\d+$/,
            message: "Number only, no whitespace",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item className="form-btn-group">
        <Button
          type="primary"
          htmlType="submit"
          className="btn-login bg-science-blue-500 text-white border-none rounded-[4px] hover:bg-blue-800 font-semibold text-xl transition-all duration-[400ms] order-3"
        >
          Submit
        </Button>
        <Button
          htmlType="button"
          onClick={onReset}
          className="btn-login bg-gray-500 text-white border-none rounded-[4px] hover:bg-gray-700 font-semibold text-xl transition-all duration-[400ms] order-2"
        >
          Reset
        </Button>
        <Button
          htmlType="button"
          onClick={() => {
            setIsEdit(false);
          }}
          className="btn-reset btn-txt--underlined border-none text-gray-500 text-xl order-1"
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
