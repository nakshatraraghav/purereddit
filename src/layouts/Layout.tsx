import Navbar from "@/components/Navbar/Navbar";
import { FC, ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="font-inter">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
