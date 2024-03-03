import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const CodeSnippetEditor: React.FC = () => {
  return (
    <>
      <Editor
        apiKey="k1u3ltmn8ydlw7do8q51quscj02xqm6pbvu08pcm5jnlklnf"
        init={{
          height: 250,
          skin: "oxide-dark",
          content_css: "dark",
          content_style: `
            body { 
              font-family: Roboto, sans-serif; 
              font-size: 14px; 
              color: #ADB3CC; 
              background-color: #1d2032; 
            }
            body::-webkit-scrollbar {
              display: none;
            }
            pre, code 
            font-family: "Roboto, sans-serif"
            background-color: #282c34; /* Dark background for code */
            color: #abb2bf; /* Light text color for code */
            border-radius: 4px;
            padding: 5px;
          }
          `,
          menu: {
            code: { title: "Code", items: "codesample" },
            preview: { title: "Preview", items: "preview" },
          },
          plugins: ["code", "codesample", "preview", "paste"],
          menubar: "code preview",
          toolbar: "",
        }}
        initialValue="Paste your code here..."
      />
    </>
  );
};

export default CodeSnippetEditor;
