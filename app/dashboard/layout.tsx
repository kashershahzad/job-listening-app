'use client';

import React, { useState, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Toolbar, 
  Drawer, 
  IconButton, 
  Typography,
  Box,
  Divider,
  useTheme
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
      text: 'Create Job', 
      icon: <AddCircleIcon />, 
      path: '/dashboard/create-job',
      category: 'Job Management'
    },
    { 
      text: 'Total Jobs', 
      icon: <FormatListBulletedIcon />, 
      path: '/dashboard/total-job',
      category: 'Job Management'
    },
    { 
      text: 'Applied Jobs', 
      icon: <WorkIcon />, 
      path: '/dashboard/job-Requests',
      category: 'Applications'
    },
    { 
      text: 'Job Requests', 
      icon: <AssignmentTurnedInIcon />, 
      path: '/dashboard/job-request',
      category: 'Applications'
    },
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    if (user?.role === 'admin') {
      return true;
    } else if (user?.role === 'user') {
      return item.text !== 'Create Job';
    }
    return false;
  });

  // Group menu items by category
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
      bgcolor: 'primary.main', // Change to blue
      color: 'white',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <DashboardIcon sx={{ fontSize: 32, color: 'white' }} />
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
          Dashboard
        </Typography>
      </Box>
      
      <Divider sx={{ bgcolor: 'grey.800', my: 1 }} /> */}

      <Box sx={{ p: 2, flexGrow: 1 }}>
        {Object.entries(groupedMenuItems).map(([category, items]) => (
          <Box key={category} sx={{ mb: 3 }}>
            <Typography 
              variant="overline" 
              sx={{ 
                color: 'grey.300', // Lighter grey for category text
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
        ))}
      </Box>

      {/* <Box sx={{ p: 2, mt: 'auto' }}>
        <Divider sx={{ bgcolor: 'grey.800', my: 2 }} />
        <Box sx={{ 
          p: 2, 
          borderRadius: 2, 
          bgcolor: 'rgba(255, 255, 255, 0.04)',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <AccountCircleIcon sx={{ color: 'white' }} />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'white' }}>
              {user?.name || 'User'}
            </Typography>
            <Typography variant="caption" sx={{ color: 'grey.300' }}>
              {user?.role || 'Role'}
            </Typography>
          </Box>
        </Box>
      </Box> */}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'grey.100' }}>
      {/* Mobile Menu Toggle */}
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

      {/* Mobile Sidebar */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        variant="temporary"
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <SidebarContent />
      </Drawer>

      {/* Desktop Sidebar */}
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

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;