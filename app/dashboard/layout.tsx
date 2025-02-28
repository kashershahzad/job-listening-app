'use client';

import React, { useState, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Drawer, 
  IconButton, 
  Typography,
  Box,
  useTheme,
  Skeleton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useUser } from '@/context/UserContext';

interface MenuItem {
  text: string;
  icon: ReactNode;
  path: string;
  category?: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const { user } = useUser();
  const theme = useTheme();

  const menuItems: MenuItem[] = [
    { 
      text: 'Profile', 
      icon: <AccountCircleIcon />, 
      path: '/dashboard/profile',
      category: 'Account'
    },
    { 
      text: 'Jobs', 
      icon: <FormatListBulletedIcon />, 
      path: '/dashboard/total-job',
      category: 'Job Management'
    },
    { 
      text: 'Create', 
      icon: <AddCircleIcon />, 
      path: '/dashboard/create-job',
      category: 'Admin Pannel'
    },
    { 
      text: 'Applied', 
      icon: <WorkIcon />, 
      path: '/dashboard/job-Requests',
      category: 'Job Management'
    },
    { 
      text: 'Requests', 
      icon: <AssignmentTurnedInIcon />, 
      path: '/dashboard/job-request',
      category: 'Admin Pannel'
    },
  ];

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const MenuSkeleton = () => (
    <>
      {[1, 2, 3].map((category) => (
        <Box key={category} sx={{ mb: 3 }}>
          <Skeleton 
            variant="text" 
            width={100} 
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              mb: 1
            }} 
          />
          
          {[1, 2, 3].map((item) => (
            <Box
              key={item}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                px: 2,
                py: 1.5,
                my: 1,
              }}
            >
              <Skeleton 
                variant="circular" 
                width={24} 
                height={24} 
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} 
              />
              <Skeleton 
                variant="text" 
                width={150} 
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} 
              />
            </Box>
          ))}
        </Box>
      ))}
    </>
  );

  const filteredMenuItems = menuItems.filter((item) => {
    if (user?.role === 'admin') {
      return true;
    } else if (user?.role === 'user') {
      return item.category !== 'Admin Pannel';
    }
    return false;
  });

  const groupedMenuItems = filteredMenuItems.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const SidebarContent = () => (
    <Box sx={{ 
      width: 280, 
      bgcolor: 'primary.main',
      color: 'white',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ p: 2, flexGrow: 1 }}>
        {loading ? (
          <MenuSkeleton />
        ) : (
          Object.entries(groupedMenuItems).map(([category, items]) => (
            <Box key={category} sx={{ mb: 3 }}>
              <Typography 
                variant="overline" 
                sx={{ 
                  color: 'grey.300',
                  px: 2,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em'
                }}
              >
                {category}
              </Typography>
              
              {items.map((item) => (
                <Link key={item.text} href={item.path} passHref>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      px: 2,
                      py: 1.5,
                      my: 1,
                      borderRadius: 1.5,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      color: pathname === item.path ? 'white' : 'grey.300',
                      bgcolor: pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        transform: 'translateX(4px)'
                      }
                    }}
                  >
                    <Box sx={{ 
                      color: pathname === item.path ? 'white' : 'grey.300',
                      transition: 'all 0.2s'
                    }}>
                      {item.icon}
                    </Box>
                    <Typography sx={{ 
                      fontWeight: pathname === item.path ? 600 : 400,
                      fontSize: '0.95rem',
                      color: pathname === item.path ? 'white' : 'grey.300'
                    }}>
                      {item.text}
                    </Typography>
                  </Box>
                </Link>
              ))}
            </Box>
          ))
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'grey.100' }}>
      <IconButton
        sx={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1200,
          display: { xs: 'flex', md: 'none' },
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': { bgcolor: 'primary.dark' }
        }}
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        variant="temporary"
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <SidebarContent />
      </Drawer>

      <Box
        component="nav"
        sx={{
          width: 280,
          flexShrink: 0,
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Box
          sx={{
            position: 'fixed',
            height: '100vh',
            width: 280,
            borderRight: '1px solid',
            borderColor: 'grey.800'
          }}
        >
          <SidebarContent />
        </Box>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;