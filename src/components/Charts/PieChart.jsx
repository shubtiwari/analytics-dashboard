import * as React from 'react';
import { PieChart } from '@mui/x-charts';


export default function BasicPie() {
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
            width={400}
            height={200}
        />
    );
}
