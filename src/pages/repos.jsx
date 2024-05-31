import { useLocation } from "react-router-dom";
import { useLazyGetAccessTokenQuery } from "../app/services/ghApi";
import { Button } from "../components/button"

export const Repos = () => {
    const location = useLocation()
    const code = new URLSearchParams(location.search).get("code");
    const [getAccessToken, { data, error, isLoading }] = useLazyGetAccessTokenQuery(code);

    const handleGetToken = async (e) => {
        e.preventDefault();
        try {
            await fetch(`https://localhost:4000/getAccessToken?code=${code}`, {
                method: "GET",
            }).then((data) => console.log(data))
            // await getAccessToken({ code: code });
        } catch (error) {
            console.log(data)
        }
    }
    return (
        <Button className="w-full" onClick={handleGetToken}>
            Get all Repos
        </Button>
    )
}