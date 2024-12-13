import React, { useRef, useState } from 'react';
import { Box, Button } from '@mui/material';
import AutoCompleteComponent from '../Autocomplete/index';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { makeStyles } from '@mui/styles';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

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
        marginBottom: 9,
    },
    downloadButton: {
        marginTop: 2,
    },
}));

const Summary = () => {
    const classes = useStyles();
    const reportRef = useRef();
    const [selectedInstitute, setSelectedInstitute] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState([null, null]);

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

    const handleDateRangeChange = (dates) => {
        setSelectedDateRange(dates);
        console.log('Selected Date Range:', dates);
    };

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

    return (
        <Box className={classes.container}>
            <Box className={classes.filterBox}>
                <AutoCompleteComponent label={'Select Institute'} options={instituteOptions} onSelect={handleInstituteSelect} />
                <AutoCompleteComponent label={'Select Annual Year'} options={annualYearOptions} onSelect={handleYearSelect} />
                <AutoCompleteComponent label={'Select Grade'} options={gradeOptions} onSelect={handleGrade} />
                <RangePicker onChange={handleDateRangeChange} />
                <Button className={classes.downloadButton} variant="contained" color="primary" onClick={downloadReport}>
                    Download Report
                </Button>
            </Box>
            <Box ref={reportRef} sx={{ backgroundColor: '#F9F9F9', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                {/* The content to be converted to PDF */}
            </Box>
        </Box>
    );
};

export default Summary;
