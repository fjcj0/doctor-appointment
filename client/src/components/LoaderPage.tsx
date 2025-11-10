import Loader from "../tools/Loader";
const LoaderPage = () => {
    return (
        <Loader
            content_loader_style="w-full min-h-[100vh] flex items-center justify-center"
            firSpinnerSize="w-20 h-20"
            secondSpinnerSize="w-14 h-14"
        />
    );
}
export default LoaderPage;