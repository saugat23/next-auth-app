export default function SingleProfile({params}: any){
    return (
        <div className="flex justify-center items-center min-h-screen p-2">
            <h1>Profile Page {params.id}</h1>
        </div>
    )
}