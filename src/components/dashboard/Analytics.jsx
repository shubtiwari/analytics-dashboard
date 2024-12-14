import React, { useRef, useState, useEffect } from 'react';
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
import axios from 'axios';

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
        alignItems: 'center',
        padding: 10,
        marginRight: 2,
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        marginBottom: 9,
        justifyContent: "space-between"
    },
    reportBox: {
        flexGrow: 1,
        padding: 2,
        borderRadius: '8px',
        marginTop: 2,
        display: 'flex',
        flexWrap: 'wrap', // Enable wrapping
        gap: '16px', // Space between cards
        justifyContent: 'flex-start', // Align items to the start
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
    const [gradeOptions, setGradeOptions] = useState([]);
    const [annualYearOptions, setAnnualYearOptions] = useState([]);

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    const options = [
        {
            institute: 'THDC-IHET',
            annualYear: ['2021-2022', '2022-2023', '2022-2024'],
            grades: {
                '2021-2022': ['1', '2', '3', '4'],
                '2022-2023': ['5', '6', '7', '8'],
                '2022-2024': ['1', '2', '3', '4']
            }
        },
        {
            institute: 'IIT Kanpur',
            annualYear: ['2022-2023'],
            grades: {
                '2022-2023': ['1', '2', '3', '4']
            }
        },
        {
            institute: 'IIT Bombay',
            annualYear: ['2023-2024'],
            grades: {
                '2023-2024': ['1', '2', '3', '4']
            }
        },
        {
            institute: 'IIT Delhi',
            annualYear: ['2024-2025'],
            grades: {
                '2024-2025': ['1', '2', '3', '4']
            }
        }
    ];

    const instituteOptions = [
        { id: 1, title: 'THDC-IHET' },
        { id: 2, title: 'IIT Kanpur' },
        { id: 3, title: 'IIT Bombay' },
        { id: 4, title: 'IIT Delhi' },
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

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/analytics', {
                    params: {
                        collector_id: 5,
                        grade_id: 'grade3'
                    }
                });
                setData(response.data);  // Assuming response.data contains the data
                setLoading(false);
            } catch (err) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchAnalyticsData();
    }, []);

    useEffect(() => {
        if (selectedInstitute) {
            // Find the relevant data for the selected institute
            const selectedData = options.find(
                (option) => option.institute === selectedInstitute
            );

            if (selectedData) {
                setAnnualYearOptions(selectedData.annualYear);
                // Reset grade selection when institute or year changes
                setSelectedGrade('');
                setSelectedYear('');
            }
        }
    }, [selectedInstitute]);

    useEffect(() => {
        if (selectedInstitute && selectedYear) {
            // Find the relevant grades for the selected institute and year
            const selectedData = options.find(
                (option) => option.institute === selectedInstitute
            );

            if (selectedData) {
                setGradeOptions(selectedData.grades[selectedYear] || []);
            }
        }
    }, [selectedInstitute, selectedYear]);


    return (
        <Box className={classes.container}>
            <Box className={classes.filterBox}>
                <Box sx={{ display: "flex" }}>
                    <AutoCompleteComponent
                        label={'Select Institute'}
                        options={options.map((option) => option.institute)}
                        value={selectedInstitute}
                        onSelect={handleInstituteSelect}
                    />
                    <AutoCompleteComponent
                        label={'Select Annual Year'}
                        options={annualYearOptions}
                        value={selectedYear}
                        onSelect={handleYearSelect}
                        disabled={!selectedInstitute} // Disable Year if Institute is not selected
                    />
                    <AutoCompleteComponent
                        label={'Select Grade'}
                        options={gradeOptions}
                        value={selectedGrade}
                        onSelect={handleGrade}
                        disabled={!selectedYear} // Disable Grade if Year is not selected
                    />
                </Box>
                <Box >

                <Button className={classes.downloadButton} variant="contained" color="primary" onClick={downloadReport}>
                    Download Report
                </Button>
                </Box>
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
                <Box sx={{ display: "flex", justifyContent: "space-between", backgroundColor: '#F9F9F9', marginTop: "2.5%" }}>
                    <Box sx={{ textAlign: 'center' }}> {/* Center-align heading and chart */}
                        <Typography variant="h6" sx={{ marginBottom: '8px' }}>
                            Heading for First Graph
                        </Typography>
                        <BasicBarChart width={700} height={400}/>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}> {/* Center-align heading and chart */}
                        <Typography variant="h6" sx={{ marginBottom: '8px' }}>
                            Heading for Second Graph
                        </Typography>
                        <BasicPie width={350} height={400} />
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
