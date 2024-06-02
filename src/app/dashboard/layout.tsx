"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Board from "./(components)/Board";
import { Metadata } from "next";

export default function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <section className="w-full h-full">
        <Board>{children}</Board>
      </section>
    </QueryClientProvider>
  );
}
