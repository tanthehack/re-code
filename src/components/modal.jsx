import { Button } from './button'
import * as Icon from "lucide-react"
const Modal = ({ isOpen, onClose, children, title, size }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex text-coal-main dark:text-white items-center justify-center z-50">
            <div className="fixed inset-0 bg-coal-main opacity-50"></div>
            <div className={`flex flex-col justify-between gap-6 p-6 bg-white dark:bg-coal-main 
            border-[1px] border-gray-semi dark:border-orange-light rounded-lg 
            overflow-x-hidden shadow-xl transform transition-all max-w-xl h-full w-full ${size == "small" ? "max-h-[400px]" : "max-h-[600px]"}`}>
                <div className='flex justify-between w-full items-center'>
                    {
                        <h1 className='font-bold text-xl'>{title}</h1> ?? null
                    }
                    <Button variant="none" size="icon" onClick={onClose}>
                        <span className="sr-only">Close</span>
                        <Icon.X className='w-5' />
                    </Button>
                </div>
                <div className="p-4 gap-4 flex flex-col overflow-y-auto items-center">
                    {children}
                </div>
                <Button
                    onClick={onClose}
                >
                    <p>Close</p>
                </Button>
            </div>
        </div>
    );
};

export default Modal;
