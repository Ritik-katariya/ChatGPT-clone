import ChatSection from "@/ui/Home/chat-section";
import Header from "@/ui/Home/header";
import SideTab from "@/ui/Home/side-tab";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";

export default async function Home() {
  const { userId } = await auth();
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

  // Layout: Sidebar (collapsible) + Main (Header fixed, ChatSection scrollable)
  // Header is fixed at the top of the main area, ChatSection fills the rest and is scrollable.
  // The main area has left margin to accommodate the sidebar width (collapsed/expanded).
  // The sidebar should be styled to be fixed or sticky as needed in its own component.

  return (
    <div className="flex bg-[#212121] w-screen h-screen overflow-hidden">
      {/* Sidebar */}
      <SideTab />
      {/* Main Content */}
      <div className="relative flex-1 h-screen flex flex-col">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-30" style={{ left: 'var(--sidebar-width, 72px)' }}>
          
          <Header />
        </div>
        {/* Chat Section below header, scrollable */}
        <div
          className="flex-1 min-h-0 overflow-y-auto"
          style={{
            marginTop: "48px", // Height of Header, adjust if header height changes
          }}
        >
          <ChatSection />
        </div>
      </div>
    </div>
  );
}
