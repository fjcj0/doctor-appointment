const HeaderAuth = ({ title, pargraph }: { title: string, pargraph: string }) => {
    return (
        <div className='flex-item-center-justify-center'>
            <img src='/logo.png' className="w-20" />
            <h1 className="font-bold font-poppins text-xl mb-2">{title}</h1>
            <p className="opacity-50 font-light text-sm">{pargraph}</p>
        </div>
    )
}
export default HeaderAuth