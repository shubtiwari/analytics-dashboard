import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, Link } from '@mui/material';
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
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

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
        flexWrap: 'wrap',
        gap: '32px',
        justifyContent: 'flex-start',
        backgroundColor: '#F9F9F9',
        marginBottom: 10,
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        padding: 25,
        borderRadius: '8px',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        minWidth: '23%',
        textAlign: 'left',
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
            boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.15)',
        },
    },
    title: {
        marginBottom: '12px',
        color: '#4A4A4A',
        fontWeight: 'bold',
    },
    amount: {
        color: '#5E5E5E',
        fontSize: '1.5rem',
        fontWeight: '600',
    },
    downloadButton: {
        marginTop: 2,
    },
}));

const Analytics = () => {
    const classes = useStyles();
    const reportRef = useRef();
    const [selectedInstitute, setSelectedInstitute] = useState('BITS');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');
    const [gradeOptions, setGradeOptions] = useState([]);
    const [annualYearOptions, setAnnualYearOptions] = useState([]);

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const instituteToCollectorId = {
        'THDC': 1,
        'BITS': 2,
    };

    const options = [
        {
            institute: 'BITS',
            annualYear: ['2023-2024'],
            grades: {
                '2023-2024': ['grade2', 'grade3']
            }
        },
        {
            institute: 'THDC',
            annualYear: ['2023-2024'],
            grades: {
                '2023-2024': ['grade1', 'grade2', 'grade3']
            }
        },
    ];

    const downloadReport = async () => {
        const element = reportRef.current;
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();

        // Get the page dimensions
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width + 60;

        // Define padding values
        const horizontalPadding = 10;

        // Add Header - "Summary Report for the dashboard"
        const headerText = `Analytics report for the ${selectedInstitute} Institute`;
        const headerPadding = 20;
        pdf.setFontSize(16);
        pdf.text(headerText, (pdfWidth - horizontalPadding * 2) / 2, headerPadding, { align: "center" });

        // Add Applied Filters
        const filtersText = [
            `Academic Year: ${selectedYear}`,
            `Grade: ${selectedGrade}`
        ];
        const filterPadding = headerPadding + 10; // Space between header and filters
        pdf.setFontSize(12);
        filtersText.forEach((line, index) => {
            pdf.text(line, horizontalPadding, filterPadding + (index * 10));
        });

        // Add the image of the report content below the filters
        pdf.addImage(imgData, 'PNG', horizontalPadding, filterPadding + 30, pdfWidth - 2 * horizontalPadding, pdfHeight - 90);  // Adjusting the position with horizontal padding

        // Add Footer - "JODO" centered at the bottom
        const footerText = "JODO";
        const footerHeight = pdfHeight - 1;  // Position near the bottom
        pdf.setFontSize(12);
        pdf.text(footerText, (pdfWidth - horizontalPadding * 2) / 2 + horizontalPadding, footerHeight, { align: "center" });

        // Save the PDF
        pdf.save('report.pdf');
    };

    const handleInstituteSelect = (value) => {
        setSelectedInstitute(value);
    };

    const handleYearSelect = (value) => {
        setSelectedYear(value);
    };

    const handleGrade = (value) => {
        setSelectedGrade(value);
    };

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            const collectorId = instituteToCollectorId[selectedInstitute] || 1;
            try {
                const response = await axios.get('http://127.0.0.1:8000/analytics', {
                    params: {
                        collector_id: collectorId,
                        academic_year: selectedYear,
                        grade_id: selectedGrade,
                    }
                });
                setData(response.data); 
                setLoading(false);
            } catch (err) {
                setError('Error fetching data');
                setLoading(false);
            }
        };


        if (selectedInstitute) {
            fetchAnalyticsData();
        }

    }, [selectedInstitute, selectedGrade, selectedYear]);

    useEffect(() => {
        if (selectedInstitute) {
            const selectedData = options.find(
                (option) => option.institute === selectedInstitute
            );
            if (selectedData) {
                setAnnualYearOptions(selectedData.annualYear);
                setSelectedGrade('');
                setSelectedYear('');
            }
        }
    }, [selectedInstitute]);

    useEffect(() => {
        if (selectedInstitute && selectedYear) {
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
                        label={'Select Academic Year'}
                        options={annualYearOptions}
                        value={selectedYear}
                        onSelect={handleYearSelect}
                        disabled={!selectedInstitute}
                    />
                    <AutoCompleteComponent
                        label={'Select Grade'}
                        options={gradeOptions}
                        value={selectedGrade}
                        onSelect={handleGrade}
                        disabled={!selectedYear}
                    />
                </Box>
                <Box >
                    <Button className={classes.downloadButton} variant="contained" color="primary" onClick={downloadReport}>
                        Download Report
                    </Button>
                </Box>
            </Box>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
            <Box ref={reportRef} sx={{ backgroundColor: '#F9F9F9', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Box className={classes.reportBox}>
                    {data && (
                        <>
                            <Box className={classes.card}>
                                <Typography className={classes.title}>Number of Students</Typography>
                                <Typography className={classes.amount}>{data.number_of_students}</Typography>
                            </Box>
                            <Box className={classes.card}>
                                <Typography className={classes.title}>Total fee collection</Typography>
                                        <Typography className={classes.amount}>₹{formatToRupee(data?.total_collected_amount + data?.unpaid_amount)}</Typography>
                            </Box>
                            <Box className={classes.card}>
                                <Typography className={classes.title}>Paid amount</Typography>
                                        <Typography className={classes.amount}>₹{formatToRupee(data.total_collected_amount)}</Typography>
                            </Box>
                            <Box className={classes.card}>
                                <Typography className={classes.title}>Unpaid amount</Typography>
                                        <Typography className={classes.amount}>₹{formatToRupee(data.unpaid_amount)}</Typography>
                        </Box>
                        </>
                    )}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", backgroundColor: '#F9F9F9', marginTop: "2.5%" }}>
                            <Box sx={{ textAlign: 'center', paddingRight: "5px" }}>
                        <Typography variant="h6" sx={{ marginBottom: '8px' }}>
                                    Monthly Cashflow
                        </Typography>
                        <BasicBarChart width={700} height={400} data={data?.monthly_data}/>
                    </Box>
                    <Box sx={{ textAlign: 'center', width:"36%" }}>
                        <Typography variant="h6" sx={{ marginBottom: '8px' }}>
                                    % of TFC under JODO
                        </Typography>
                        <BasicPie width={350} height={400} data={data?.product_wise_collected_amount}/>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", }}>
                    <Box className={classes.card} sx={{ width: '49%', position: 'relative' }}>
                        <Typography className={classes.title} variant='h6'>
                                    {data.on_time_payment_percentage}% Paid on time
                                    <LinearProgress variant="determinate" value={data.on_time_payment_percentage} sx={{ marginTop: "10px", height:"10px"}} />
                        </Typography>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '0px',
                                right: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: "12px"
                            }}
                        >
                            <Tooltip title="This indicates the percentage of payments made on time" arrow>
                                <InfoIcon sx={{ fontSize: '20px', color: 'gray', cursor: 'pointer' }} />
                            </Tooltip>
                        </Box>
                    </Box>
                            <Box className={classes.card} sx={{ width: '49%' }}>
                                {data.on_time_payment_percentage === 100 ?
                                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                                        All Payments are on track!
                                    </Alert>
                                    :
                                    <Box>
                                        <Alert severity="error" style={{ display: 'flex', alignItems: 'center' }}>
                                            Delayed Payments
                                            <Box component="span" ml={1}>
                                                Check Flex -{' '}
                                                <Link href="https://dashboard.jodo.in/" underline="hover" target="_blank" rel="noopener">
                                                    CashFlow
                                                </Link>
                                            </Box>
                                        </Alert>
                                    </Box>
                                }

                            </Box>
                </Box>
            </Box>
            )}
        </Box>
    );
};

export default Analytics;
