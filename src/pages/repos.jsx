import { RepoCard } from "../components/card";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import * as Icons from "lucide-react"
import { useGetUserReposQuery } from "../app/services/ghApi";
import { Loader } from "../components/loader";

export const Repos = () => {
    const { data, isLoading } = useGetUserReposQuery()

    const repos = data?.repositories

    const handleSelectRepo = async (id, owner, e) => {
        e?.preventDefault()

        //send repo id to the backend

        //wait for response, then navigate to loading
        // page or show loading modal
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
                            onClick={(e) => handleSelectRepo(repo.id, repo.owner, e)}
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
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <section className="w-full h-[calc(100vh-50px)] flex justify-center items-center px-32 py-12">
            <div className="dark:bg-coal-main dark:text-white border-[1px] border-gray-semi dark:border-orange-light bg-white text-coal-main shadow-md h-full w-full rounded-xl px-16 py-10 scroll-auto">
                {isLoading ? <Loader classNames="flex items-center justify-center h-full w-full" /> :
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
                }
            </div>
        </section>
    )
}