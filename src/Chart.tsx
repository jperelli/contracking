import { useMantineTheme } from "@mantine/core";
import { type EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";
import { Values } from "./ItemForm";
import { useMemo } from "react";
import { useLocalStorage } from "@mantine/hooks";

export default function Dashboard() {
  const theme = useMantineTheme();

  const [items, setItems] = useLocalStorage<Array<Values>>({
    key: "items",
    defaultValue: [],
  });

  const option = useMemo<EChartsOption>(
    () => ({
      series: [
        {
          name: "Time",
          type: "scatter",
          smooth: false,
          symbol: "$",
          data: items.map((item) => [
            new Date(item.startedAt),
            +new Date(item.endedAt) - +new Date(item.startedAt),
          ]),
        },
      ],
      darkMode: theme.colorScheme === "dark",
      tooltip: {
        trigger: "axis",
        position: function (pt) {
          return [pt[0], "10%"];
        },
      },
      xAxis: {
        type: "time",
        boundaryGap: [0, 0],
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"],
      },
    }),
    [items, theme]
  );

  return (
    <div>
      <ReactECharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
      />
    </div>
  );
}
