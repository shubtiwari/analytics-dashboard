import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function SimpleLineChart({ width, height, data }) {
    const xLabels = Object.keys(data);
    return (
        <LineChart
            width={width}
            height={height}
            series={[
                { data: xLabels.map(month => data[month].collected_amount), label: 'Collected Amount' },
                { data: xLabels.map(month => data[month].expected_amount), label: 'Expected Amount' },
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
        />
    );
}