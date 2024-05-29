import gh from "../assets/icons/github.svg"
import logo from "../assets/images/logo.svg"
import line from "../assets/icons/line.svg"
import * as Icon from "lucide-react"
import { Button } from "../components/button"
import { Link } from "react-router-dom"

export const GitAuth = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-12 h-full">
            <div className="flex flex-col items-center gap-8 p-8 dark:bg-coal-main dark:text-white border-[1px] border-gray-semi dark:border-orange-light bg-white text-coal-main shadow-md rounded-[12px] w-[464px]">
                <div className="flex gap-3 items-center">
                    <img src={gh} alt="Github icon" />
                    <Icon.Link className="w-3" />
                    <img src={logo} alt="Github icon" width="76px" />
                </div>
                <h1 className="text-2xl">Get your repos_</h1>
                <hr className="h-[2px] w-full border-gray-semi rounded-full" />
                <div className="flex flex-col gap-3">
                    <h2 className="text-lg font-bold">Re-code intends to:</h2>
                    <div className="flex gap-4">
                        <Icon.FolderGit2 className="w-6" />
                        <p>View and download private and public repos</p>
                    </div>
                </div>
                <Button asChild className="w-full">
                    <Link to="import">
                        Authorize Re-Code_
                    </Link>
                </Button>
            </div>
        </div>
    )
}