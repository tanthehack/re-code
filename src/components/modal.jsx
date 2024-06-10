import { Button } from './button'
import * as Icon from "lucide-react"
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex text-coal-main dark:text-white items-center justify-center z-50">
            <div className="fixed inset-0 bg-coal-main opacity-50" onClick={onClose}></div>
            <div className="flex flex-col gap-6 p-6 bg-white dark:bg-coal-main 
            border-[1px] border-gray-semi dark:border-orange-light rounded-lg 
            overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
                <div className='ml-auto'>
                    <Button variant="none" size="icon" onClick={onClose}>
                        <span className="sr-only">Close</span>
                        <Icon.X className='w-5' />
                    </Button>
                </div>
                <div className="p-4 gap-4 flex flex-col items-center">
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
