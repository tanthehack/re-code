import gh from "../assets/icons/github.svg"
import up from "../assets/icons/upload.svg"
import or from "../assets/icons/or.svg"
import { CodeCard } from "../components/card"

export const ImportCode = () => {
    return (
        <div className="flex flex-col items-center mt-20 gap-12 h-full">
            <div className="flex flex-col gap-3">
                <h1 className="text-6xl font-bold">Import Code</h1>
                <p>Select an option below to inport <br /> your code into re-code_</p>
            </div>
            <div className="flex flex-col gap-11">
                <CodeCard title="Connect GitHub Your Account" content="Link your GitHub account to have access to your code!" icon={gh} url="/gitauth" />
                <img src={or} alt="or" />
                <CodeCard title="Upload your code manually" content="Upload your Javascript files manually into the application." icon={up} url="/manual" />
            </div>
        </div>
    )
}