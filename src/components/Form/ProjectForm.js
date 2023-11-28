import React, { useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import { useSelector } from "react-redux";
import "./../../assets/Style/style.scss";
import EditDescription from "../EditDescription/EditDescription";
import { useFetchProjectCatList } from "../../hooks/useFetchProjectCatList";

const ProjectForm = ({
  layout = "horizontal",
  size = "large",
  project,
  confirmText,
  handleOnFinish,
}) => {
  const [form] = Form.useForm();
  const { projectCategoryArr } = useSelector(
    (state) => state.projectCategorySlice
  );
  const { Option } = Select;
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

  useFetchProjectCatList();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const onFinish = (values) => {
    handleOnFinish(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const formProps = { form, onFinish, layout, size };
  const labelItem = (labelText) => (
    <p className="text-lg font-medium text-blue-400 capitalize">
       {labelText}
    </p>
  );
  return (
    <Form name="project_form" className="myform projectForm" {...formProps}>
      <Form.Item
        name="projectName"
        rules={[
          {
            required: true,
            message: "Please do not leave ${name} empty",
          },
          { max: 80, message: "Project name can't extend 80 characters." },
        ]}
        label={labelItem("name")}
      >
        <Input
          placeholder="My project..."
          className="py-2 px-5 rounded-md"
          name="projectName"
        />
      </Form.Item>
      <Form.Item name="description" label={labelItem("description")}>
        <EditDescription formInstance={form}/>
      </Form.Item>
      <Form.Item
        name="categoryId"
        rules={[
          { required: true, message: "Please do not leave Category empty" },
        ]}
        label={labelItem("Project Category")}
      >
        <Select className="select-category">
          {projectCategoryArr.map((item, index) => {
            return (
              <Option key={item.id.toString() + index} value={item.id}>
                {item.projectCategoryName}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item className="form-btn-group">
        <Button
          type="primary"
          htmlType="submit"
          className="btn-login bg-cyan-500 text-white border-none rounded-[4px] hover:bg-cyan-400 font-semibold text-lg transition-all duration-[400ms] order-2"
        >
          {confirmText}
        </Button>
        <Button
          htmlType="button"
          onClick={onReset}
          className="btn-reset btn-txt--underlined border-none text-[#6B778C] text-lg order-1"
        >
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProjectForm;
