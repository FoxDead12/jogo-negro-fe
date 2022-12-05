export default function Loader () {

    return (
        <div className="z-[200] bg-gray-800 bg-opacity-50 absolute w-screen h-screen left-0 top-0 flex justify-center items-center">
            <div className="flex items-center gap-2 text-gray-500 bg-white p-5 rounded-md shadow-md">
                <h5 className="text-gray-900 text-base font-normal mr-2">A Carregar...</h5>
                <span className="h-8 w-8 block rounded-full border-4 border-t-gray-700 animate-spin"></span>
            </div>
        </div>
    )
}