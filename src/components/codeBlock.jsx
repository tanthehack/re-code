import React, { useState } from 'react';
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import * as Icons from 'lucide-react';

const CodeBlock = ({ code, startLineNumber, errorLineNumbers }) => {
    const style = {
        background: 'transparent',
        fontSize: "13px",
        paddingTop: "0px",
        width: "300%",
    };

    const getLineProps = (lineNumber) => {
        let style = {
            display: 'flex',
        };

        if (errorLineNumbers?.includes(lineNumber)) {
            style.backgroundColor = '#FF4F1838'
        }
        return { style };
    };

    return (
        <SyntaxHighlighter
            language="javascript"
            style={atomOneDark}
            customStyle={style}
            showLineNumbers
            startingLineNumber={startLineNumber}
            wrapLongLines
            wrapLines
            lineProps={getLineProps}
        >
            {code}
        </SyntaxHighlighter>
    );
};

export const CollapsibleTextBlock = ({ sourceCode, correctedCode, codeError, text, startLineNumber, errorLineNumbers, resources }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <div className='flex justify-between'>
                <CodeBlock
                    code={sourceCode}
                    startLineNumber={startLineNumber}
                    errorLineNumbers={errorLineNumbers}
                />
                <button onClick={toggleExpand} className='text-gray-semi dark:text-gray-dark'>
                    {!expanded ? <Icons.ChevronLeft /> : <Icons.ChevronDown />}
                </button>
            </div>
            {expanded &&
                <span className='block space-y-4 p-4 text-sm bg-gray-main dark:bg-coal-dark border-l-[1px] border-l-orange-main'>
                    <h1 className='font-bold text-lg'>{codeError}</h1>
                    <p>{text}</p>
                    <div className=''>
                        <SyntaxHighlighter
                            language="javascript"
                            style={atomOneDark}
                            customStyle={{ background: 'transparent', fontSize: '13px' }}
                            wrapLongLines
                            wrapLines
                        >
                            {correctedCode}
                        </SyntaxHighlighter>
                    </div>

                    <span className='flex items-center gap-3'>
                        <Icons.SquareArrowOutUpRight size={"16px"} />
                        <ul>
                            {resources.map((resource, index) => (
                                <li key={index}>
                                    <a className='underline hover:text-orange-main' href={resource.url} target="_blank" rel="noopener noreferrer">
                                        {resource.text}
                                    </a>
                                </li>
                            ))}
                        </ul>

                    </span>
                </span>
            }
        </>
    );
};