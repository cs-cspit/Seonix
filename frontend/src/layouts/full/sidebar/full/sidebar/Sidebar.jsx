import { useMediaQuery, Box, Drawer, Typography } from '@mui/material';
import Logo from '../shared/logo/Logo';
import SidebarItems from './SidebarItems';

const Sidebar = (props) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const sidebarWidth = '270px';

  // Common style for Drawer background
  const drawerBg = {
    backgroundColor: '#8C4AF2',
    color: '#fff',
    border: 'none', // removes default border
  };

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        <Drawer
          anchor="left"
          open={props.isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxSizing: 'border-box',
              ...drawerBg,
            },
          }}
        >
          <Box sx={{ height: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: 3,
                py: 2,
                width: '100%',
                gap: 2,
              }}
            >
              <Logo />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 600,
                  fontSize: '1.2rem',
                  color: '#fff', // white title
                  whiteSpace: 'nowrap',
                  mr: 15,
                  letterSpacing: 1,
                }}
              >
                Seonix
              </Typography>
            </Box>
            <Box>
              <SidebarItems />
            </Box>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[8],
          ...drawerBg,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 2,
          width: '100%',
        }}
      >
        <Logo />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: '1.2rem',
            color: '#fff', // white title
            ml: 1,
            letterSpacing: 1,
          }}
        >
          Seonix
        </Typography>
      </Box>
      <SidebarItems />
    </Drawer>
  );
};

export default Sidebar;
