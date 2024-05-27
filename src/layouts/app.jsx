import { Outlet } from "react-router-dom"

const App = () => {
    return (
        <main className="font-main">
            <Outlet />
        </main>
    )
}

export default App;