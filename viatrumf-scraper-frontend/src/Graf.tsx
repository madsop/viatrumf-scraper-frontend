import { Line } from "react-chartjs-2";
import { Innslag } from "./Innslag.ts";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
} from "chart.js";
import { trim } from "./Trim.ts";
import { useEffect } from "react";

interface Grafdata {
  innslag: Innslag[];
}


function Graf({ innslag }: Grafdata) {

    useEffect(() => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip
  )
    }, [])

  const formatTime = (timestamp: string): string => {
    if (!timestamp) return ''
    return moment(timestamp, 'YYYYMMDDTHHmmssZ').format('Do MMMM YYYY, HH.mm')
  }


  const labels  = Array(innslag.length).fill('')


  const options = {
    responsive: true,
    plugins: {
        tooltip: {
            enabled: true,
            callbacks: {
                label: (tooltipItems: any) => {
                    const detteInnslaget = innslag[tooltipItems.dataIndex]
                    return formatTime(detteInnslaget.timestamp) +": " + detteInnslaget.verdi
                }
        }
      },
      title: {
        display: false,
        text: "Graf",
      },
    },
  };

const data = {
    labels,
    datasets: [
      {
        data: innslag.map(i => trim(i.verdi)),
        borderColor: 'rgba(93, 158, 199, 0.5)',
        pointBackgroundColor: 'rgba(171, 71, 188, 1)'
      },
    ],
  };

  return <>
  {innslag && innslag.length}
  <Line options={options} data={data} />
  </>;
}
export default Graf;
