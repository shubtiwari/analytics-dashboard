import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function SimpleLineChart({ width, height, data }) {
    const xLabels = Object.keys(data);
    const formattedLabels = xLabels.map((label) => {
        const [year, month] = label.split('-');
        const date = new Date(year, parseInt(month, 10) - 1); // Convert to Date object
        return `${year}/${date.toLocaleString('default', { month: 'short' })}`; // Format month as short name
    });
    return (
        <LineChart
            width={width}
            height={height}
            sx={{ padding: "12px" }}
            series={[
                { data: xLabels.map(month => data[month].collected_amount), label: 'Actual Cashflow' },
                { data: xLabels.map(month => data[month].expected_amount), label: 'Expected Cashflow' },
            ]}
            xAxis={[{ scaleType: 'point', data: formattedLabels }]}
        />
    );
}