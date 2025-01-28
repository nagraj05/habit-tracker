import AuthForm from "@/components/common-components/AuthForm";
import { ModeToggle } from "@/components/common-components/theme-toggle";
import Ballpit from "@/Ballpit/Ballpit";
export default function Home() {
  return (
    <div className="flex w-full min-h-screen">
      <div className="w-[70%]">
        {/* <video
          src="/assets/videos/waves.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        /> */}
        <Ballpit />
      </div>
      <div className="w-[30%] relative">
        <div className="absolute top-0 right-0 p-2">
          <ModeToggle />
        </div>
        <div>
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
