import { toast } from "react-toastify";

const toastify = (type, content) => {
  console.log(type);
  console.log(content);
  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    pauseOnFocusLoss: false,
  };

  switch (type) {
    case "error":
      return toast.error(content, { ...toastOptions });
    case "warn":
      return toast.warn(content, { ...toastOptions });
    case "success":
      return toast.success(content, { ...toastOptions });
    case "info":
      return toast.info(content, { ...toastOptions });
    default:
      return toast(content, { ...toastOptions });
  }
};

export default toastify
