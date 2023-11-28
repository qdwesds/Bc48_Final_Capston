import React from "react";
import { DropwDownIcons } from "../../../../utils/TaskIcons/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { Popconfirm, Select } from "antd";
import { taskServ } from "../../../../services/taskServ";
import { closeModal } from "../../../../redux/Slice/modalSlice";
import { TfiTrash } from "react-icons/tfi";
import { FiSend, FiLink } from "react-icons/fi";

const EditTaskHeader = () => {
  const dispatch = useDispatch();
  let taskTypeIcons = DropwDownIcons.taskType;
  let { taskDetail: task, taskTypeList } = useSelector(
    (state) => state.taskSlice
  );
  let clonedTask = task ? JSON.parse(JSON.stringify(task)) : [];
  const { Option } = Select;
  const flexBetweenClass = "flex items-center justify-between";
  const btnActionClass =
    "flex items-center gap-2 cursor-pointer hover:bg-slate-400/20 p-3 rounded-md transition-all duration-[700ms]";

  const handleSelect = (value) => {
    clonedTask = { ...clonedTask, typeId: value };
    dispatch(taskServ.updateTaskThunk(clonedTask));
  };

  const text = "Are you sure to delete this task?";
  const handleDetele = (task) => {
    dispatch(closeModal());
    dispatch(taskServ.deleteTaskThunk(task));
  };

  let defaultOption = task && task.typeId;
  return (
    <div className="content edit-task-header">
      <div className={flexBetweenClass}>
        <div className="col-right">
          <div className="task-title">
            <div className="wrapper flex items-center gap-1">
              <Select
                className="select-task-type w-[200px] hover:bg-slate-400/20 rounded-md transition-all duration-[700ms]"
                value={defaultOption}
                defaultValue={defaultOption}
                optionLabelProp="label"
                onSelect={handleSelect}
                showArrow={false}
              >
                {taskTypeList?.map((type, idx) => {
                  let optionLabel = (
                    <div className="task-type-label flex items-center gap-3 w-full h-full">
                      <span className="icon">
                        {taskTypeIcons[type.taskType]}
                      </span>
                      <p className="title flex items-center mb-0">
                        <span className="txt uppercase">{type.taskType}</span>
                        <span className="char mx-2">-</span>
                        <span className="task-id">{task?.taskId}</span>
                      </p>
                    </div>
                  );
                  return (
                    <Option
                      key={type.id.toString() + idx}
                      value={type.id}
                      label={optionLabel}
                    >
                      <div className="option-label-item capitalize flex items-center gap-2">
                        <span className="icon">
                          {taskTypeIcons[type.taskType]}
                        </span>
                        <span className="txt">{type.taskType}</span>
                      </div>
                    </Option>
                  );
                })}
              </Select>
            </div>
          </div>
        </div>
        <div className={`col-left ${flexBetweenClass} gap-3`}>
          <div className={btnActionClass}>
            <div className="icon">
              <FiSend className="text-slate-600" />
            </div>
            <span className="txt capitalize tracking-wide">give feedback</span>
          </div>
          <div className={btnActionClass}>
            <div className="icon">
              <FiLink className="text-slate-600" />
            </div>
            <span className="txt capitalize tracking-wide">copy link</span>
          </div>
          <Popconfirm
            placement="topLeft"
            title={text}
            onConfirm={() => {
              handleDetele(task);
            }}
            okText="Yes"
            cancelText="No"
          >
            <div className={btnActionClass}>
              <div className="icon">
                <TfiTrash className="text-slate-600 text-lg" />
              </div>
            </div>
          </Popconfirm>
        </div>
      </div>
    </div>
  );
};

export default EditTaskHeader;
