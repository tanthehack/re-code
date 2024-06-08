import { MutatingDots } from "react-loader-spinner"

export const Loader = ({ classNames }) => {
    return (
        <div className={classNames}>
            <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#FF4F18"
                secondaryColor="#FF4F18"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
            />
        </div>
    )
}