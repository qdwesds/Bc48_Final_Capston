import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { taskServ } from "../../services/taskServ";
import axios from "axios";
import { message } from "antd";
import { userServ } from "../../services/userServ";
import { AppDispatch } from "../configureStore";
import thunk from "redux-thunk";

const initialState = {
  taskTypeList: [
    {
      id: 1,
      taskType: "bug",
    },
  ],
  taskPriorityList: [
    {
      priorityId: 1,
      priority: "High",
      description: "High",
      deleted: false,
      alias: "High",
    },
  ],
  taskStatusList: [
    {
      statusId: "1",
      statusName: "BACKLOG",
      alias: "tồn đọng",
      deleted: "False",
    },
  ],
  taskUserList: [],
  taskDetail: undefined,
};

const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    updateTask: (state, action) => {
      let currentTask = action.payload;
      state.taskDetail = currentTask;
    },
  },
  extraReducers: (builder) => {
    // add case for tasktypeThunk
    builder.addCase(getTaskTypeThunk.fulfilled, (state, action) => {
      state.taskTypeList = action.payload;
    });
    builder.addCase(getTaskTypeThunk.rejected, (state, action) => {
      state.taskTypeList = [
        {
          id: 1,
          taskType: "bug",
        },
      ];
    });
    // add case for taskPriorityThunk
    builder.addCase(getTaskPriorityThunk.fulfilled, (state, action) => {
      state.taskPriorityList = action.payload;
    });
    builder.addCase(getTaskPriorityThunk.rejected, (state, action) => {
      state.taskPriorityList = [
        {
          priorityId: 1,
          priority: "High",
          description: "High",
          deleted: false,
          alias: "High",
        },
      ];
    });

    // add case for taskStatusThunk
    builder.addCase(getTaskStatusThunk.fulfilled, (state, action) => {
      state.taskStatusList = action.payload;
    });
    builder.addCase(getTaskStatusThunk.rejected, (state, action) => {
      state.taskStatusList = [
        {
          statusId: "1",
          statusName: "BACKLOG",
          alias: "tồn đọng",
          deleted: "False",
        },
      ];
    });

    // add case for taskUsersThunk
    builder.addCase(getTaskUsersThunk.fulfilled, (state, action) => {
      state.taskUserList = action.payload;
    });
    builder.addCase(getTaskUsersThunk.rejected, (state, action) => {
      console.log(action);
      state.taskUserList = [];
    });

    // add case for taskDetail
    builder.addCase(getTaskDetailThunk.fulfilled, (state, action) => {
      let currentTask = action.payload;
      if (currentTask.priorityId === 0) {
        currentTask.priorityId = currentTask.priorityTask.priorityId;
      }

      if (currentTask.typeId === 0) {
        currentTask.typeId = currentTask.taskTypeDetail.id;
      }
      state.taskDetail = currentTask;
    });
    builder.addCase(getTaskDetailThunk.rejected, (state, action) => {
      console.log("payload trong reject taskDetail");
      console.log(action);
      state.taskDetail = undefined;
    });
  },
});

export const { updateTask } = taskSlice.actions;

export default taskSlice.reducer;

// Thunk
export const getTaskTypeThunk = createAsyncThunk(
  "taskSlice/getTaskType",
  (_, thunkAPI) => {
    let promiseData = taskServ
      .getAllTaskType()
      .then((res) => {
        console.log(res);
        return res.data.content;
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log(error);
          console.log("error message: ", error.message);
        } else {
          console.log("unexpected error: ", error);
        }
        return thunkAPI.rejectWithValue(message);
      });
    return promiseData;
  }
);

export const getTaskPriorityThunk = createAsyncThunk(
  "taskSlice/getTaskPriority",
  (_, thunkAPI) => {
    let promiseData = taskServ
      .getAllTaskPriority()
      .then((res) => {
        console.log(res);
        return res.data.content;
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
        } else {
          console.log("unexpected error: ", error);
        }
        return thunkAPI.rejectWithValue(message);
      });

    return promiseData;
  }
);

export const getTaskStatusThunk = createAsyncThunk(
  "taskSlice/getTaskStatus",
  (_, thunkAPI) => {
    let promiseData = taskServ
      .getAllTaskStatus()
      .then((res) => {
        console.log(res);
        return res.data.content;
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
        } else {
          console.log("unexpected error: ", error);
        }
        return thunkAPI.rejectWithValue(message);
      });

    return promiseData;
  }
);

export const getTaskUsersThunk = createAsyncThunk(
  "taskSlice/getTaskUsers",
  (id, thunkAPI) => {
    let promiseData = userServ
      .getUserByProjectId(id)
      .then((res) => {
        console.log(res);
        return res.data.content;
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          if (error.response) {
            console.log("error detail: ", error.response.data.content);
          }
        } else {
          console.log("unexpected error: ", error);
        }
        return thunkAPI.rejectWithValue(
          `${error.message} - ${error.response.data.content}`
        );
      });

    return promiseData;
  }
);

export const getTaskDetailThunk = createAsyncThunk(
  "taskSlice/getTaskDetail",
  (id, thunkAPI) => {
    let promiseData = taskServ
      .getTaskDetail(id)
      .then((res) => {
        return res.data.content;
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
        } else {
          console.log("unexpected error: ", error);
        }
        return thunkAPI.rejectWithValue(message);
      });

    return promiseData;
  }
);

export const getAllInfoThunk = () => async (dispatch) => {
  try {
    await Promise.all([
      dispatch(getTaskTypeThunk()),
      dispatch(getTaskPriorityThunk()),
      dispatch(getTaskStatusThunk()),
    ]);
  } catch (error) {
    console.log(error);
  }
};
