import { Avatar, Form, Input, InputNumber, Modal, Select, Slider } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocal } from "../../../utils/localStorage";
import useResetFormOnCloseModal from "../../../utils/useResetFormOnCloseModal/useResetFormOnCloseModal";
import {
  getAllInfoThunk,
  getTaskDetailThunk,
  getTaskUsersThunk,
} from "../../../redux/Slice/taskSlice";
import HTMLReactParser from "html-react-parser";
import { taskServ } from "../../../services/taskServ";
import EditDescription from "../../EditDescription/EditDescription";

const EditTaskForm = ({ layout = "horizontal", size = "large", task }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;

  const { taskStatusList, taskPriorityList, taskUserList, taskDetail } =
    useSelector((state) => state.taskSlice);

  let clonedTask = taskDetail ? JSON.parse(JSON.stringify(taskDetail)) : "";

  const componentMounted = useRef(true);
  const [visibleEditor, setVisibleEditor] = useState(false);
  const [timeTracking, setTimeTracking] = useState({
    timeSpent: 0,
    timeRemains: 0,
  });

  const { open } = useSelector((state) => state.modalSlice.modalProps);
  useResetFormOnCloseModal({ form: form, open: open });

  useEffect(() => {
    if (componentMounted.current) {
      // get data api
      dispatch(getAllInfoThunk());
      dispatch(getTaskUsersThunk(task.projectId));
      dispatch(getTaskDetailThunk(task.taskId));
    }
  }, []);

  const labelItem = (labelText) => (
    <p className="text-base font-medium text-blue-400 capitalize">
      {labelText}
    </p>
  );

  const getInitialValue = () => {
    let listUserAssign = [];
    let returnedValue = {
      taskName: "",
      priorityId: taskPriorityList[0].priorityId,
      statusId: taskStatusList[0].statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      listUserAsign: listUserAssign,
      description: "",
    };

    if (taskDetail) {
      returnedValue = {
        ...returnedValue,
        ...taskDetail,
        listUserAsign: taskDetail.assigness.map((assignee) => assignee.id),
      };
    }

    return { ...returnedValue, timeTracking: 0 };
  };

  let initialValues = getInitialValue();

  useEffect(() => {
    if (componentMounted.current) {
      if (taskDetail) {
        componentMounted.current = false;
        form.setFieldsValue(initialValues);
        form.setFieldValue(
          "timeTrackingSpent",
          initialValues.timeTrackingSpent
        );
        form.setFieldValue(
          "timeTrackingRemaining",
          initialValues.timeTrackingRemaining
        );
        console.log("time tracking spent init");
        console.log(form.getFieldValue("timeTrackingSpent"));
        console.log("timeTrackingRemaining init");
        console.log(form.getFieldValue("timeTrackingRemaining"));
        setTimeTracking({
          ...timeTracking,
          timeSpent: Number(form.getFieldValue("timeTrackingSpent")),
          timeRemains: Number(form.getFieldValue("timeTrackingRemaining")),
        });
      }
    }
  }, [form, initialValues]);

  const renderParsedDesc = () => {
    if (taskDetail) {
      return (
        <div
          onClick={() => {
            setVisibleEditor(!visibleEditor);
            componentMounted.current = visibleEditor;
          }}
          className={
            ("txt cursor-pointer",
            "transition-all duration-[700ms]",
            taskDetail.description.length === 0
              ? "hover:bg-slate-400/50 p-3 rounded-md"
              : "",
            !visibleEditor
              ? "opacity-100 visible w-full h-auto"
              : "opacity-0 hidden w-0 h-0")
          }
        >
          {taskDetail.description.length > 0
            ? HTMLReactParser(taskDetail.description)
            : "Add a description..."}
        </div>
      );
    }
  };

  const renderTaskStatusOptions = () => {
    return taskStatusList?.map((taskStatus, idx) => {
      return (
        <Option
          key={taskStatus.statusId.toString() + idx}
          value={taskStatus.statusId}
        >
          {taskStatus.statusName}
        </Option>
      );
    });
  };

  let assigneesOptions = [];
  const renderTaskAssigneesOptions = () => {
    if (taskUserList.length) {
      return taskUserList?.map((user, idx) => {
        let label = (
          <div className={(`user-${user.name}`, "flex items-center gap-3 m-0")}>
            <div className="avatar">
              <Avatar
                size={20}
                src={user.avatar}
                key={(Math.floor(Math.random() * 100) + 1).toString() + idx}
                className=""
              />
            </div>
            <p className="text mb-0">{user.name}</p>
          </div>
        );

        return { label: label, value: user.userId };
      });
    }
  };

  assigneesOptions = renderTaskAssigneesOptions();

  const handleSubmitData = (formAllTaskValue) => {
    formAllTaskValue.timeTrackingSpent = Number(
      form.getFieldValue("timeTrackingSpent")
    );
    formAllTaskValue.timeTrackingRemaining = Number(
      form.getFieldValue("timeTrackingRemaining")
    );
    console.log("formAllTaskValue");
    console.log(formAllTaskValue);
    Object.entries(formAllTaskValue).map((item, idx) => {
      clonedTask[item[0]] = item[1];
    });

    let assignees = taskUserList.filter((user) => {
      let foundIdx = clonedTask.listUserAsign.findIndex(
        (userAsignId) => userAsignId === user.userId
      );
      if (foundIdx > -1) {
        return true;
      }
      return false;
    });
    clonedTask.assigness = assignees.map((assign) => {
      let clonedObj = JSON.parse(JSON.stringify(assign));
      clonedObj.id = assign.userId;
      delete clonedObj.userId;

      return clonedObj;
    });
    dispatch(taskServ.updateTaskThunk(clonedTask));
  };

  let [isModalOpen, setIsModalOpen] = useState(false);
  const modalTimeTrackingContent = () => {
    return (
      <>
        <div className="form-item-wrapper time-tracking-input-wrapper w-full">
          <Form.Item name="timeTracking">
            <Slider
              value={timeTracking.timeSpent}
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
                  {Number(form.getFieldValue("timeTrackingSpent"))}
                </span>
                <span>h logged</span>
              </div>
              <div className="time-remain-logged font-bold">
                {sliderRemaingText}
              </div>
            </div>
          </Form.Item>
        </div>
        <div className="form-inner-wrapper flex items-center gap-3 w-full">
          <div className="form-item-wrapper w-1/2">
            <Form.Item
              name="timeTrackingSpent"
              label={labelItem("time spent (hours)")}
              rules={[{ type: "number", min: 0 }]}
            >
              <InputNumber placeholder="0" className="rounded-md" min={0} />
            </Form.Item>
          </div>

          <div className="form-item-wrapper w-1/2">
            <Form.Item
              name="timeTrackingRemaining"
              label={labelItem("time remaining (hours)")}
            >
              <InputNumber placeholder="0" className="rounded-md" min={0} />
            </Form.Item>
          </div>
        </div>
      </>
    );
  };
  const modalEditTimeTracking = () => {
    return (
      <Modal
        title={
          <h3 className="text-base font-medium text-pickled-bluewood-400 capitalize">
            time tracking
          </h3>
        }
        open={isModalOpen}
        destroyOnClose={true}
        wrapClassName={"edit-time-modal"}
        centered
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        {modalTimeTrackingContent()}
      </Modal>
    );
  };

  let sliderRemaingText = (
    <>
      <span className="time-text">
        {Number(form.getFieldValue("timeTrackingRemaining"))}
      </span>
      <span>h remaining</span>
    </>
  );

  let sliderMax = () => {
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
  const onValuesChange = (changedValues) => {
    let fieldChangedName = Object.keys(changedValues)[0];
    let fieldChangedValue = form.getFieldValue(fieldChangedName);
    let formAllTaskValue = form.getFieldsValue();
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
    formAllTaskValue.originalEstimate = Number(
      form.getFieldValue("originalEstimate")
    );

    handleSubmitData(formAllTaskValue);
  };
  const formProps = { form, layout, size, onValuesChange };
  return (
    <>
      <Form
        name="edit-task-form"
        className="myform editTaskForm"
        {...formProps}
      >
        <div className="content-wrapper flex justify-between">
          <div className="col--left w-[60%]">
            <Form.Item
              name="taskName"
              rules={[
                {
                  required: true,
                  message: "Please do not leave ${name} empty",
                },
                {
                  max: 80,
                  message: "Project name can't extend 80 characters.",
                },
              ]}
            >
              <Input className="py-2 pl-2 pr-3 rounded-md border-none text-2xl font-bold" />
            </Form.Item>
            <Form.Item
              noStyle
              className="wrapper flex flex-col justify-center gap-4"
            >
              {renderParsedDesc()}
              <Form.Item
                name="description"
                label={labelItem("description")}
                className={
                  ("desc-editor",
                  visibleEditor
                    ? "opacity-100 visible w-full h-auto"
                    : "opacity-0 hidden w-0 h-0")
                }
              >
                <EditDescription formInstance={form} />
                <div className="btn-list mt-4">
                  <div className="wrapper flex gap-3">
                    <button
                      className="btn-save bg-science-blue-500 text-white border-none rounded-[4px] hover:bg-[#0065ff] font-semibold text-base transition-all duration-[400ms] order-2 px-5 py-2.5"
                      handleOnClick={() => {
                        componentMounted.current = false;
                        if (taskDetail) {
                          handleSubmitData(form.getFieldsValue());
                        }
                        setVisibleEditor(false);
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="btn-cancel btn-txt--underlined border-none text-[#6B778C] text-base order-1 px-5 py-2.5"
                      handleOnClick={() => {
                        componentMounted.current = true;
                        form.setFieldValue(
                          "description",
                          taskDetail?.description
                        );
                        console.log("cancel editor value");
                        setVisibleEditor(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Form.Item>
            </Form.Item>
            <div className="form-section-wrapper mt-3">
              <Form.Item name="comments" label={labelItem("comments")}>
                <div className="inner-wrapper flex gap-2">
                  <Avatar size={35} src={getLocal("user").avatar} />
                  <TextArea className="rounded-md" />
                </div>
              </Form.Item>
            </div>
          </div>
          <div className="col--right w-[35%]">
            <Form.Item name="statusId" label={labelItem("Status")}>
              <Select className="select-task-status">
                {renderTaskStatusOptions()}
              </Select>
            </Form.Item>
            <Form.Item name="listUserAsign" label={labelItem("assignees")}>
              <Select
                mode="multiple"
                optionFilterProp="label"
                placeholder="Select assignees"
                className="select-listUserAsign py-3"
                options={assigneesOptions}
              />
            </Form.Item>
            <Form.Item name="reporter" label={labelItem("reporter")}>
              <Select
                className="select-reporter"
                mode="multiple"
                optionFilterProp="label"
              />
            </Form.Item>
            <Form.Item name="priorityId" label={labelItem("priority")}>
              <Select className="select-task-priority">
                {taskPriorityList?.map((taskPriority, idx) => {
                  return (
                    <Option
                      key={taskPriority.priorityId.toString() + idx}
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
            <Form.Item
              name="originalEstimate"
              label={labelItem("original estimate")}
            >
              <Input placeholder="Number" className="py-2 px-5 rounded-md" />
            </Form.Item>
            <Form.Item
              className="form-item-wrapper time-tracking-wrapper"
              noStyle
            >
              <div
                className="form-inner-item-wrapper time-slider-wrapper cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <Form.Item
                  name="timeTracking"
                  label={labelItem("time tracking")}
                >
                  <Slider
                    value={timeTracking.timeSpent}
                    max={sliderMax()}
                    disabled={true}
                    tooltip={{ open: false }}
                    trackStyle={{
                      backgroundColor: "#0052cc",
                      height: "7px",
                      borderRadius: "4px",
                    }}
                    handleStyle={{ display: "none" }}
                    className="timeTrackingSlider cursor-pointer"
                  />
                  <div className="time-logged flex items-center justify-between">
                    <div className="time-spent-logged font-bold">
                      {Number(form.getFieldValue("timeTrackingSpent"))}
                      <span>h logged</span>
                    </div>
                    <div className="time-remain-logged font-bold">
                      {sliderRemaingText}
                    </div>
                  </div>
                </Form.Item>
              </div>
            </Form.Item>
          </div>
        </div>
        {modalEditTimeTracking()}
      </Form>
    </>
  );
};

export default EditTaskForm;
