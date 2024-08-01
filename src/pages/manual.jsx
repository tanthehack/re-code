import { File } from "lucide-react";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Button } from "../components/button";
import { useSendManualRepoMutation } from "../app/services/ghApi";
import { Loader } from "../components/loader";
import Modal from "../components/modal";
import * as Icons from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Manual = () => {
    const navigate = useNavigate();

    const [file, setFile] = useState(null);

    const fileTypes = ["JS"];

    const [sendRepo, { isLoading: sendRepoIsLoading, isSuccess: sendRepoIsSucesss, error: sendRepoError }] = useSendManualRepoMutation();

    const [isOpen, setModalOpen] = useState(false);

    const [fileName, setFileName] = useState("");

    const handleChange = async (file) => {
        console.log(file)
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
            setFile(e.target.result);
            console.log(e.target.result); // Logs the file content
        };
        reader.readAsText(file);
    };

    const handleSendRepo = async (e) => {
        e?.preventDefault();

        // send repo to the backend
        try {
            handleModal();
            const data = await sendRepo({ code: file }).unwrap();
            console.log(data);
            setTimeout(() => navigate(`/app?repo=${fileName}`, { state: data }), 3000);
        } catch (error) {
            console.log(error);
            toast.error(`${error?.data?.error}`);
        }
    };

    const handleModal = () => {
        setModalOpen(prev => !prev);
    };

    return (
        <section className="w-full h-[calc(100vh-90px)] flex justify-center items-center px-32 py-12">
            <div className="dark:bg-coal-main flex flex-col gap-4 dark:text-white border-[1px] border-gray-semi dark:border-orange-light bg-white text-coal-main shadow-md h-full w-full max-w-2xl rounded-xl px-16 py-10 scroll-auto">
                <h1 className="font-bold text-xl">Upload a JavaScript File</h1>
                <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
                    <div className="flex flex-col justify-center items-center gap-4 border-dashed border-[2px] bg-opacity-10 rounded-lg h-[300px] w-full bg-orange-light border-orange-main">
                        <span className="bg-orange-main p-4 rounded-full">
                            <File className="text-white" />
                        </span>
                        <span className="flex flex-col justify-center items-center gap-1">
                            {file == null ? (
                                <>
                                    <p>Drag and drop a file here or</p>
                                    <button className="underline hover:text-orange-main">
                                        click to upload
                                    </button>
                                </>
                            ) : file.length > 1 ? (
                                <>
                                    <p>File Uploaded</p>
                                    <button className="underline hover:text-orange-main">
                                        Click to change
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p>Error Uploading File</p>
                                    <button className="underline hover:text-orange-main">
                                        Click to try again
                                    </button>
                                </>
                            )}
                        </span>
                    </div>
                </FileUploader>
                <p className="text-xs font-semibold text-gray-dark">Supported File Types: .{fileTypes}</p>
                <Button onClick={handleSendRepo}>
                    <p>Submit</p>
                </Button>
            </div>
            <Modal isOpen={isOpen} onClose={handleModal} size="small">
                {sendRepoIsLoading ? (
                    <Loader />
                ) : sendRepoIsSucesss ? (
                    <>
                        <Icons.CircleCheck size={"96px"} className="text-gray-semi dark:text-gray-dark" />
                        <div className="flex flex-col items-center">
                            <h1 className="text-2xl font-bold">Sent!</h1>
                            <p className="text-sm">You'll be redirected soon...</p>
                        </div>
                    </>
                ) : (
                    <>
                        <Icons.FileWarning size={"96px"} className="text-gray-semi dark:text-gray-dark" />
                        <div className="flex flex-col items-center">
                            <h1 className="text-2xl font-bold">Oops!</h1>
                            <p className="text-sm">{sendRepoError?.data?.error}</p>
                        </div>
                    </>
                )}
            </Modal>
        </section>
    );
};
