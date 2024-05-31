import { useLocation } from "react-router-dom";
import { useGetAccessTokenMutation } from "../app/services/ghApi";
import { Button } from "../components/button"
import axios from "axios";

export const Repos = () => {
    const location = useLocation()
    const code = new URLSearchParams(location.search).get("code");

    const handleGetToken = async (e) => {
        e.preventDefault();
        try {
            const response = await axios(`https://github.com/login/oauth/access_token`, {
                headers: {
                    'Accept': 'application/json'
                },
                method: 'get',
                params: {
                    client_id: import.meta.env.VITE_GH_CLIENT_ID,
                    client_secret: import.meta.env.VITE_GH_CLIENT_SECRET,
                    code: code
                }
            })
            const accessToken = response.data.access_token;
            console.log('Access Token:', accessToken);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Button className="w-full" onClick={handleGetToken}>
            Get all Repos
        </Button>
    )
}