import * as React from 'react';
import { PieChart } from '@mui/x-charts';


export default function BasicPie({width, height}) {
    return (
        <PieChart
            series={[
                {
                    data: [
                        { id: 0, value: 10, label: 'CRED' },
                        { id: 1, value: 15, label: 'FLEX' },
                        { id: 2, value: 20, label: 'PAY' },
                    ],
                },
            ]}
            width={width}
            height={height}
        />
    );
}
