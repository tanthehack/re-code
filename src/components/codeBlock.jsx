import React, { useState } from 'react';
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import * as Icons from 'lucide-react';

const theme = localStorage.theme;

const CodeBlock = ({ code, startLineNumber, errorLineNumbers, onErrorLineClick }) => {
    const [hoveredLine, setHoveredLine] = useState(null);

    const style = {
        background: 'transparent',
        fontSize: "13px",
        paddingTop: "0px",
        width: "300%"
    };

    const getLineProps = (lineNumber) => {
        let lineStyle = {
            display: 'flex',
            backgroundColor: 'transparent',
            cursor: 'default',
        };

        if (errorLineNumbers?.includes(lineNumber)) {
            lineStyle.backgroundColor = hoveredLine === lineNumber ? '#FF4F1859' : '#FF4F1838';
            lineStyle.cursor = 'pointer';
        }

        return {
            style: lineStyle,
            onClick: errorLineNumbers?.includes(lineNumber) ? () => onErrorLineClick(lineNumber) : undefined,
            onMouseEnter: errorLineNumbers?.includes(lineNumber) ? () => setHoveredLine(lineNumber) : undefined,
            onMouseLeave: errorLineNumbers?.includes(lineNumber) ? () => setHoveredLine(null) : undefined,
        };
    };

    return (
        <SyntaxHighlighter
            language="javascript"
            style={theme === 'dark' ? atomOneDark : atomOneLight}
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

export const CollapsibleTextBlock = ({ sourceCode, correctedCode, violations, startLineNumber, errorLineNumbers }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <div className='flex justify-between group'>
                <CodeBlock
                    code={sourceCode}
                    startLineNumber={startLineNumber}
                    errorLineNumbers={errorLineNumbers}
                    onErrorLineClick={toggleExpand}
                />
                <button onClick={toggleExpand} className='text-coal-black px-3 group-hover:text-orange-main dark:text-gray-dark'>
                    {!expanded ? <Icons.ChevronLeft /> : <Icons.ChevronDown />}
                </button>
            </div>
            {expanded &&
                <span className='block space-y-4 p-4 text-sm bg-gray-main dark:bg-coal-dark border-l-[1px] border-l-orange-main'>
                    {
                        violations.map((violation, index) => (
                            <div key={index}>
                                <h1 className='font-bold text-lg text-red-500'>{violation.violation}</h1>
                                <p>{violation.suggestion}</p>
                            </div>
                        ))
                    }
                    {correctedCode && correctedCode.length > 0 && (
                        <div className='border-[1px] border-orange-main dark:border-orange-light rounded-lg p-2'>
                            <h1 className='font-bold text-lg'>Possible Fix:</h1>
                            <SyntaxHighlighter
                                language="javascript"
                                style={theme === 'dark' ? atomOneDark : atomOneLight}
                                customStyle={{ background: 'transparent', fontSize: '13px' }}
                                wrapLongLines
                                wrapLines
                            >
                                {correctedCode.join('\n')}
                            </SyntaxHighlighter>
                        </div>
                    )}
                </span>
            }
        </>
    );
};
