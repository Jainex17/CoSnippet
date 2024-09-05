

import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";

export const Provider = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return <>
    <NextUIProvider>
        <SessionProvider>
            {children}
        </SessionProvider>
    </NextUIProvider>
  </>;
};
