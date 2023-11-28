import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditDescription = ({ formInstance }) => {
  const [value, setValue] = useState("");
  const editorRef = useRef(null);
  const handleEditorChange = (newValue, editor) => {
    formInstance?.setFieldValue("description", newValue);
    setValue(newValue);
  };
  return (
    <Editor
      value={formInstance?.getFieldValue("description")}
      onInit={(evt, editor) => (editorRef.current = editor)}
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
