const VideoComponent = ({videoUrl}) => {
return (
    <div className="flex  flex-col items-center justify-center">
        <h1 className="my-6 text-3xl">Welcome to the Official Website - <span className="text-indigo">One <span className=" font-semibold text-purple">District</span> - One <span className="font-semibold text-purple">Product</span></span></h1>
    <div className="drop-shadow-2xl shadow-black p-4 w-auto h-auto overflow-hidden"><video className="rounded-lg h-[400px] w-auto " loop autoPlay muted>
        <source src={videoUrl} type="video/mp4"/>
        Your Browser Doesn't Support The Video.
    </video>
    </div>
    </div>
)
}

export default VideoComponent;