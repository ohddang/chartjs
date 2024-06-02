"use client";

import { MarketInfo } from "@/api/api";
import { MARKET_LIST } from "@/constants/common";
import Link from "next/link";
import { useId, useState } from "react";

export default function CoinList({ items }: { items: MarketInfo[] }) {
  const [market, setMarket] = useState<string>(MARKET_LIST[0]);
  const id = useId();

  return (
    <section className="w-2/12 min-w-52 h-ful bg-white flex flex-col">
      <div className="w-full h-10 flex flex-row justify-between border p-1 text-sm ">
        {MARKET_LIST.map((item) => (
          <div
            className={`w-full flex justify-center items-center rounded-sm hover:cursor-pointer ${
              market === item ? "bg-primary-blue text-white" : "bg-white text-black"
            }`}
            key={item}
            onClick={(e) => setMarket(e.currentTarget.textContent ?? "")}>
            {item}
          </div>
        ))}
      </div>
      <ul className="w-full h-full flex flex-col overflow-scroll scrollbar-custom text-sm">
        {items
          .filter((item) => item.market.startsWith(market))
          .map((item) => (
            <Link
              href={`/dashboard/${item.market}`}
              className="bg-white border-b-[1px] border-gray-100/90 p-1 pl-3 hover:cusor-pointer hover:bg-gray-100/90"
              key={`${id}-${item.market}`}>
              {item.korean_name}
            </Link>
          ))}
      </ul>
    </section>
  );
}
