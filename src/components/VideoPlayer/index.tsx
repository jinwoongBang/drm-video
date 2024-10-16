import { VideoData } from "@/components/shorts/ShortsSwiper";

function VideoPlayer({ video }: { video: VideoData }) {
  return (
    <section className="relative flex justify-center align-middle w-screen h-screen">
      <video
        src={video.videoUrl}
        className="max-w-[572px] w-full"
        //   controls
        loop
        playsInline
        autoPlay={true}
        muted={true}
      />
    </section>
  );
}

export default VideoPlayer;
