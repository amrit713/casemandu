import { ReactNode } from "react";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { auth } from "@/auth";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  console.log("this si from layout", session);
  return (
    <div className="">
      <Navbar user={session} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
