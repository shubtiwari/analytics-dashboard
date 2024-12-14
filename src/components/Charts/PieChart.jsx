import * as React from 'react';
import { PieChart } from '@mui/x-charts';


export default function BasicPie({width, height, data}) {
    return (
        <PieChart
            series={[
                {
                    data: [
                        { id: 0, value: data.cred, label: 'CRED' },
                        { id: 1, value: data.flex, label: 'FLEX' },
                        { id: 2, value: data.pay, label: 'PAY' },
                    ],
                },
            ]}
            width={width}
            height={height}
        />
    );
}
