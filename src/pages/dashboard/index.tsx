import CommonList from "@/components/CommonListCom"
import * as echarts from 'echarts';
import { useEffect, useRef } from "react";
import './index.less'

export default function Dashboard() {
  const lineRef = useRef(null);
  const pieRef = useRef(null);
  let chartInstance = null;

  let renderLineChart = () => {
    const myChart = echarts.getInstanceByDom(lineRef.current as unknown as HTMLDivElement);
    if (myChart)
      chartInstance = myChart;
    else
      chartInstance = echarts.init(lineRef.current as unknown as HTMLDivElement);
    chartInstance.setOption({
      title: {
        text: '产品销量'
      },
      tooltip: {
        trigger: 'axis'
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      legend: {
        data: ['手机', '电脑']
      },
      xAxis: {
        name: '月',
        boundaryGap: false,
        type: 'category',
        data: ['1', '2', '3', '5', '6', '7', '8', '9']
      },
      yAxis: {
        name: '台',
        type: 'value'
      },
      series: [
        {
          name: '手机',
          data: [140, 110, 100, 90, 70, 30, 10, 0],
          type: 'line'
        },
        {
          name: '电脑',
          data: [140, 120, 100, 80, 60, 40, 20, 0],
          type: 'line'
        }
      ]
    })
  };

  let renderPieChart = () => {
    const myChart = echarts.getInstanceByDom(pieRef.current as unknown as HTMLDivElement);
    if (myChart)
      chartInstance = myChart;
    else
      chartInstance = echarts.init(pieRef.current as unknown as HTMLDivElement);
    chartInstance.setOption({
      series: [
        {
          type: 'pie',
          data: [
            {
              value: 335,
              name: '直接访问'
            },
            {
              value: 234,
              name: '联盟广告'
            },
            {
              value: 1548,
              name: '搜索引擎'
            }
          ]
        }
      ]
    })
  };

  useEffect(() => {
    renderLineChart()
    renderPieChart()
  }, [])

  return (
    <CommonList
      bordered={false}
      title="工作台-1"
    >
      <div className="echart-container">
        <div className="echart-instance" style={{ height: 400 }} ref={lineRef} />
        <div className="echart-instance" style={{ height: 400 }} ref={pieRef} />
      </div>
    </CommonList>
  )
}