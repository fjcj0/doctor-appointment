const LoadingButton = ({ color }: { color: string }) => {
    return (
        <div className="w-full flex items-center justify-center">
            <div className={`h-7 w-7 animate-spin rounded-full border-4 border-solid border-${color} border-t-transparent`} />
        </div>
    );
}
export default LoadingButton