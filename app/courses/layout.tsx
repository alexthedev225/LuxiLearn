import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className=" bg-white dark:bg-black py-20 mx-6">
      {children}
    </div>
  );
}
