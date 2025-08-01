import React from 'react';
import { Card, CardMedia, Typography, IconButton, Stack, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '../../teacher/components/DeleteIcon.jsx';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const imgUrl =
  'https://static.vecteezy.com/system/resources/previews/023/101/878/non_2x/back-to-school-pattern-seamless-of-stationery-for-studying-at-school-education-kids-accessory-print-object-stuff-design-graphic-wallpaper-element-children-study-background-illustration-vector.jpg';

export default function ExamCard({ exam }) {
  const { examName, duration, totalQuestions, examId } = exam;
  const { userInfo } = useSelector((state) => state.auth);
  const isTeacher = userInfo?.role === 'teacher';

  const navigate = useNavigate();
  const isExamActive = true;

  const handleCardClick = () => {
    if (isTeacher) {
      toast.error('You are a teacher, you cannot take this exam');
      return;
    }
    if (isExamActive && !isTeacher) {
      navigate(`/exam/${examId}`);
    }
  };

  return (
    <Card
      sx={{
        position: 'relative',
        cursor: isTeacher ? 'default' : 'pointer',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 4px 15px rgba(140, 74, 242, 0.3)',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: isTeacher ? 'none' : 'translateY(-8px)',
          boxShadow: isTeacher
            ? '0 4px 15px rgba(140, 74, 242, 0.3)'
            : '0 6px 25px rgba(140, 74, 242, 0.5)',
        },
      }}
      onClick={handleCardClick}
      elevation={9}
    >
      <CardMedia
        component="img"
        image={imgUrl}
        alt={examName}
        sx={{
          height: { xs: 125, sm: 168, md: 196 },
          width: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Text & actions positioned over image without overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: '#fff',
          // Add subtle shadow for extra contrast if needed:
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          pointerEvents: 'none', // allows onClick to trigger on Card
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pointerEvents: 'auto' }}>
          <Typography
            variant="h4" // Larger font for exam name
            component="div"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.5,
              fontSize: { xs: '1rem', sm: '1.3rem', md: '1.7rem' },
              lineHeight: 1.2,
              maxWidth: { xs: '70%', sm: '75%', md: '80%' },
              overflowWrap: 'break-word',
            }}
          >
            {examName}
          </Typography>
          {isTeacher && (
            <IconButton
              aria-label="delete"
              size="small"
              sx={{ color: 'white', pointerEvents: 'auto' }}
              onClick={e => {
                e.stopPropagation();
                // Add your delete logic here
              }}
            >
              <DeleteIcon examId={examId} />
            </IconButton>
          )}
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pointerEvents: 'auto' }}>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              MCQ
            </Typography>
            <Typography variant="subtitle2">{totalQuestions} ques</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.85 }}>
              Duration: {duration} min
            </Typography>
          </Box>
          <Box
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1.3rem', sm: '1.7rem' },
              lineHeight: 1,
              userSelect: 'none',
              color: '#fff',
              opacity: 0.85,
            }}
          >
            &gt;
          </Box>
        </Stack>
      </Box>
    </Card>
  );
}
