import { Link, useOutletContext } from "react-router-dom";
import * as Icons from 'lucide-react';
import { Button } from "../components/button";
import { CollapsibleTextBlock } from "../components/codeBlock";

export const MainEditor = () => {
    const file = useOutletContext();
    console.log(file)

    return (
        <section className="w-full relative">
            <header className="h-[50px]">
                <div className="bg-white dark:bg-coal-main px-4 py-3 w-1/5 border-t-[2px] border-orange-main flex items-center justify-between">
                    <h1 className="text-sm">
                        {file.name}
                    </h1>
                    <Button size="xs" variant="none">
                        <Icons.X size={"16px"} />
                    </Button>
                </div>
            </header>
            <div className="overflow-y-scroll h-[calc(100%-50px)] w-full pt-4 bg-white dark:bg-coal-main border-t-[1px] border-gray-semi dark:border-coal-light">
                {file?.codeBlocks?.map((block, index) => (
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
            <Button asChild className="absolute right-4 bottom-4">
                <Link to="/summary">
                    Countinue to Summary
                </Link>
            </Button>
        </section>
    );
};