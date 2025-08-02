import React from 'react';
import {
  Grid,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import PageContainer from '../../../components/container/PageContainer.jsx';
import BlankCard from '../../../components/shared/BlankCard.jsx';
import ExamCard from './ExamCard.jsx';
import { useGetExamsQuery } from '../../../slices/examApiSlice.js';

const Exams = () => {
  const { data: userExams, isLoading, isError } = useGetExamsQuery();
  const now = new Date();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 6 }}>
        <Alert severity="error">Error fetching exams. Please try again later.</Alert>
      </Box>
    );
  }

  const exams = Array.isArray(userExams) ? userExams : [];

  const upcomingExams = exams.filter(exam => new Date(exam.liveDate) > now);
  const ongoingExams = exams.filter(
    exam => new Date(exam.liveDate) <= now && new Date(exam.deadDate) >= now
  );
  const pastExams = exams.filter(exam => new Date(exam.deadDate) < now);

  // Reusable Section Header with Color Dot/Line
  const SectionHeader = ({ color, label, count }) => (
    <Box display="flex" alignItems="center" mb={3}>
      {/* Dot */}
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: color,
          boxShadow: `0 0 6px 0 ${color}`,
          mr: 1,
          flexShrink: 0,
        }}
      />
      {/* Line alternative: Uncomment below and comment Box above for a line instead
      <Box
        sx={{
          width: 36,
          height: 4,
          backgroundColor: color,
          borderRadius: 2,
          mr: 1.5,
        }}
      />
      */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          color: '#8C4AF2', // your brand purple for text
        }}
      >
        {label} ({count})
      </Typography>
    </Box>
  );

  // Helper to render exam list with section
  const renderExamSection = (label, examsArr, color) => (
    <Box sx={{ mb: 6 }}>
      <SectionHeader color={color} label={label} count={examsArr.length} />
      {examsArr.length === 0 ? (
        <Typography sx={{ color: 'text.secondary' }}>
          No {label.toLowerCase()} exams.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {examsArr.map((exam) => (
            <Grid item sm={6} md={4} lg={3} key={exam._id}>
              <BlankCard>
                <ExamCard exam={exam} />
              </BlankCard>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );

  return (
    <PageContainer title="Exams" description="List of exams">
      <Stack spacing={6}>
        {/* Ongoing: Green */}
        {renderExamSection('Ongoing Tests', ongoingExams, '#39D353')}
        {/* Upcoming: Blue */}
        {renderExamSection('Upcoming Tests', upcomingExams, '#61B2FF')}
        {/* Past Due: Red */}
        {renderExamSection('Past Due Tests', pastExams, '#FF4760')}
      </Stack>
    </PageContainer>
  );
};

export default Exams;
