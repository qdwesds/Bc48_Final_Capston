import React from "react";
import EditTaskForm from "../../../../components/Form/Tasks/EditTaskForm";

const EditTask = ({ project, task }) => {
  return (
    <div className="min-w-full">
      <div className="form-body">
        <EditTaskForm
          layout="vertical"
          size="large"
          project={project}
          task={task}
          buttonText="Submit"
        />
      </div>
    </div>
  );
};

export default EditTask;
