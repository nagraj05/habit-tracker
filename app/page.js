import AuthForm from "@/components/common-components/AuthForm";
import { ModeToggle } from "@/components/common-components/theme-toggle";
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
        <div className="flex justify-end p-1">
          <ModeToggle />
        </div>
        <div>
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
