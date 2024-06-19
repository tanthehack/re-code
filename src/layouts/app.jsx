import { Outlet, useLocation } from "react-router-dom"
import logo from '../assets/images/logo.svg'
import { ThemeToggle } from "../components/themeToggle"
import * as Icons from 'lucide-react'
import { useState } from "react"

const App = () => {
    const location = useLocation();
    const repo = new URLSearchParams(location.search).get("repo");

    const files = [
        {
            id: 1,
            name: "script.js",
            codeBlocks: [
                {
                    sourceCode: `function script(a, b) {\nif (a = b) { // should use '===' instead of '='\nreturn true;
        } else {
            return false;
        }
    }`,
                    correctedCode: `function script(a, b) {
                        return a === b;
                    }`,
                    codeError: "Incorrect assignment operator in the if condition",
                    text: ` Use the equality operator (\`a === b\`) to compare values instead of the assignment operator. Also, simplify the return statement by directly returning the comparison result.`,
                    startLineNumber: 1,
                    errorLineNumbers: [2],
                    resources: [
                        { text: 'MDN Web Docs: Equality operators', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators' }
                    ]
                },
                {
                    sourceCode: `function foo(a, b) {
                        if (a = b) { // should use '===' instead of '='
                            return true;
                        } else {
                            return false;
                        }
                    }`,
                    correctedCode: `function foo(a, b) {
                        return a === b;
                    }`,
                    codeError: "Incorrect assignment operator in the if condition",
                    text: ` Use the equality operator (\`a === b\`) to compare values instead of the assignment operator. Also, simplify the return statement by directly returning the comparison result.`,
                    startLineNumber: 1,
                    errorLineNumbers: [2],
                    resources: [
                        { text: 'MDN Web Docs: Equality operators', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators' }
                    ]
                },
                {
                    sourceCode: `function foo(a, b) {
                        if (a = b) { // should use '===' instead of '='
                            return true;
                        } else {
                            return false;
                        }
                    }`,
                    correctedCode: `function foo(a, b) {
                        return a === b;
                    }`,
                    codeError: "Incorrect assignment operator in the if condition",
                    text: ` Use the equality operator (\`a === b\`) to compare values instead of the assignment operator. Also, simplify the return statement by directly returning the comparison result.`,
                    startLineNumber: 1,
                    errorLineNumbers: [2],
                    resources: [
                        { text: 'MDN Web Docs: Equality operators', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators' }
                    ]
                },

            ]
        },
        {
            id: 2,
            name: "hah.js",
            codeBlocks: [
                {
                    sourceCode: `function hah(a, b) {
                        if (a = b) { // should use '===' instead of '='
                            return true;
                        } else {
                            return false;
                        }
                    }`,
                    correctedCode: `function hah(a, b) {
                        return a === b;
                    }`,
                    codeError: "Incorrect assignment operator in the if condition",
                    text: ` Use the equality operator (\`a === b\`) to compare values instead of the assignment operator. Also, simplify the return statement by directly returning the comparison result.`,
                    startLineNumber: 1,
                    errorLineNumbers: [2],
                    resources: [
                        { text: 'MDN Web Docs: Equality operators', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators' }
                    ]
                },
                {
                    sourceCode: `function foo(a, b) {
                        if (a = b) { // should use '===' instead of '='
                            return true;
                        } else {
                            return false;
                        }
                    }`,
                    correctedCode: `function foo(a, b) {
                        return a === b;
                    }`,
                    codeError: "Incorrect assignment operator in the if condition",
                    text: ` Use the equality operator (\`a === b\`) to compare values instead of the assignment operator. Also, simplify the return statement by directly returning the comparison result.`,
                    startLineNumber: 1,
                    errorLineNumbers: [2],
                    resources: [
                        { text: 'MDN Web Docs: Equality operators', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators' }
                    ]
                },
                {
                    sourceCode: `function foo(a, b) {
                        if (a = b) { // should use '===' instead of '='
                            return true;
                        } else {
                            return false;
                        }
                    }`,
                    correctedCode: `function foo(a, b) {
                        return a === b;
                    }`,
                    codeError: "Incorrect assignment operator in the if condition",
                    text: ` Use the equality operator (\`a === b\`) to compare values instead of the assignment operator. Also, simplify the return statement by directly returning the comparison result.`,
                    startLineNumber: 1,
                    errorLineNumbers: [2],
                    resources: [
                        { text: 'MDN Web Docs: Equality operators', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators' }
                    ]
                },

            ]
        },
        {
            id: 3,
            name: "lol.js"
        },
    ]

    const [menuIsOpen, setMenuIsOpen] = useState(true)
    const [editorFile, setEditorFile] = useState(files[0])

    const handleShowMenu = () => {
        setMenuIsOpen(prev => !prev)
    }

    const handleSelectFile = (file) => {
        setEditorFile(file)
    }

    return (
        <main className="relative h-dvh font-main dark:bg-coal-dark bg-gray-main dark:text-white text-coal-main">
            <header className="h-[80px] py-4 px-8 flex justify-between items-center border-b-[1px] border-gray-semi dark:border-coal-light">
                <img src={logo} alt="Re-code logo in orange" className="w-20" />
                <h1 className="font-semibold">{repo}</h1>
            </header>
            <div className="flex h-[calc(100%-80px)]">
                <nav className="flex">
                    <section className="flex flex-col h-full justify-between items-center border-r-[1px] border-gray-semi dark:border-coal-light py-3">
                        <button className={`${menuIsOpen ? "border-l-orange-main" : "border-l-white dark:border-l-coal-main"} w-full px-4 py-2 border-l-[3px]`} onClick={handleShowMenu}>
                            <Icons.Folder />
                        </button>
                        <ThemeToggle classNames="rounded-full" />
                    </section>
                    {menuIsOpen ?
                        <section className="w-[200px] h-full p-4 space-y-3 border-r-[1px] border-gray-semi dark:border-coal-light">
                            <h1 className="font-semibold">{repo}</h1>
                            <div className="flex flex-col items-start">
                                {files.map(file => (
                                    <button key={file.id}
                                        onClick={() => handleSelectFile(file)}
                                        className={`${file.name == editorFile.name ? "text-orange-main bg-orange-light" : null} text-sm text-gray-dark 
                                    dark:hover:bg-coal-main dark:hover:text-white hover:bg-gray-semi hover:text-coal-main w-full text-left py-1 px-2 rounded-sm`}>
                                        {file.name}
                                    </button>
                                ))}
                            </div>
                        </section>
                        : null}
                </nav>
                <Outlet context={editorFile} />
            </div>
        </main>
    )
}

export default App;