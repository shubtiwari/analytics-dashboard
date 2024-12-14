import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
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
        gap: '32px', // Space between cards
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
    const [selectedInstitute, setSelectedInstitute] = useState('BITS'); // Set default institute
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');
    const [gradeOptions, setGradeOptions] = useState([]);
    const [annualYearOptions, setAnnualYearOptions] = useState([]);
    const [selectedDateRange, setSelectedDateRange] = useState()

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
        const headerText = `Summary Report for the ${selectedInstitute} Institute`;
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

    const handleDateRangeChange = (dates) => {
        const formatDate = (dateObj) => {
            const date = dateObj.$d;  // Accessing the native JavaScript Date object
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Add leading zero if month is single digit
            const day = date.getDate().toString().padStart(2, '0');  // Add leading zero if day is single digit
            return `${year}-${month}-${day}`;
        };
    
        let formattedRange = [];
    
        if (dates) {
            formattedRange = dates.map(formatDate);
            setSelectedDateRange(formattedRange);  // Assuming setSelectedDateRange is used to update state
        }
    };

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            const collectorId = instituteToCollectorId[selectedInstitute] || 1;
            try {
                const params =  {
                    collector_id: collectorId,
                    academic_year: selectedYear,
                    grade_id: selectedGrade
                }
                if (selectedDateRange) {
                    params.range_start_date = selectedDateRange[0];
                    params.range_end_date = selectedDateRange[1];
                }
                const response = await axios.get('http://127.0.0.1:8000/analytics', {
                    params:params
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

    }, [selectedInstitute, selectedGrade, selectedYear, selectedDateRange]);

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
                        label={'Select Annual Year'}
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
                    <RangePicker onChange={handleDateRangeChange} style={{ height: '55px' }} />
                </Box>
                <Box >
                    <Button className={classes.downloadButton} variant="contained" color="primary" onClick={downloadReport}>
                        Download Report
                    </Button>
                </Box>
            </Box>
            {
                            console.log("🚀 ~ Analytics ~ data:", data)

                                }
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
                                        <Typography className={classes.title}>Total Payment Done</Typography>
                                        <Typography className={classes.amount}>₹{formatToRupee(data.number_of_students)}</Typography>
                                    </Box>
                                    <Box className={classes.card}>
                                        <Typography className={classes.title}>No of Student</Typography>

                                        <Box display="flex" alignItems="center" mt={1}>
                                            <Box sx={{ justifyContent: "space-between", display: "flex" }}>
                                                <Typography variant="caption">Flex: 120</Typography> 
                                            </Box>
                                        </Box>
                                        <Box display="flex" alignItems="center" mt={1}>
                                            <Typography variant="caption">Cred: 75</Typography> 
                                        </Box>

                                        <Box display="flex" alignItems="center" mt={1}>
                                            <Typography variant="caption">Pay: 42</Typography> 
                                        </Box>
                                    </Box>

                                    <Box className={classes.card}>
                                        <Typography className={classes.title}>Settled Amount</Typography>
                                        <Typography className={classes.amount}>₹{formatToRupee(data?.total_collected_amount + data?.unpaid_amount)}</Typography>
                                    </Box>
                                    <Box className={classes.card}>
                                        <Typography className={classes.title}>Settlement Due</Typography>
                                        <Typography className={classes.amount}>₹{formatToRupee(data.total_collected_amount)}</Typography>
                                    </Box>

                                </>
                            )}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", backgroundColor: '#F9F9F9', marginTop: "6%" }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ marginBottom: '8px' }}>
                                    Products Split
                        </Typography>
                        {(data?.monthly_data) && (
                                <BasicBarChart width={500} height={300} data={data?.monthly_data} />
                        )},
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ marginBottom: '8px' }}>
                                    {/* vertical Bargraph need to add */}
                                    Settlement Track
                        </Typography>
                                {/* <BasicBarChart width={500} height={300} data={data?.monthly_data} /> */}
                    </Box>
                        </Box>
            </Box>
            )}
        </Box>
    );
};

export default Analytics;
