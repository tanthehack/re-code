import { TriangleAlert } from "lucide-react"
export const Error = ({ title, children }) => {
    return (
        <div className="w-full h-full flex flex-col gap-6 items-center justify-center">
            <TriangleAlert size={"128px"} className="text-gray-semi dark:text-gray-dark" />
            <h1 className="text-2xl font-bold">{title}</h1>
            <div>
                {children}
            </div>
        </div>
    )
}