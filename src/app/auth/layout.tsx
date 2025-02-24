import { ReactNode } from "react";
import MaxWidthWrapper from "@/components/max-width-wrapper";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <MaxWidthWrapper className={"bg-gray-50 grainy-light"}>
      {children}
    </MaxWidthWrapper>
  );
};

export default Layout;
