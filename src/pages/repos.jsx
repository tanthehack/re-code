import { selectCurrentToken } from "../app/features/ghSlice";
import { useLazyGetUserReposQuery } from "../app/services/ghApi"
import { Button } from "../components/button"

export const Repos = () => {

    const [getUserRepos, { data, isLoading }] = useLazyGetUserReposQuery();

    const handleGetAllRepos = async () => {
        try {
            const token = selectCurrentToken()
            await getUserRepos({ token: token })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Button className="w-full" onClick={handleGetAllRepos}>
                Get all Repos
            </Button>
            {console.log(data)}
        </>
    )
}