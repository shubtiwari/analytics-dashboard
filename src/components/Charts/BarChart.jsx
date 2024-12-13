import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const expectedDataId = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const currentData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

export default function SimpleBarChart() {
  return (
    <BarChart
      width={500}
      height={300}
      series={[
        { data: currentData, label: 'Current Data', id: 'currentDataId' },
        { data: expectedDataId, label: 'Expected Data', id: 'expectedDataId' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
  );
}
