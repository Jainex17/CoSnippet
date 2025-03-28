import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { ContextProvider } from "@/utils/AppContext";
import { Analytics } from "@vercel/analytics/react"

export const Provider = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return <>
    <NextUIProvider>
      <SessionProvider>
        <ContextProvider>
            {children}
        </ContextProvider>
      </SessionProvider>
    </NextUIProvider>
    <Analytics />
  </>;
};
