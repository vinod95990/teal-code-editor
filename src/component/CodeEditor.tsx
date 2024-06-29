
import { Highlight, themes, PrismTheme } from "prism-react-renderer";
import { useRef, useState } from "react";
import './CodeEditor.css'

const themesSet = Object.keys(themes) as Array<keyof typeof themes>;

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState('');
  const [theme, setTheme] = useState<PrismTheme>(themes[themesSet[0]]);
  const preRef = useRef<HTMLPreElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const element = e.target as HTMLTextAreaElement;
    if (preRef.current) {
      preRef.current.scrollTop = element.scrollTop;
      preRef.current.scrollLeft = element.scrollLeft;
    }
  };

  return (
    <div className="code-editor">

      <div className="editor-title">
        <h1>tealfeed - code editor</h1>

        <a className="socials" href="https://github.com/vinod95990/teal-code-editor" target="_blank">Github</a>

        <select className="theme-dropdown" onChange={(e) => setTheme(themes[e.target.value as keyof typeof themes])}
        >
          {
            themesSet.map((data: any) => {
              return <option value={data}>{data}</option>
            })
          }

        </select>
      </div>

      <div className="code-area">
        <textarea value={code} onChange={(e) => { setCode(e.target.value) }} className="code-input" onScroll={handleScroll}
          placeholder="Type your code here..."
        ></textarea>
        <Highlight
          theme={theme}
          code={code}
          language="javascript"
        >

          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre style={style} className={className} ref={preRef}>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>

          )}
        </Highlight>
      </div>
    </div >);
};

export default CodeEditor;
