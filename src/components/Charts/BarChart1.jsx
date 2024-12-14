import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars({width, height, data}) {
    console.log(data.product_wise_collected_amount,'data')
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['Cred', 'Pay', 'Flex'] }]}
      series={[{ data: [data.product_wise_collected_amount.cred, data.product_wise_collected_amount.pay, data.product_wise_collected_amount.flex] }]}
      width={width}
      height={height}
      sx={{padding:"4px"}}
    />
  );
}
