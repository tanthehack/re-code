import { Outlet, useLocation, useNavigate } from "react-router-dom"
import bgLight from '../assets/images/homeBg1.svg'
import bgDark from '../assets/images/homeBg2.svg'

import grdLight from '../assets/images/bgGrad1.svg'
import grdDark from '../assets/images/bgGrad2.svg'

import logo from '../assets/images/logo.svg'
import { Button } from "../components/button"
import * as Icon from "lucide-react"

export const Home = () => {
    const location = useLocation()
    const navigate = useNavigate()
    return (
        <main className="relative overflow-hidden h-dvh font-main dark:bg-coal-main bg-gray-main dark:text-white text-coal-main">
            <img src={bgLight} alt="background elements showing an @ symbol and *c symbol" className="absolute h-full w-full dark:hidden" />
            <img src={bgDark} alt="background elements showing an @ symbol and *c symbol" className="dark:absolute dark:block h-full w-full hidden" />
            <img src={grdLight} alt="an orange gradient" className="absolute h-full w-full dark:hidden z-[1]" />
            <img src={grdDark} alt="an orange gradient" className="dark:absolute dark:block h-full w-full hidden z-[1]" />
            <div className="relative w-full grid grid-cols-3 px-8 place-items-center h-[50px] mt-8 z-[10]">
                {location.pathname != "/" && location.pathname != "/gitauth" ?
                    <Button
                        size="icon"
                        className="place-self-start"
                        onClick={() => navigate(-1)}
                    >
                        <Icon.ChevronLeftIcon />
                    </Button> : null
                }
                <img src={logo} alt="Re-code logo in orange" className="col-start-2" />
                <div></div>
            </div>
            <section className="relative h-[calc(100dvh-82px)] z-[10] w-full">
                <Outlet />
            </section>
        </main>
    )
} 