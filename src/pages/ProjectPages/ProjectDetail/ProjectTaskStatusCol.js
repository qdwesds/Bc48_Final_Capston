import React from "react";
import { Droppable } from "react-beautiful-dnd";

const ProjectTaskStatusCol = ({ taskDetailList, index, renderProjectCard }) => {
  console.log(renderProjectCard());
  return (
    <>
      <Droppable
        key={taskDetailList.statusId.toString() + index}
        droppableId={taskDetailList.statusId.toString()}
      >
        {(provided) => {
          return (
            <div
              key={taskDetailList.statusId.toString() + index}
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="col w-1/4 shadow-md"
            >
              <div className="flex-1 px-2 bg-[#F4F5F7] shadow-md h-full">
                <div className="content">
                  <div className="header relative h-[40px] py-3 pl-2">
                    <div className="title-wrapper h-full rounded-tl-md rounded-tr-md">
                      <h2 className="title m-0 flex items-center gap-2 text-[#5E6C84] text-xs font-medium uppercase">
                        <p className="text m-0">{taskDetailList.statusName}</p>
                        <span className="task-count">
                          {taskDetailList.lstTaskDeTail.length} issues
                        </span>
                      </h2>
                    </div>
                    <div className="icon-wrapper"></div>
                  </div>
                  <div className="card__list-container min-h-[80px] pb-3 max-w-full">
                    <div className="wrapper px-2 pt-2 flex flex-col gap-4">
                      {renderProjectCard(taskDetailList.lstTaskDeTail)}
                    </div>
                  </div>
                </div>
              </div>
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </>
  );
};

export default ProjectTaskStatusCol;
