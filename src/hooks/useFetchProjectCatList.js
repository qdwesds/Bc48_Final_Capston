import { useEffect } from "react";
import { projectServ } from "../services/projectServ";
import { AppDispatch } from "../redux/configureStore";
import { getAllProjectCategory } from "../redux/Slice/projectCategorySlice";

export const useFetchProjectCatList = () => {
    useEffect(() => {
      projectServ.getAllProjectCategory()
        .then((res) => {
          AppDispatch(getAllProjectCategory(res.data.content));
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  };