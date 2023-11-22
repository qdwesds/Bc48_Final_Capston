import { Button, Form, Input, Select } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { projectServ } from "../../services/projectServ";
import EditDescriptionModal from "./EditDescriptionModal";
import { getAllProjectCategory } from "../../redux/Slice/projectCategorySlice";


const ProjectEditModal = ({project, handleOnSubmit}) => {
  const { Option } = Select;
  const dispatch = useDispatch();

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

  const getInitialValue = () => {
    if (project) {
      const categoryId = project.categoryId
        ? project.categoryId
        : project.projectCategory.id;
      return {
        categoryId,
        projectName: project.projectName,
        description: project.description,
      };
    }
    return { categoryId: projectCategoryArr[0]?.id || 1 };
    
  };
  const initialValues = getInitialValue();

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      handleOnSubmit(values);
    },
    validationSchema: Yup.object().shape({
      projectName: Yup.string().required(
        "Please do not leave Project name empty"
      ),
      categoryId: Yup.string().required("Please do not leave Category empty"),
    }),
  });

  const { projectCategoryArr } = useSelector(
    (state) => state.projectCategorySlice
  );

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
          <EditDescriptionModal
            project={project}
            handleEditorChange={handleEditorChange}
          />
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
            {projectCategoryArr?.map((item, index) => {
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
          className="bg-cyan-500 capitalize text-white border-none rounded-[4px] hover:bg-cyan-400 font-semibold text-lg transition-all duration-[400ms] order-2"
        >
          Update Project
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

export default ProjectEditModal;
