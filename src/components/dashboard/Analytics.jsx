import React, { useRef, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AutoCompleteComponent from '../Autocomplete/index';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { formatToRupee } from "../helper/index";
import BasicPie from '../Charts/PieChart';
import BasicBarChart from '../Charts/BarChart';
import { makeStyles } from '@mui/styles';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
        padding: 10,
    },
    filterBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginRight: 2,
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        marginBottom: 9
    },
    reportBox: {
        flexGrow: 1,
        padding: 2,
        backgroundColor: 'white',
        borderRadius: '8px',
        marginTop: 2,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        justifyContent: 'space-between',
        backgroundColor: '#F9F9F9',
        marginBottom: 10,
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        padding: 25,
        borderRadius: '8px',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)', // More pronounced shadow
        backgroundColor: 'white',
        minWidth: '23%',
        textAlign: 'left',
        transition: 'box-shadow 0.3s ease', // Smooth shadow transition
        '&:hover': {
            boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.15)', // Hover effect for deeper shadow
        },
    },
    title: {
        marginBottom: '12px', // Reduced margin for better space management
        color: '#4A4A4A',
        fontWeight: 'bold', // Bold title for emphasis
    },
    amount: {
        color: '#5E5E5E',
        fontSize: '1.5rem', // Slightly larger font for amounts
        fontWeight: '600', // Emphasized amount value
    },
    downloadButton: {
        marginTop: 2,
    },
}));

const Analytics = () => {
    const classes = useStyles(); // Access the styles
    const reportRef = useRef();
    const [selectedInstitute, setSelectedInstitute] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');

    const instituteOptions = [
        { id: 1, title: 'THDC-IHET' },
        { id: 2, title: 'IIT Kanpur' },
        { id: 3, title: 'IIT Bombay' },
        { id: 4, title: 'IIT Delhi' },
    ];

    const annualYearOptions = [
        { id: 1, title: '2021-2022' },
        { id: 2, title: '2022-2023' },
        { id: 3, title: '2023-2024' },
        { id: 4, title: '2024-2025' },
    ];

    const gradeOptions = [
        { id: 1, title: "1" },
        { id: 2, title: "2" },
        { id: 3, title: "3" },
        { id: 4, title: "4" },
    ];

    const tabContent = [
        { id: 1, title: 'Total fee collection', amount: "10500" },
        { id: 2, title: 'Number of Students', amount: "105000000" },
        { id: 3, title: 'Unpaid amount', amount: "5000" },
        { id: 4, title: 'Pending', amount: "8000" },
    ];

    const downloadReport = async () => {
        const element = reportRef.current;
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('report.pdf');
    };

    const handleInstituteSelect = (value) => {
        setSelectedInstitute(value);
        console.log('Selected Institute:', value);
    };

    const handleYearSelect = (value) => {
        setSelectedYear(value);
        console.log('Selected Year:', value);
    };

    const handleGrade = (value) => {
        setSelectedGrade(value);
        console.log('Selected Grade:', value);
    };

    return (
        <Box className={classes.container}>
            <Box className={classes.filterBox}>
                <AutoCompleteComponent label={'Select Institute'} options={instituteOptions} onSelect={handleInstituteSelect} />
                <AutoCompleteComponent label={'Select Annual Year'} options={annualYearOptions} onSelect={handleYearSelect} />
                <AutoCompleteComponent label={'Select Grade'} options={gradeOptions} onSelect={handleGrade} />
                <Button className={classes.downloadButton} variant="contained" color="primary" onClick={downloadReport}>
                    Download Report
                </Button>
            </Box>
            <Box ref={reportRef} sx={{ backgroundColor: '#F9F9F9', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Box className={classes.reportBox}>
                    {tabContent.map((item) => (
                        <Box className={classes.card} key={item.id}>
                            <Typography className={classes.title}>{item.title}</Typography>
                            <Typography className={classes.amount} variant='h4'>
                                ₹{formatToRupee(item.amount)}
                            </Typography>
                        </Box>
                    ))}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", backgroundColor: '#F9F9F9', marginTop: "6%" }}>
                    <Box>
                        <BasicBarChart />
                    </Box>
                    <Box>
                        <BasicPie />
                    </Box>
                    </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", }}>
                    <Box className={classes.card} sx={{ width: '49%', position: 'relative' }}>
                        <Typography className={classes.title} variant='h6'>
                            % Paid on time
                            <LinearProgress variant="determinate" value={9} sx={{ marginTop: "10px" }} />
                        </Typography>
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: '0px',
                                right: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: "32px"
                            }}
                        >
                            <Tooltip title="This indicates the percentage of payments made on time" arrow>
                                <InfoIcon sx={{ fontSize: '20px', color: 'gray', cursor: 'pointer' }} />
                            </Tooltip>
                        </Box>
                    </Box>
                    <Box className={classes.card} sx={{ width: '49%' }}>Check Pending list</Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Analytics;
