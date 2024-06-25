import { useState } from "react"
import * as Icon from 'lucide-react'
import { Button } from "./button";

export const ThemeToggle = ({ classNames }) => {
    const [currentTheme, setCurrentTheme] = useState('dark');

    const handleThemeSwitch = () => {
        // if set via local storage previously
        if (localStorage.getItem('theme')) {
            if (localStorage.getItem('theme') === 'light') {
                setCurrentTheme('light');
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                setCurrentTheme('dark');
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        }
    }

    return (
        <Button size="icon" onClick={handleThemeSwitch} className={classNames}>
            {currentTheme === 'dark' ? <Icon.MoonIcon className="w-4" /> : <Icon.SunIcon className="w-4" />}
        </Button>
    )
}