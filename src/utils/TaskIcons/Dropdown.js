import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { BsCheckSquareFill, BsExclamationSquareFill } from "react-icons/bs";

import { TASK_TYPE, TASK_PRIORITY, TASK_STATUS } from "./../../Constant/const";

export const DropwDownIcons = {
  taskType: {
    [TASK_TYPE.BUG]: <BsExclamationSquareFill color="#e44d42" />,
    [TASK_TYPE.NEW]: <BsCheckSquareFill color="#4fade6" />,
  },
  status: {
    [TASK_STATUS.HIGH]: <ArrowUpOutlined className="h-full w-full block" />,
    [TASK_STATUS.MEDIUM]: <ArrowUpOutlined />,
    [TASK_STATUS.LOW]: <ArrowDownOutlined />,
    [TASK_STATUS.LOWEST]: <ArrowDownOutlined />,
  },

  priority: {
    [TASK_PRIORITY.BACKLOG]: <BsExclamationSquareFill />,
    [TASK_PRIORITY.SELECTED]: <BsCheckSquareFill />,
    [TASK_PRIORITY.INPROGRESS]: <BsCheckSquareFill />,
    [TASK_PRIORITY.DONE]: <BsCheckSquareFill />,
  },
};
