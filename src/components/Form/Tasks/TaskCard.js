import React from "react";
import { DropwDownIcons } from "../../../utils/TaskIcons/Dropdown";
import { Draggable } from "react-beautiful-dnd";
import MemberAvatar from "../../Avatar/MemberAvatar";
import { Avatar } from "antd";

const TaskCard = ({ taskDetail, index, handleEditTask }) => {
  const taskTypeIcons = DropwDownIcons.taskType;
  const taskStatusIcons = DropwDownIcons.status;
  return (
    <Draggable
      key={taskDetail.taskId.toString()}
      index={index}
      draggableId={JSON.stringify(taskDetail)}
    >
      {(provided) => {
        return (
          <div
            className="card rounded-[3px] bg-white hover:shadow-md text-[#172B4D] hover:bg-[#F4F5F7] hover:text-[#172B4D]"
            key={taskDetail.taskId.toString() + index}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => {
              handleEditTask(taskDetail);
            }}
          >
            <div className="card-content p-3">
              <div className="card__title text-sm mb-9">
                <h6>{taskDetail.taskName}</h6>
              </div>
              <div className="card__info">
                <div className="wrapper flex items-center justify-between">
                  <div className="card__info-col--left flex items-center gap-2">
                    <div className="type flex items-center gap-2">
                      <span className="icon">
                        {taskTypeIcons[taskDetail.taskTypeDetail.taskType]}
                      </span>
                    </div>
                    <div className="priority flex items-center gap-1">
                      <span className="icon flex items-center">
                        {
                          taskStatusIcons[
                            taskDetail.priorityTask.priority.toLowerCase()
                          ]
                        }
                      </span>
                      <span className="txt">
                        {taskDetail.priorityTask.priority}
                      </span>
                    </div>
                  </div>
                  <div className="card__info-col--left">
                    <div className="member">
                      <Avatar.Group size={30}>
                        <MemberAvatar members={taskDetail.assigness} />
                      </Avatar.Group>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default TaskCard;
