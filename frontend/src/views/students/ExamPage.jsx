 
import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from '../../components/container/PageContainer.jsx';
import DashboardCard from '../../components/shared/DashboardCard.jsx';
import Exams from './Components/Exams.jsx';

const ExamPage = () => {
  return (
    <PageContainer title="Exam Page" description="Active Exams">
      <DashboardCard title="My tests">
        <Exams />
      </DashboardCard>
    </PageContainer>
  );
};

export default ExamPage;
