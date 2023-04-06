import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {

  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        'Loading...'
      ) : (
        <ApexChart
          type='candlestick'
          series={[
            {
              data: data?.map((price) => {
                return {
                  x: price.time_open,
                  y: [
                    price.open,
                    price.high,
                    price.low,
                    price.close,
                  ],
                };
              }),
            } as unknown as number,
          ]}
          options={{
            chart: {
              height: 300,
              width: 500,
              background: 'transparent',
            },
            stroke: { curve: 'smooth', width: 4 },
            yaxis: { show: false },
            xaxis: {

              type: 'datetime',
              categories: data?.map((price) => price.time_close) as string[],
            },

          }}
        />
      )}
    </div>
  );
}

export default Chart;
