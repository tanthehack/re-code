import { Outlet } from "react-router-dom"
import bgLight from '../assets/images/homeBg1.svg'
import bgDark from '../assets/images/homeBg2.svg'

import grdLight from '../assets/images/bgGrad1.svg'
import grdDark from '../assets/images/bgGrad2.svg'

import logo from '../assets/images/logo.svg'

export const Home = () => {
    return (
        <main className="relative h-dvh font-main dark:bg-coal-main bg-gray-main dark:text-white text-coal-main">
            <img src={bgLight} alt="background elements showing an @ symbol and *c symbol" className="absolute h-full w-full dark:hidden" />
            <img src={bgDark} alt="background elements showing an @ symbol and *c symbol" className="dark:absolute dark:block h-full w-full hidden" />
            <img src={grdLight} alt="an orange gradient" className="absolute h-full w-full dark:hidden z-[0]" />
            <img src={grdDark} alt="an orange gradient" className="dark:absolute dark:block h-full w-full hidden z-[0]" />
            <div className="w-full flex justify-center pt-8">
                <img src={logo} alt="Re-code logo in orange" />
            </div>
            <div className="z-[1] w-full">
                <Outlet />
            </div>
        </main>
    )
} 