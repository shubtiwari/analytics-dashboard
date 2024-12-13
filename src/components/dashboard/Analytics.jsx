import React, { useRef, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AutoCompleteComponent from '../Autocomplete/index';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { formatToRupee } from "../helper/index"

const Analytics = () => {
    const reportRef = useRef(); // Reference to the content for PDF
    const [selectedInstitute, setSelectedInstitute] = useState('')
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
        { id: 1, title:"1"},
        { id: 2, title:"2"},
        { id: 3, title:"3"},
        { id: 4, title:"4"},
    ];


    const tabContent = [
        { id: 1, title: 'Total fee collection', amount: "10500" },
        { id: 1, title: 'Paid amount', amount: "105000000" },
        { id: 1, title: 'Unpaid amount', amount: "5000" },
        { id: 1, title: 'One-time full payment done', amount: "8000" },
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

    const handleGrade = (value) => {
        setSelectedGrade(value);
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
                <AutoCompleteComponent label={'Select Grade'} options={gradeOptions} onSelect={handleGrade} />
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
                    marginTop: 2,
                    overflow: 'auto',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'row', // Align children in a row
                    gap: 2, // Add spacing between cards
                    justifyContent: "space-between",
                    background:"#F9F9F9"
                }}
            >
                {tabContent.map((item) => (
                    <Box
                        key={item}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            padding: 2,
                            borderRadius: '8px',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                            backgroundColor: 'white',
                            minWidth: '23%', // Ensure a consistent card size
                            height: '145px', // Set the height to 145px
                            textAlign: 'left',
                            flexDirection:"column"
                        }}
                    >
                        <Typography sx={{marginBottom:"20px", color:"#4A4A4A"}}>
                        {item.title} 
                    </Typography>
                    <Typography variant='h4' sx={{color:"#5E5E5E"}}>
                    ₹{formatToRupee(item.amount)}
                    </Typography>
                    </Box>
                    
                ))}
            </Box>

        </Box>
    );
};

export default Analytics;
