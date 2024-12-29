import Image from "next/image";

export default function Home() {
  return (
    <div className="flex w-full min-h-screen">
      <div className="w-[70%]">
        <video
          src="/assets/videos/waves.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-[30%]">
        {/* Additional content can go here */}
        <div>hi</div>
      </div>
    </div>
  );
}
