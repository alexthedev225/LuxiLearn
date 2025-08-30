import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className=" bg-white dark:bg-black  mx-6">
      {children}
    </div>
  );
}
