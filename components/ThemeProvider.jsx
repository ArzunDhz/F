"use client";
import { ThemeProvider } from "next-themes";

export default function themeProvider({ children }) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
