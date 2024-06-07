
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCredentials } from "../app/features/ghSlice";
import { useLazyGetAccessTokenQuery, useLazyGetInstallationsQuery } from "../app/services/ghApi";


export const GitRedirect = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [getAccessToken] = useLazyGetAccessTokenQuery();
    const [getInstallations] = useLazyGetInstallationsQuery();

    const handleGetInstallationId = async () => {
        var id = ""
        try {
            const data = await getInstallations()
            id = `${data?.data[0]?.id}`
        } catch (error) {
            console.log(error)
        }

        return id
    }

    const handleSetCredentials = async () => {
        var id = ""

        try {
            const data = await getInstallations()
            id = `${data?.data[0]?.id}`
        } catch (error) {
            console.log(error)
        }

        try {
            const data = await getAccessToken({ id: id })
            console.log(data)
            dispatch(
                setCredentials({
                    installationId: id,
                    token: data?.data?.token
                })
            )
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            handleSetCredentials()
            navigate('/import/repos', { replace: true })
        }, 2000)
    })

    return (
        <div className="h-full w-full flex flex-col gap-10 items-center justify-center">
            <span className="bg-white dark:bg-coal-main text-xl dark:text-white p-5 rounded-lg font-semibold">Authorized!</span>
            <p>Page will redirect in a few seconds...</p>
        </div>
    )
}