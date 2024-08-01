import { useLocation } from "react-router-dom";
import { Button } from "../components/button";
import * as Icon from "lucide-react";

export const Summary = () => {
    const { data } = useLocation();
    console.log(data)
    const handleDownloadReview = () => {

    }
    return (
        <section className="w-full h-[calc(100vh-30px)] flex justify-center items-center px-32 py-24">
            <div className="dark:bg-coal-main dark:text-white border-[1px] border-gray-semi space-y-4 dark:border-orange-light bg-white text-coal-main shadow-md h-full w-full rounded-xl px-16 py-10 scroll-auto">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Review Summary_</h1>
                    <hr className="h-[2px] rounded-full text-gray-main dark:text-coal-light" />
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4 border-[2px] dark:border-coal-light border-gray-main px-4 py-3 rounded-[12px] w-fit">
                        <span className="bg-gray-main dark:bg-coal-dark p-4 rounded-lg">
                            <Icon.AlertCircleIcon size={42} className="text-orange-main" />
                        </span>
                        <div>
                            <span className="text-sm font-semibold">Total Errors</span>
                            <h1 className="text-5xl font-bold">34</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 border-[2px] dark:border-coal-light border-gray-main px-4 py-3 rounded-[12px] w-fit">
                        <span className="bg-gray-main dark:bg-coal-dark p-4 rounded-lg">
                            <Icon.CheckSquare2 size={42} className="text-green" />
                        </span>
                        <div>
                            <span className="text-sm font-semibold">Accepted Suggestions</span>
                            <h1 className="text-5xl font-bold">1</h1>
                        </div>
                    </div>
                </div>

                <div className="relative overflow-x-auto shadow-sm bg-white dark:bg-coal-main border-solid border-[2px] dark:border-coal-light border-gray-main rounded-[12px]">
                    <table className="table-auto w-full text-left">
                        <thead className="border-b-[2px] dark:text-gray-dark text-coal-light dark:bg-coal-dark bg-gray-main border-gray-main dark:border-coal-light">
                            <tr>
                                <th className="p-2 dark:border-coal-light border-gray-semi border-r-[1px]">Rule Violations</th>
                                <th className="p-2  dark:border-coal-light border-gray-semi border-r-[1px]">Found Issues</th>
                                <th className="p-2">Accepted Suggestions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TableData
                                ruleId="Unused Variable"
                                issues="20"
                                accepted="1"
                            />
                            <TableData
                                ruleId="No Console"
                                issues="14"
                                accepted="0"
                            />
                        </tbody>
                    </table>
                </div>

                <Button onClick={handleDownloadReview}>
                    Download Reviewed Code
                </Button>
            </div>
        </section>
    )
}

const TableData = ({ ruleId, issues, accepted }) => {
    return (
        <tr className="border-b-[1px] dark:border-coal-light border-gray-main">
            <td className="p-2">{ruleId}</td>
            <td className="p-2">{issues}</td>
            <td className="p-2">{accepted}</td>
        </tr>
    )
}