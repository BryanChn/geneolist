"use client";
import { NextUIProvider } from "@nextui-org/react";

import "../styles/globals.css";

export function Providers({ children }: { children: React.ReactNode }) {
    return <NextUIProvider>{children}</NextUIProvider>;
}
