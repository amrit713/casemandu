import { ReactNode } from "react";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <Navbar />

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
