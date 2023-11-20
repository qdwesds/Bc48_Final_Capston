import React from "react";
import ProjectForm from "../../../components/Form/ProjectForm";

const CreateProject = () => {
  return (
    <div className="createProject container h-full mx-auto px-4">
      <div className="mb-5">
        <h3 className="uppercase text-[#172B4D] text-2xl font-extrabold tracking-wide mb-3 relative">
          Add project-details
        </h3>
        <h6 className="text-base tracking-wider text-[#172B4D]/70 font-medium">
          You can change these details anytime in your project settings.
        </h6>
      </div>
      <div className="">
        <ProjectForm/>
      </div>
    </div>
  );
};

export default CreateProject;
