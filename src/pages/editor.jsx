import { useOutletContext } from "react-router-dom";
import * as Icons from 'lucide-react';
import { Button } from "../components/button";
import { CollapsibleTextBlock } from "../components/codeBlock";

export const MainEditor = () => {
    const file = useOutletContext();

    const codeBlocks = [
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
            sourceCode: `const bar = (c, d) => {
    // Unused variable 'e'
    let e = c + d;

    // Missing semicolon
    return c * d
}`,
            correctedCode: `const bar = (c, d) => {
    return c * d;
}`,
            codeError: "Unused variable and missing semicolon",
            text: `Missing semicolon at the end of the return statement. Remove the unused variable \`e\`. Ensure all statements are properly terminated with semicolons.`,
            startLineNumber: 8,
            errorLineNumbers: [9, 13],
            resources: [
                { text: 'MDN Web Docs: Semicolons', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/Empty_statement#automatic_semicolon_insertion' },
                { text: 'ESLint: no-unused-vars rule', url: 'https://eslint.org/docs/rules/no-unused-vars' }
            ]
        }
    ];

    return (
        <section className="w-full">
            <header className="h-[50px]">
                <div className="bg-white dark:bg-coal-main px-4 py-3 w-1/5 border-t-[2px] border-orange-main flex items-center justify-between">
                    <h1 className="text-sm">
                        {file}
                    </h1>
                    <Button size="xs" variant="none">
                        <Icons.X size={"16px"} />
                    </Button>
                </div>
            </header>
            <div className="overflow-y-scroll h-[calc(100%-50px)] pt-4 bg-white dark:bg-coal-main border-t-[1px] border-gray-semi dark:border-coal-light">
                {codeBlocks.map((block, index) => (
                    <CollapsibleTextBlock
                        key={index}
                        sourceCode={block.sourceCode}
                        correctedCode={block.correctedCode}
                        codeError={block.codeError}
                        text={block.text}
                        startLineNumber={block.startLineNumber}
                        errorLineNumbers={block.errorLineNumbers}
                        resources={block.resources}
                    />
                ))}
            </div>
        </section>
    );
};