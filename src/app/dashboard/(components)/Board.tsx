"use client";

import CoinList from "./CoinList";
import { BASE_URL, MarketInfo, useQueryGet } from "@/api/api";

export default function Board({ children }: { children: React.ReactNode }) {
  const { data, refetch, isLoading } = useQueryGet<MarketInfo[]>(
    "getMarkgetList",
    `${BASE_URL}/market/all?isDetails=false`
  );

  return (
    <section className="flex flex-row justify-center w-full h-full gap-1">
      <section className="w-10/12 h-full">{children}</section>
      <CoinList items={data ?? []} />
    </section>
  );
}
