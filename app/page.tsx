"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-center">
      {/* Header */}
      <header className="w-full flex justify-between items-center p-4">
        <Image src={"/logo.svg"} alt="logo" width={100} height={100} />
        <h2 className="text-2xl font-bold">Aashish's AI Assistant</h2>
        <button
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          onClick={() => router.push("/sign-in")}
        >
          Get Started
        </button>
      </header>

      <div
        className="mt-4 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold cursor-pointer"
        onClick={() => router.push("/sign-in")}
      >
        🚀 Introducing Personal AI Assistance →
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center mt-20">
        <h1 className="text-5xl font-bold">
          Yours Personal{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
            AI Assistance
          </span>
        </h1>
      </div>

      {/* Video Playback Section */}
      <div className="mt-10 flex flex-col items-center">
        <p className="text-lg font-semibold">How Can I Assist You?</p>
        <div
          className="mt-4 w-[660px] h-auto bg-gray-200 flex items-center justify-center rounded-lg shadow-lg cursor-pointer"
          onClick={() => router.push("/sign-in")}
        >
          <Image
            src="/thumbnail.png"
            alt="thumbnail"
            width={800}
            height={450}
            className="w-auto h-auto max-w-full max-h-full"
          />
        </div>
      </div>
    </div>
  );
}
