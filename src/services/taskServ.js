import { setLoadingEnd, setLoadingStart } from "../redux/Slice/loadingSlice";
import { putProjectDetail } from "../redux/Slice/projectSlice";
import { updateTask } from "../redux/Slice/taskSlice";
import { AppDispatch } from "../redux/configureStore";
import https from "./config";
import { projectServ } from "./projectServ";

let updateRedux = async (task) => {
  AppDispatch(updateTask(task));
};

let updateProjectDetails = async (task) => {
  AppDispatch(projectServ.getDetailsThunk(task.projectId));
};

export const taskServ = {
  getAllTaskType: async () => {
    return await https.get(`/api/TaskType/getAll`);
  },
  getAllTaskStatus: async () => {
    return await https.get(`/api/Status/getAll`);
  },
  getAllTaskPriority: async () => {
    return await https.get(`/api/Priority/getAll`);
  },
  // createTask
  createTask: async (taskValues) => {
    return https.post(`/api/Project/createTask`, taskValues);
  },
  // getTaskDetail
  getTaskDetail: async (taskId) => {
    return https.get(`/api/Project/getTaskDetail?taskId=${taskId}`);
  },
  // delete task
  deleteTask: async (taskId) => {
    return https.delete(`/api/Project/removeTask?taskId=${taskId}`);
  },
  updateTaskStatus: async ({ taskId, statusId }) => {
    return await https.put(`/api/Project/updateStatus`, { taskId, statusId });
  },
  updateTaskThunk: async (task) => {
    return await https
      .post(`/api/Project/updateTask`, task)
      .then((res) => {
        (async () => {
          await updateRedux(task);
          await updateProjectDetails(task);
        })();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  deleteTaskThunk: async (task) => {
    AppDispatch(setLoadingStart());
    return await https
      .delete(`/api/Project/removeTask?taskId=${task.taskId}`)
      .then((res) => {
        projectServ
          .getDetails(task.projectId)
          .then((res) => {
            let resContent = res.data.content;
            resContent = {
              ...resContent,
              categoryName: resContent.projectCategory.name,
            };
            AppDispatch(putProjectDetail(resContent));
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setTimeout(() => {
              AppDispatch(setLoadingEnd());
            }, 1000);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
