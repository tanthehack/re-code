import { Button } from "../components/button"
import { Link, useNavigate } from "react-router-dom"

export const Landing = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-12 h-full">
            <div className="flex flex-col gap-8">
                <h1 className="text-8xl font-bold">Intelligent <br /> <span className="text-orange-main">Code</span> Reviews_</h1>
                <p>
                    &gt; echo “write cleaner and better code with the help” <br />
                    &gt; echo “of AI powered recommendations.” <br />
                    &gt; echo “Programming can never be hard for you again!”
                </p>
            </div>
            <div>
                <Button asChild>
                    <Link to="import">
                        Get Started_
                    </Link>
                </Button>
            </div>
        </div>
    )
}