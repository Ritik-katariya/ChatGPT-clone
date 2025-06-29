import ChatSection from "@/ui/Home/chat-section";
import Header from "@/ui/Home/header";
import SideTab from "@/ui/Home/side-tab";
import { auth,currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";



export default async function Home() {
const {userId}=await auth();
if (!userId) redirect("/sign-in");

const user = await currentUser();
await connectDB();

if (user) {
  const UserModel = (await import("@/models/User")).User;
  const existingUser = await UserModel.findOne({ clerkId: user.id });

  if (!existingUser) {
    await UserModel.create({
      clerkId: user.id,
    email: user.emailAddresses[0].emailAddress,
    name: user.firstName,
    image: user.imageUrl,
  });
}
}


return (
    <div className="flex bg-[#212121] w-screen h-screen justify-between">
     
<SideTab/>
<div className="w-full h-full">
  <Header/>
  <ChatSection/>
</div>
    
    </div>
  );
}
