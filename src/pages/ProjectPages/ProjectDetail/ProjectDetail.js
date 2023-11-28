import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { putProjectDetail } from "../../../redux/Slice/projectSlice";
import { projectServ } from "../../../services/projectServ";
import {
  setLoadingEnd,
  setLoadingStart,
} from "../../../redux/Slice/loadingSlice";
import DetailHeader from "./DetailHeader";
import DetailBoard from "./DetailBoard";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoadingStart());
    projectServ
      .getDetails(projectId)
      .then((res) => {
        // console.log(res);
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
        setTimeout(() => {
          dispatch(setLoadingEnd());
        }, 1000);
      })
      .catch((err) => {
        setTimeout(() => {
          dispatch(setLoadingEnd());
        }, 1000);
        console.log(err);
      });
  }, []);

  const { project } = useSelector((state) => state.projectSlice);

  const pageContent = () => {
    if (project) {
      return (
        <>
          <DetailHeader project={project} />
          <DetailBoard project={project}/>
        </>
      );
    }
  };

  return (
    <div className="container mx-auto px-4 project-detail-page h-full">
      <div className="page-header">{/* breadcrumb */}</div>
      <div className="py-10">
        <h3 className="uppercase text-[#172B4D] text-2xl font-extrabold tracking-wide mb-5">{project?.projectName}</h3>
        {pageContent()}
      </div>
    </div>
  );
};

export default ProjectDetail;
