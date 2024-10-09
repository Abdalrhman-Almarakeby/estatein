import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-darkest px-5 py-5 text-center text-white">
      <div className="grid w-full max-w-lg gap-8 rounded-lg border border-gray-darker bg-gray-darker p-8 shadow-xl">
        {children}
      </div>
    </div>
  );
}
