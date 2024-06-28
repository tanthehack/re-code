import { RepoCard } from "../components/card";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import * as Icons from "lucide-react"
import { useGetUserReposQuery, useSendRepoMutation } from "../app/services/ghApi";
import { Loader } from "../components/loader";
import { toast } from "react-toastify";
import Modal from "../components/modal";
import { useNavigate } from "react-router-dom";
import { Error } from "../components/error";

export const Repos = () => {
    const navigate = useNavigate()

    const { data, isLoading, isSuccess, error } = useGetUserReposQuery()

    const repos = data?.repositories

    const [sendRepo, { isLoading: sendRepoIsLoading, isSuccess: sendRepoIsSucesss, error: sendRepoError }] = useSendRepoMutation()

    console.log(sendRepoError)

    const [isOpen, setModalOpen] = useState(false)

    const handleSelectRepo = async (repo, owner, e) => {
        e?.preventDefault()

        //send repo to the backend
        try {
            handleModal()
            const data = await sendRepo({ repo: repo, owner: owner }).unwrap()
            console.log(data)
            setTimeout(() => navigate(`/app?repo=${repo}`, { state: data }), 3000)
        } catch (error) {
            console.log(error)
            toast.error(`${error?.data?.error}`);
        }
    }

    function Items({ currentItems }) {
        return (
            <>
                {currentItems &&
                    currentItems.map((repo) => (
                        <RepoCard
                            key={repo.id}
                            name={repo.name}
                            language={repo.language}
                            date={repo.updated_at}
                            status={repo.visibility}
                            onClick={(e) => handleSelectRepo(repo.name, repo.owner.login, e)}
                        />
                    ))}
            </>
        );
    }

    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + 6;
    const currentItems = repos?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(repos?.length / 6);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 6) % repos.length;
        setItemOffset(newOffset);
    };

    const handleModal = () => {
        setModalOpen(prev => !prev)
    }

    return (
        <section className="w-full h-[calc(100vh-50px)] flex justify-center items-center px-32 py-12">
            <div className="dark:bg-coal-main dark:text-white border-[1px] border-gray-semi dark:border-orange-light bg-white text-coal-main shadow-md h-full w-full rounded-xl px-16 py-10 scroll-auto">
                {isLoading ? <Loader classNames="flex items-center justify-center h-full w-full" /> : isSuccess ?
                    <>
                        <header className="flex flex-col gap-1 justify-between px-4 mb-4">
                            <h1 className="text-3xl">Choose a repo to start_</h1>
                            <p className="flex items-center gap-2"><Icons.Info className="w-4 text-gray-dark" />Select a repo that contains JavaScript code.</p>
                        </header>
                        <div className="h-[calc(100%-140px)]">
                            <Items currentItems={currentItems} />
                        </div>
                        <div>
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel={<Icons.ArrowRight />}
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={6}
                                pageCount={pageCount}
                                previousLabel={<Icons.ArrowLeft />}
                                renderOnZeroPageCount={null}
                                className="flex text-sm font-semibold gap-10 h-[80px] items-center justify-center w-full"
                                activeClassName="py-2 px-4 rounded-lg border-[1px] border-orange-main"
                                disabledClassName="dark:text-gray-light text-gray-semi"
                            />
                        </div>
                    </>
                    : <Error title="Error">
                        {error?.message}
                    </Error>
                }
            </div>
            <Modal isOpen={isOpen} onClose={handleModal} size="small">
                {sendRepoIsLoading ? <Loader /> : sendRepoIsSucesss ?
                    <>
                        <Icons.CircleCheck size={"96px"} className="text-gray-semi dark:text-gray-dark" />
                        <div className="flex flex-col items-center">
                            <h1 className="text-2xl font-bold">Sent!</h1>
                            <p className="text-sm">You'll be redirected soon...</p>
                        </div>
                    </>
                    :
                    <>
                        <Icons.FileWarning size={"96px"} className="text-gray-semi dark:text-gray-dark" />
                        <div className="flex flex-col items-center">
                            <h1 className="text-2xl font-bold">Oops!</h1>
                            <p className="text-sm">{sendRepoError?.data?.error}</p>
                        </div>
                    </>
                }
            </Modal>
        </section>
    )
}