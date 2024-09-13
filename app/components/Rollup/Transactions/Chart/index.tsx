import { useMemo } from "react";
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
        height: '100%',
        parentHeightOffset: 0,
        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 780,
          options: {
            chart: {
              width: "100%",
              height: "100%",
            },
            xaxis: {
              labels: {
                rotate: -45, // Rotate labels on mobile
                rotateAlways: true,
              },
            },
          },
        },
      ],
      xaxis: {
        categories: dataToDisplay.map((item) => item.time),
        title: {
          text: "Time of Day",
          style: {
            fontSize: "14px",
            fontWeight: 600,
            color: "#807872",
          },
        },
        labels: {
          rotate: 0,
          rotateAlways: false,
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
        tickAmount: 8,
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
          formatter: (val: number) => `${val}`,
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
    <div className="w-full h-[300px] md:h-[250px] cursor-pointer">
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
