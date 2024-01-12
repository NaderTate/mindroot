"use client";

import { Session } from "next-auth";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";

type Props = { children: React.ReactNode; session: Session | null };

const Providers = ({ children, session }: Props) => {
  return (
    <SessionProvider
      // set the interval to 1/4 hour
      refetchInterval={1000 * 60 * 15}
      refetchOnWindowFocus={false}
      session={session}
    >
      <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
        <NextUIProvider>{children}</NextUIProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
