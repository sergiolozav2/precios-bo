import { memo } from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { a11yLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

type CodeSectionType = {
  code: string;
  language?: string;
  filename?: string;
};
function CodeSection2(props: CodeSectionType) {
  return (
    <div className="max-w-[calc(100vw-80px)]">
      <div className="mx-4 w-full text-base flex flex-col">
        {props.filename && (
          <div className="px-3 bg-stone-200">{props.filename}</div>
        )}
        <SyntaxHighlighter
          language={props.language}
          style={a11yLight}
          customStyle={{
            backgroundColor: "rgb(240 240 240)",
            padding: "8px 12px",
          }}
        >
          {props.code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
// SyntaxHighlighter is rerendered unless
export const CodeSection = memo(CodeSection2);