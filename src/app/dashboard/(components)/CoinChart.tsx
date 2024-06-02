"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { Chart, registerables } from "chart.js";
import { BASE_URL, MarketCandle, useQueryGet } from "@/api/api";
import { CandlestickController, CandlestickElement, OhlcElement } from "chartjs-chart-financial";
import "chartjs-adapter-date-fns";

Chart.register(...registerables, CandlestickController, CandlestickElement, OhlcElement);

const minute = 1;
const candleCnt = 200;

export default function CoinChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const market = pathname.split("/")[2];

  const { data: candleData } = useQueryGet<MarketCandle[]>(
    "getMarkgetCandles",
    `${BASE_URL}/candles/minutes/${minute}?market=${market}&count=${candleCnt}`
  );

  useEffect(() => {
    if (!canvasRef.current || !candleData) return;

    const newData = candleData.slice(0, 200).map((item, index) => {
      const date = item.candle_date_time_kst.split("T")[0];
      const time = item.candle_date_time_kst.split("T")[1].split(":");

      const newDate = new Date(date).setHours(Number(time[0]), Number(time[1]), 0, 0);

      return {
        x: newDate,
        o: item.opening_price,
        h: item.high_price,
        l: item.low_price,
        c: item.trade_price,
      };
    });

    const chart = new Chart(canvasRef.current, {
      type: "candlestick",
      data: {
        datasets: [
          {
            data: newData,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            time: {
              unit: "minute",
              displayFormats: {
                minute: "HH:mm",
              },
            },
          },
          y: {
            position: "right",
          },
        },
        plugins: {
          tooltip: {
            mode: "nearest",
            intersect: false,
            displayColors: false,
            callbacks: {
              label: (context) => {
                const data = context.dataset.data[context.dataIndex];
                const formatter = new Intl.NumberFormat("ko-KR", {
                  style: "currency",
                  currency: "KRW", // Change this to your preferred currency
                });
                return [
                  `시가: ${formatter.format(data.o)}`,
                  `고가: ${formatter.format(data.h)}`,
                  `저가: ${formatter.format(data.l)}`,
                  `종가: ${formatter.format(data.c)}`,
                ];
              },
            },
          },
          legend: {
            display: false,
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [candleData]);

  return (
    <div className="w-full h-full p-1 bg-white">
      <canvas className="w-full h-full" ref={canvasRef}></canvas>
    </div>
  );
}
