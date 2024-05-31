import { Link } from "react-router-dom"

export const CodeCard = ({ title, content, icon, url }) => {
    return (
        <Link className="flex gap-4 p-4 dark:bg-coal-main dark:text-white border-[1px] border-gray-semi dark:border-orange-light bg-white text-coal-main shadow-md rounded-[12px]
        max-w-[600px] hover:border-orange-main hover:cursor-pointer transition duration-200 ease-in-out"
            to={url}
        >
            <img src={icon} alt="Github icon" />
            <div className="flex w-[70%] flex-col gap-2">
                <h1 className="text-lg font-bold">
                    {title}
                </h1>
                <p className="">{content}</p>
            </div>
        </Link>
    )
}