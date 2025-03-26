"use client";
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {RotateWords} from "@/components/ui/startAnimation";

function SuccessContent() {
  //Auto redirect after 3 seconds

  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  console.log("message", type);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    },3800);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 py-6 bg-opacity-50 bg-[url('/cinemaHall.jpg')] bg-cover">
    {/* RotateWords Component with polished styling */}
    <RotateWords 
      text="You can" 
      words={["watch 🎥", "binge🍿", "enjoy endless entertainment! ✨"]}
    
    />
  
  <div className="buttons">
            <motion.button className="playBtn"   onClick={()=>{router.push("/dashboard")}}>
              {" "}
              Go to Dashboard
            </motion.button>
            
          </div>   
    {/* Button with improved design */}
     

  </div>
  );
  
}
export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-black text-white">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}