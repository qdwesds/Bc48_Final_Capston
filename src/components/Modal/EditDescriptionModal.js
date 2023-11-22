import { Editor } from "@tinymce/tinymce-react";
import React from "react";

const EditDescriptionModal = ({ handleEditorChange, project }) => {
  return (
    <Editor
      initialValue={project.description}
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

export default EditDescriptionModal;
