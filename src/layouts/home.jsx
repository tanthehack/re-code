import { Outlet } from "react-router-dom"

export const Home = () => {
    return (
        <main className="h-dvh font-main dark:bg-coal-main bg-gray-main dark:text-white text-coal-main">
            <Outlet />
        </main>
    )
} 