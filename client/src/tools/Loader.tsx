const Loader = ({ content_loader_style, firSpinnerSize, secondSpinnerSize }: { content_loader_style?: string, firSpinnerSize: string, secondSpinnerSize: string }) => {
    return (
        <div className={`${content_loader_style}`}>
            <div className="flex-col gap-4 w-full flex items-center justify-center">
                <div className={`${firSpinnerSize} border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full`}>
                    <div className={`${secondSpinnerSize} border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full`} />
                </div>
            </div>
        </div>
    );
}
export default Loader;