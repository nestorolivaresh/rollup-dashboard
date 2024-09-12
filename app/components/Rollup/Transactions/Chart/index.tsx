import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { useRollupContext } from "@/app/context/useRollupContext";
import { formatTransactionsDataForChart } from "@/app/utils/formatTransactionsDataForChart";
import { ApexOptions } from "apexcharts";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const Chart: React.FC = () => {
  const { transactions, rollup } = useRollupContext();

  const dataToDisplay = useMemo(() => {
    if (transactions && rollup?.id) {
      return formatTransactionsDataForChart(
        transactions.sortedCounts[rollup.id]
      );
    }
    return [];
  }, [transactions, rollup]);

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
        height: 240,
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: dataToDisplay.map((item) => item.time),
        title: {
          text: "Time (hours ago)",
          style: {
            fontSize: "14px",
            fontWeight: 600,
            color: "#807872",
          },
        },
        labels: {
          style: {
            colors: "#807872",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        tickAmount: 5,
        title: {
          text: "Transactions",
          rotate: -90,
          style: {
            fontSize: "14px",
            fontWeight: 600,
            color: "#807872",
          },
        },
        labels: {
          style: {
            colors: "#807872",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      grid: {
        borderColor: "rgba(255, 255, 255, 0.1)",
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
            opacity: 0.1,
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
          borderRadius: 4,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#D87EF6"],
      tooltip: {
        enabled: true,
        theme: "dark",
        y: {
          formatter: (val: number) => `${val}`,
        },
        x: {
          formatter: (val: number) => `${val} hours ago`,
        },
      },
    }),
    [dataToDisplay]
  );

  const series = useMemo(
    () => [
      {
        name: "Transactions",
        data: dataToDisplay.map((item) => item.transactions),
      },
    ],
    [dataToDisplay]
  );

  if (dataToDisplay.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="w-full h-[240px] cursor-pointer">
      <ApexChart
        options={options}
        series={series}
        type="bar"
        width="100%"
        height="100%"
      />
    </div>
  );
};
