import Image from "next/image";

import MainHeader from "@/components/layout/Header"
export default function Home() {
  return (
    <>
   <MainHeader/>
<div className="h-screen flex items-center justify-center">
  <h1 className="text-4xl font-bold">Welcome to Bestpeers</h1>
</div>
    </>
    
  );
}
