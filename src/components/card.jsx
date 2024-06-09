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

export const RepoCard = ({ name, language, date, status, onClick }) => {
    const formattedDate = `${Intl.DateTimeFormat('en', { month: 'short' }).format(new Date(date))}, ${new Date(date).getFullYear()}`
    return (
        <>
            <button onClick={onClick} className="w-full flex justify-between p-4 rounded-xl
        hover:bg-orange-light dark:hover:bg-coal-light
        "
            >
                <span className="flex flex-col items-start">
                    <h1 className="font-bold">{name}</h1>
                    <h1 className="text-xs">
                        {language}
                    </h1>
                </span>
                <span className="flex items-center gap-2">
                    <h1 className="text-xs font-bold">{formattedDate}</h1>
                    <span className="p-2 bg-orange-main text-white rounded-xl text-xs">
                        {status}
                    </span>
                </span>
            </button>
            <hr className="h-[1px] w-full text-gray-semi dark:text-gray-dark rounded-full" />
        </>
    )
}