import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from '@mui/material';
import {
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
  TrendingUp as TrendingUpIcon,
  Assignment as AssignmentIcon,
  PersonAdd as PersonAddIcon,
  Event as EventIcon,
} from '@mui/icons-material';
import Link from 'next/link';

export default function DashboardPage() {
  const stats = [
    { title: 'Total Patients', value: '1,234', icon: <PeopleIcon />, color: 'primary' },
    { title: 'Today\'s Appointments', value: '24', icon: <CalendarIcon />, color: 'secondary' },
    { title: 'Active Cases', value: '156', icon: <AssignmentIcon />, color: 'success' },
    { title: 'Revenue This Month', value: '$45,678', icon: <TrendingUpIcon />, color: 'info' },
  ];

  const recentActivities = [
    { action: 'New patient registered', time: '2 hours ago', type: 'patient' },
    { action: 'Appointment scheduled', time: '3 hours ago', type: 'appointment' },
    { action: 'Medical record updated', time: '5 hours ago', type: 'record' },
    { action: 'Payment received', time: '1 day ago', type: 'payment' },
  ];

  const upcomingAppointments = [
    { patient: 'John Smith', time: '09:00 AM', doctor: 'Dr. Johnson' },
    { patient: 'Sarah Wilson', time: '10:30 AM', doctor: 'Dr. Brown' },
    { patient: 'Mike Davis', time: '02:00 PM', doctor: 'Dr. Johnson' },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard Overview
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Welcome to your healthcare management system. Here&apos;s an overview of your practice.
      </Typography>

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ color: `${stat.color}.main`, mr: 2 }}>
                  {stat.icon}
                </Box>
                <Typography variant="h6" component="div">
                  {stat.value}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {stat.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
        {/* Recent Activities */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <ListItem key={index} divider={index < recentActivities.length - 1}>
                  <ListItemIcon>
                    {activity.type === 'patient' && <PersonAddIcon color="primary" />}
                    {activity.type === 'appointment' && <EventIcon color="secondary" />}
                    {activity.type === 'record' && <AssignmentIcon color="info" />}
                    {activity.type === 'payment' && <TrendingUpIcon color="success" />}
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.action}
                    secondary={activity.time}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Upcoming Appointments
              </Typography>
              <Link href="/admin/dashboard/appointments">
                <Button size="small" variant="outlined">
                  View All
                </Button>
              </Link>
            </Box>
            <List>
              {upcomingAppointments.map((appointment, index) => (
                <ListItem key={index} divider={index < upcomingAppointments.length - 1}>
                  <ListItemText
                    primary={appointment.patient}
                    secondary={`${appointment.time} - ${appointment.doctor}`}
                  />
                  <Chip label="Today" size="small" color="primary" />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>

      {/* Quick Actions */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Link href="/admin/dashboard/patients">
            <Button variant="contained" startIcon={<PersonAddIcon />}>
              Add New Patient
            </Button>
          </Link>
          <Link href="/admin/dashboard/appointments">
            <Button variant="outlined" startIcon={<EventIcon />}>
              Schedule Appointment
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
