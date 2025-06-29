import Header from "@/ui/Home/header";
import SideTab from "@/ui/Home/side-tab";



export default function Home() {

  return (
    <div className="flex bg-[#212121] w-screen h-screen justify-between">
     
<SideTab/>
<div className="w-full">
  <Header/>
</div>
    
    </div>
  );
}
