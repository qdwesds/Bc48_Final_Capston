import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { Button, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./../../assets/Style/style.scss";
import { projectServ } from "../../services/projectServ";
import { getAllProjectCategory } from "../../redux/Slice/projectCategorySlice";
import EditDescription from "../EditDescription/EditDescription";
import { setLoadingEnd, setLoadingStart } from "../../redux/Slice/loadingSlice";
import { useNavigate } from "react-router-dom";
import toastify from "../../utils/toastify/toastify";

const ProjectForm = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    projectServ
      .getAllProjectCategory()
      .then((res) => {
        console.log(res);
        dispatch(getAllProjectCategory(res.data.content));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const { projectCategoryArr } = useSelector(
    (state) => state.projectCategorySlice
  );

  const formik = useFormik({
    initialValues: {
      projectName: "",
      description: "",
      categoryId: projectCategoryArr[0]?.id || 1,
    },
    onSubmit: (values) => {
      dispatch(setLoadingStart());
      projectServ
        .createProject(values)
        .then((res) => {
          console.log(res);
          setTimeout(() => {
            navigate("/");
            dispatch(setLoadingEnd());
            toastify("success", "Create project successfully!");
          }, 2500);
        })
        .catch((err) => {
          console.log(err);
          setTimeout(() => {
            toastify("error", err.response.data.content);
          }, 2500);
        });
    },
    validationSchema: Yup.object().shape({
      projectName: Yup.string().required(
        "Please do not leave Project name empty"
      ),
      categoryId: Yup.string().required("Please do not leave Category empty"),
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

  const handleEditorChange = (content, editor) => {
    console.log("content", content);
    setFieldValue("description", content);
  };
  return (
    <Form
      id="projectForm"
      onFinish={handleSubmit}
      size="large"
      layout="vertical"
    >
      <Form.Item>
        <div className="formLable">
          <label>
            <span className="text-red-600">*</span> Name
          </label>
        </div>
        <div className="formInput">
          <Input
            name="projectName"
            placeholder="Project name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.projectName}
          />
        </div>
        {errors.projectName && touched.projectName && (
          <span className="text-red-500">{errors.projectName}</span>
        )}
      </Form.Item>
      <Form.Item name="description">
        <div className="formLable">
          <label>Description</label>
        </div>
        <div className="formInput">
          <EditDescription handleEditorChange={handleEditorChange} />
        </div>
      </Form.Item>
      <Form.Item name="categoryId">
        <div className="formLable">
          <label>
            <span className="text-red-600">*</span> Project Category
          </label>
        </div>
        <div className="formSelect">
          <Select
            className="selectCategory"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.categoryId.projectCategoryName}
          >
            {projectCategoryArr.map((item, index) => {
              return <Option key={index}>{item.projectCategoryName}</Option>;
            })}
          </Select>
        </div>
        {errors.categoryId && touched.categoryId && (
          <span className="text-red-500">{errors.categoryId}</span>
        )}
      </Form.Item>
      <Form.Item className="form-btn-group">
        <Button
          type="primary"
          htmlType="submit"
          className="btn-login bg-cyan-500 text-white border-none rounded-[4px] hover:bg-cyan-400 font-semibold text-lg transition-all duration-[400ms] order-2"
        >
          Create Project
        </Button>
        <Button
          htmlType="button"
          onClick={resetForm}
          className="btn-reset btn-txt--underlined border-none text-[#6B778C] text-lg order-1"
        >
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProjectForm;
