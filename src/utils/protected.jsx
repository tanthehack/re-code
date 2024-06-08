import { Navigate, useLocation } from "react-router-dom";
import { selectCurrentToken } from "../app/features/ghSlice";

const Protected = ({ path, children }) => {
    const token = selectCurrentToken();
    const location = useLocation()

    return (
        !token ?
            <>{children}</> :
            <Navigate to={path} state={{ from: location }} replace />
    )
}

export default Protected;