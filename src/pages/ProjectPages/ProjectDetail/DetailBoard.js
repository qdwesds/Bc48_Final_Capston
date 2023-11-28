import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal, setUpModal } from "../../../redux/Slice/modalSlice";
import EditTaskHeader from "./Tasks/EditTaskHeader";
import EditTask from "./Tasks/EditTask";
import { projectServ } from "../../../services/projectServ";
import { taskServ } from "../../../services/taskServ";
import { putProjectDetail } from "../../../redux/Slice/projectSlice";
import TaskCard from "../../../components/Form/Tasks/TaskCard";
import ProjectTaskStatusCol from "./ProjectTaskStatusCol";
import { DragDropContext } from "react-beautiful-dnd";

const DetailBoard = ({ project }) => {
  const dispatch = useDispatch();
  const { modalProps } = useSelector((state) => state.modalSlice);

  const handleEditTask = (task) => {
    dispatch(
      setUpModal({
        ...modalProps,
        width: 1000,
        headerContent: <EditTaskHeader />,
      })
    );
    dispatch(openModal(<EditTask task={task} project={project} />));
  };
  const handleDragEnd = async (result) => {
    console.log(result);
    const { destination: dest, source, draggableId } = result;

    const taskDragged = JSON.parse(draggableId);
    if (!dest) {
      return;
    }

    if (
      dest.index === source.index &&
      dest.droppableId === source.droppableId
    ) {
      return;
    }

    taskServ
      .updateTaskStatus({
        taskId: taskDragged.taskId,
        statusId: dest.droppableId,
      })
      .then((res) => {
        projectServ
          .getDetails(taskDragged.projectId)
          .then((res) => {
            dispatch(
              putProjectDetail({
                id: res.data.content.id,
                projectName: res.data.content.projectName,
                description: res.data.content.description,
                categoryName: res.data.content.projectCategory.name,
                categoryId: res.data.content.projectCategory.id,
                projectCategory: res.data.content.projectCategory,
                creator: res.data.content.creator,
                lstTask: res.data.content.lstTask,
                members: res.data.content.members,
                alias: res.data.content.alias,
              })
            );
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const renderProjectCard = (lstTaskDeTail) => {
    if (lstTaskDeTail) {
      return lstTaskDeTail.map((taskDetail, index) => {
        return (
          <TaskCard
            key={taskDetail.taskId.toString() + index}
            taskDetail={taskDetail}
            index={index}
            handleEditTask={handleEditTask}
          />
        );
      });
    }
  };

  const renderProjectStatusCol = (project) => {
    return project?.lstTask?.map((taskDetailList, index) => {
        return (
          <ProjectTaskStatusCol
            index={index}
            key={taskDetailList.statusId.toString() + index}
            taskDetailList={taskDetailList}
            renderProjectCard={renderProjectCard}
          />
        );
      });
    
  };

  const renderProjectBoard = (project) => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="wrapper project__board flex items-stretch gap-5">
          {renderProjectStatusCol(project)}
        </div>
      </DragDropContext>
    );
  };
  return <>{renderProjectBoard(project)}</>;
};

export default DetailBoard;
