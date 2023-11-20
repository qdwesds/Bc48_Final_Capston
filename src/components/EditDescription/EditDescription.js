import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditDescription = ({ handleEditorChange }) => {
  return (
    <Editor
      init={{
        height: 350,
        selector: "textarea",
        menubar: "",
        plugIns: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
        ],
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default EditDescription;
