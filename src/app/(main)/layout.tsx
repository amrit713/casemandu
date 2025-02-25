import { ReactNode } from "react";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import { currentProfile } from "@/lib/current-profile";

const Layout = async ({ children }: { children: ReactNode }) => {
  const profile = await currentProfile();

  return (
    <div className="">
      <Navbar user={profile} />

      <main
        className={"flex grainy-light flex-col min-h-[calc(100vh-8.4rem-3px)]"}
      >
        <div className="flex flex-1 flex-col h-full">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
