
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { setCredentials } from "../app/features/ghSlice";
import { useLazyGetAccessTokenQuery } from "../app/services/ghApi";


export const GitRedirect = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [getAccessToken] = useLazyGetAccessTokenQuery();
    const location = useLocation();
    const id = new URLSearchParams(location.search).get("installation_id");

    const handleSetCredentials = useCallback(async () => {
        try {
            const data = await getAccessToken({ id: id })
            dispatch(
                setCredentials({
                    installationId: id,
                    token: data?.data?.token
                })
            )
            navigate('/import/repos', { replace: true })
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        handleSetCredentials()
            .catch(console.error);
    }, [handleSetCredentials])

    return (
        <div className="h-full w-full flex flex-col gap-10 items-center justify-center">
            <span className="bg-white dark:bg-coal-main text-xl dark:text-white p-5 rounded-lg font-semibold">Authorized!</span>
            <p>Page will redirect in a few seconds...</p>
        </div>
    )
}