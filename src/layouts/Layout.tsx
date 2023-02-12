import Navbar from "@/components/Navbar/Navbar";
import { FC, ReactNode } from "react";

import { Inter } from "@next/font/google";

const inter = Inter({
  weight: "variable",
});

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={inter.className}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
