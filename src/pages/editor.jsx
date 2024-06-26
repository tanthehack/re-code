import { Link, useNavigate, useOutletContext } from "react-router-dom";
import * as Icons from 'lucide-react';
import { Button } from "../components/button";
import { CollapsibleTextBlock } from "../components/codeBlock";

export const MainEditor = () => {
    const file = useOutletContext();
    const navigate = useNavigate();

    // const data = {
    //     totalErrors: file[-1]?.totalErrors,
    //     totalAccepted: totalAccepted ?? null,
    //     rules: []
    // }

    const handleNavigateSummary = () => {
        navigate(`/summary`, { state: data })
    }

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
                        sourceCode={block.code}
                        correctedCode={block.correctedCode}
                        violations={block.violations}
                        startLineNumber={block.startLineNumber}
                        errorLineNumbers={block.errorLineNumbers}
                    />
                ))}
            </div>
            <Button onClick={handleNavigateSummary} className="absolute right-4 bottom-4">
                Countinue to Summary
            </Button>
        </section>
    );
};