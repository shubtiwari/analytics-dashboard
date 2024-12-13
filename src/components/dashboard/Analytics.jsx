import React, { useRef, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AutoCompleteComponent from '../Autocomplete/index';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Analytics = () => {
    const reportRef = useRef(); // Reference to the content for PDF
    const [selectedInstitute, setSelectedInstitute] = useState('')
    const [selectedYear, setSelectedYear] = useState(''); 

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

    const downloadReport = async () => {
        const element = reportRef.current; // Target the content
        const canvas = await html2canvas(element); // Convert content to canvas
        const imgData = canvas.toDataURL('image/png'); // Get canvas as image

        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight); // Add image to PDF
        pdf.save('report.pdf'); // Download PDF
    };

    const handleInstituteSelect = (value) => {
        setSelectedInstitute(value);
        console.log('Selected Institute:', value);
    };

    const handleYearSelect = (value) => {
        setSelectedYear(value);
        console.log('Selected Institute:', value);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 2,
                    marginRight: 2,
                    borderRadius: '8px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'white',
                }}
            >
                <AutoCompleteComponent label={'Select Institute'} options={instituteOptions}
                    onSelect={handleInstituteSelect} />
                <AutoCompleteComponent label={'Select Annual Year'} options={annualYearOptions} onSelect={handleYearSelect} />
                <Button variant="contained" color="primary" onClick={downloadReport}>
                    Download Report
                </Button>
            </Box>
            <Box
                ref={reportRef} // Reference to this content
                sx={{
                    flexGrow: 1,
                    padding: 2,
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    marginTop: 2,
                    overflow: 'auto',
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Report Content
                </Typography>
                <Typography variant="body1">
                    This is the content of the report. Include tables, graphs, or any other
                    information here. The entire content within this box will be captured as
                    part of the PDF.
                </Typography>
            </Box>
        </Box>
    );
};

export default Analytics;
