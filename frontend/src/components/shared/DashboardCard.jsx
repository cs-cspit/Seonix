 import React from 'react';
import { Card, CardContent, Typography, Stack, Box } from '@mui/material';

const DashboardCard = ({
  title,
  subtitle,
  children,
  action,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
  // Additional optional props for colors, can extend later:
  titleColor = '#8C4AF2',       // your primary purple
  subtitleColor = 'text.secondary',
}) => {
  return (
    <Card
      sx={{
        padding: 0,
        borderRadius: 2,
        boxShadow: '0 4px 15px rgba(140, 74, 242, 0.15)', // subtle purple shadow
        bgcolor: 'background.paper',
      }}
      elevation={9}
      variant={undefined}
    >
      {cardheading ? (
        <CardContent>
          <Typography
            variant="h5"
            sx={{ color: titleColor, fontWeight: 700, mb: 1 }}
          >
            {headtitle}
          </Typography>
          <Typography variant="subtitle2" color={subtitleColor}>
            {headsubtitle}
          </Typography>
        </CardContent>
      ) : (
        <CardContent sx={{ p: 3 }}>
          {title && (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Box>
                <Typography
                  variant="h5"
                  sx={{ color: titleColor, fontWeight: 700 }}
                >
                  {title}
                </Typography>
                {subtitle && (
                  <Typography variant="subtitle2" color={subtitleColor}>
                    {subtitle}
                  </Typography>
                )}
              </Box>

              {/* Render action element if provided */}
              {action}
            </Stack>
          )}

          {/* Render main content */}
          {children}
        </CardContent>
      )}

      {/* Optional middle content outside CardContent */}
      {middlecontent}

      {/* Optional footer outside CardContent */}
      {footer}
    </Card>
  );
};

export default DashboardCard;

