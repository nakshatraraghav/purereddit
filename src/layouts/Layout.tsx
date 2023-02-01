import Navbar from "@/components/Navbar/Navbar";
import { FC, ReactNode } from "react";

import { Inter } from "@next/font/google";

type LayoutProps = {
  children: ReactNode;
};

const inter = Inter({
  weight: "variable",
});

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={inter.className}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
