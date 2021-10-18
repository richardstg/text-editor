import React, { useState, useContext } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AuthContext } from "../../context/authcontext";
import { saveAs } from "file-saver";
import SwitchButton from "../shared/switchbutton/switchbutton";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const AddText = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [codeMode, setCodeMode] = useState(false);
  const [output, setOutput] = useState("");
  const { setTexts } = props;
  const context = useContext(AuthContext);

  const toggle = () => {
    setCodeMode(!codeMode);
  };

  const saveHandler = async (event) => {
    event.preventDefault();
    setError(null);
    props.setTextsError(null);
    setLoading(true);
    setOutput("");
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + context.token,
        },
        body: JSON.stringify({ name, content, code: codeMode }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      setTexts((state) => {
        if (state.length > 0) {
          return [data, ...state];
        }
        return [data];
      });
      setName("");
      setContent("");
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const createPdfHandler = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/create-pdf`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + context.token,
          },
          body: JSON.stringify({ name, content }),
        }
      );

      const data = await response.blob();

      if (!response.ok) {
        throw new Error(data.message);
      }
      const pdfBlob = new Blob([data], { type: "application/pdf" });

      saveAs(pdfBlob, "text.pdf");
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const executeCodeHandler = async () => {
    setError(null);
    setOutput("");
    setLoading(true);

    try {
      const response = await fetch("https://execjs.emilfolino.se/code", {
        body: JSON.stringify({
          code: btoa(content),
          // code: Buffer.from(content, "base64"),
          // code: btoa('console.log("hej");'),
        }),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }
      let decodedOutput = atob(result.data);

      setOutput(decodedOutput);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <SwitchButton toggle={toggle} on={codeMode} />
      <input
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter the title..."
        value={name}
        className="mt-3 mb-3 w-100 p-2"
      />
      {codeMode ? (
        <CodeMirror
          value={content}
          height="200px"
          extensions={[javascript({ jsx: true })]}
          onChange={(value, viewUpdate) => {
            setContent(value);
          }}
        />
      ) : (
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onReady={(editor) => {}}
          onChange={(event, editor) => {
            setContent(editor.getData());
          }}
        />
      )}
      <button
        className="btn btn-success mt-3 mb-3"
        type="submit"
        onClick={saveHandler}
      >
        Save
      </button>
      <button
        className="btn btn-outline-success mb-3 d-block"
        type="submit"
        onClick={codeMode ? executeCodeHandler : createPdfHandler}
      >
        {codeMode ? "Run" : "Print PDF"}
      </button>
      <div>
        {codeMode && output && (
          <>
            <h6>Output</h6>
            <p className="mb-3">{output}</p>
          </>
        )}
      </div>
      {loading && (
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {error && <p className="text-danger mt-1 mb-3">{error}</p>}
    </>
  );
};

export default AddText;
