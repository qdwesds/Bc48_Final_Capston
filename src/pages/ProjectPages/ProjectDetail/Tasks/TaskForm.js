import { Avatar, Button, Form, Input, InputNumber, Select, Slider } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { closeModal } from "../../../../redux/Slice/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllInfoThunk, getTaskUsersThunk } from "../../../../redux/Slice/taskSlice";
import { projectServ } from "../../../../services/projectServ";
import { BsCheckSquareFill, BsExclamationSquareFill } from "react-icons/bs";
import useResetFormOnCloseModal from "../../../../utils/useResetFormOnCloseModal/useResetFormOnCloseModal";
import EditDescription from "./../../../../components/EditDescription/EditDescription";

const TaskForm = ({
  layout = "horizontal",
  size = "large",
  project,
  buttonText = "Submit",
  handleOnFinish,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { Option } = Select;
  const componentMounted = useRef(true);
  const { open } = useSelector((state) => state.modalSlice.modalProps);
  useResetFormOnCloseModal({form, open: open});
  const [timeTracking, setTimeTracking] = useState({
    timeSpent: 0,
    timeRemains: 0,
  });

  const labelItem = (labelText) => (
    <p className="text-sm font-medium text-blue-400 capitalize">{labelText}</p>
  );

  const onFinish = (values) => {
    handleOnFinish(values);
  };

  const { projectList } = useSelector((state) => state.projectSlice);
  // fetch value
  useEffect(() => {
    dispatch(getAllInfoThunk());
    dispatch(projectServ.getAllAndDispatch(null));
  }, [dispatch]);

  const [projectId, setProjectId] = useState(project?.id || -1);

  if (!project && projectList && projectList.length > 0 && projectId === -1) {
    setProjectId(projectList[0].id);
  }

  useEffect(() => {
    if (projectId > -1) {
      dispatch(getTaskUsersThunk(projectId));
    }
  }, [projectId]);

  const { taskTypeList, taskStatusList, taskPriorityList, taskUserList } =
    useSelector((state) => state.taskSlice);

  let assigneesOptions = [];
  if (taskUserList.length > 0) {
    assigneesOptions = taskUserList?.map((user, index) => {
      let label = (
        <div className={(`user-${user.name}`, "flex items-center gap-3")}>
          <div className="avatar">
            <Avatar
              size={30}
              src={user.avatar}
              key={(Math.floor(Math.random() * 100) + 1).toString() + index}
            />
          </div>
          <p className="text mb-0">{user.name}</p>
        </div>
      );

      return { label: label, value: user.userId };
    });
  }
  // set up initial values
  const getInitialValue = () => {
    let returnedValue = {
      taskName: "",
      typeId: taskTypeList[0].id,
      priorityId: taskPriorityList[0].priorityId,
      statusId: taskStatusList[0].statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      timeTracking: 0,
      listUserAsign: [],
      description: "",
      projectId: projectId,
    };
    return returnedValue;
  };

  const initialValues = getInitialValue();

  useEffect(() => {
    if (componentMounted.current) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues]);

  const handleProjectChange = (value) => {
    setProjectId(Number(value));
  };

  let sliderRemaingText = (
    <>
      <span className="time-text">
        {Number(form.getFieldValue("timeTrackingRemaining"))}
      </span>
      <span>h remaining</span>
    </>
  );

  const sliderMax = () => {
    if (
      Number(form.getFieldValue("originalEstimate")) > 0 &&
      Number(form.getFieldValue("timeTrackingRemaining")) === 0
    ) {
      sliderRemaingText = (
        <>
          <span className="time-text">
            {Number(form.getFieldValue("originalEstimate"))}
          </span>
          <span>h esitmated</span>
        </>
      );
      return form.getFieldValue("originalEstimate");
    }
    return timeTracking.timeRemains + timeTracking.timeSpent;
  };

  const onValuesChange = (changedValues, values) => {
    let fieldChangedName = Object.keys(changedValues)[0];
    let fieldChangedValue = form.getFieldValue(fieldChangedName);
    if (fieldChangedName === "originalEstimate") {
      componentMounted.current = false;
      setTimeTracking({
        ...timeTracking,
        timeSpent: Number(form.getFieldValue("timeTrackingSpent")),
        timeRemains: Number(form.getFieldValue("timeTrackingRemaining")),
      });
    }

    if (fieldChangedName === "timeTrackingSpent") {
      componentMounted.current = false;
      setTimeTracking({
        ...timeTracking,
        timeSpent: Number(fieldChangedValue),
      });
    }

    if (fieldChangedName === "timeTrackingRemaining") {
      componentMounted.current = false;
      setTimeTracking({
        ...timeTracking,
        timeRemains: Number(fieldChangedValue),
      });
    }
  };

  const formProps = { form, layout, size, onFinish, onValuesChange };
  return (
    <Form name="create-task-form" className="myform projectForm" {...formProps}>
      <Form.Item
        name="taskName"
        rules={[
          {
            required: true,
            message: "Please do not leave Name empty",
          },
          { max: 80, message: "Project name can't extend 80 characters." },
        ]}
        label={labelItem("name")}
      >
        <Input
          placeholder="My task..."
          className="py-2 px-5 rounded-md"
          name="taskNameInput"
        />
      </Form.Item>
      <Form.Item name="projectId" label={labelItem("project name")}>
        <Select
          className="select-project rounded-md"
          onChange={handleProjectChange}
        >
          {projectList?.map((project, index) => (
            <Option
              key={project.id.toString() + index}
              value={project.id}
              id={project.id.toString()}
            >
              {project.projectName}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="statusId" label={labelItem("Status Type")}>
        <Select className="select-task-status">
          {taskStatusList?.map((taskStatus, index) => (
            <Option
              key={taskStatus.statusId.toString() + index}
              value={taskStatus.statusId}
            >
              {taskStatus.statusName}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <div className="form-row flex items-center gap-5">
        <div className="form-item-wrapper w-1/2">
          <Form.Item name="priorityId" label={labelItem("priority")}>
            <Select className="select-task-priority">
              {taskPriorityList?.map((taskPriority, index) => {
      
                return (
                  <Option
                    key={taskPriority.priorityId.toString() + index}
                    value={taskPriority.priorityId}
                  >
                    <div className="option-label-item capitalize flex items-center gap-4">
                      <span
                        role="img"
                        aria-label={taskPriority.priority}
                      ></span>
                      {taskPriority.priority}
                    </div>
                  </Option>
                  
                );
                
              })}
            </Select>
          </Form.Item>
        </div>
        <div className="form-item-wrapper w-1/2">
          <Form.Item name="typeId" label={labelItem("Issue Type")}>
            <Select className="select-task-type">
              {taskTypeList?.map((taskType, index) => {
                return (
                  <Option
                    key={taskType.id.toString() + index}
                    value={taskType.id}
                  >
                    <div className="option-label-item capitalize flex items-center gap-4">
                      <span className="icon">
                        {taskType.taskType.toLowerCase() === "new task" ? (
                          <BsCheckSquareFill />
                        ) : (
                          <BsExclamationSquareFill />
                        )}
                      </span>
                      <span className="txt">{taskType.taskType}</span>
                    </div>
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </div>
      </div>
      <div className="form-row flex items-center gap-5">
        <div className="form-item-wrapper w-1/2">
          <Form.Item name="listUserAsign" label={labelItem("assignees")}>
            <Select
              className="select-listUserAsign"
              mode="multiple"
              optionFilterProp="label"
              placeholder="Select assignees"
              options={assigneesOptions}
            />
          </Form.Item>
        </div>

        <div className="form-item-wrapper time-tracking-input-wrapper w-1/2">
          <Form.Item name="timeTracking" label={labelItem("time tracking")}>
            <Slider
              value={Number(form.getFieldValue("timeTrackingSpent"))}
              max={sliderMax()}
              disabled={true}
              tooltip={{ open: false }}
              trackStyle={{
                backgroundColor: "#0052cc",
                height: "7px",
                borderRadius: "4px",
              }}
              handleStyle={{ display: "none" }}
              className="timeTrackingSlider"
            />
            <div className="time-logged flex items-center justify-between">
              <div className="time-spent-logged font-bold">
                <span className="time-text">
                  {form.getFieldValue("timeTrackingSpent")}
                </span>
                <span>h logged</span>
              </div>
              <div className="time-remain-logged font-bold">
                {sliderRemaingText}
              </div>
            </div>
          </Form.Item>
        </div>
      </div>
      <div className="form-row flex items-center gap-5">
        <div className="form-item-wrapper w-1/2">
          <Form.Item
            name="originalEstimate"
            label={labelItem("original estimate")}
          >
            <Input
              placeholder="0"
              className="py-2 px-5 rounded-md"
              name="originalEstimateInput"
            />
          </Form.Item>
        </div>

        <div className="form-inner-wrapper flex items-center gap-3 w-1/2">
          <div className="form-item-wrapper w-1/2">
            <Form.Item
              name="timeTrackingSpent"
              label={labelItem("time spent (hours)")}
              rules={[{ type: "number", min: 0 }]}
            >
              <InputNumber
                placeholder="0"
                className="rounded-md"
                name="timeTrackingSpentInput"
                min={0}
              />
            </Form.Item>
          </div>

          <div className="form-item-wrapper w-1/2">
            <Form.Item
              name="timeTrackingRemaining"
              label={labelItem("time remaining (hours)")}
            >
              <InputNumber
                placeholder="0"
                className="rounded-md"
                name="timeTrackingRemainingInput"
                min={0}
              />
            </Form.Item>
          </div>
        </div>
      </div>
      <Form.Item name="description" label={labelItem("description")}>
        <EditDescription formInstance={form}/>
      </Form.Item>
      <Form.Item className="form-btn-group">
        <Button
          htmlType="button"
          className="btn-cancel btn-txt--underlined border-none text-[#6B778C] text-base order-1"
          onClick={() => {
            dispatch(closeModal());
          }}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          className="btn-login bg-cyan-500 text-white border-none rounded-[4px] hover:bg-cyan-600 font-semibold text-base capitalize transition-all duration-[400ms] order-2"
        >
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
