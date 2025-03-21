import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  
  return (
    <div>
      <h3>코드를 입력하세요:</h3>
      <CodeMirror
        value={code}
        extensions={[javascript()]} // JavaScript 문법 적용
        onChange={(value) => setCode(value)}
        theme={dracula} // 다크 테마 적용
        height="300px"
      />
      <pre>입력된 코드: {code}</pre>
    </div>
  );
};

export default CodeEditor;
