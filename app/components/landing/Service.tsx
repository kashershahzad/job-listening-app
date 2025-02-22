import React from 'react';
import { Container, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';

const services = [
  {
    imageUrl: 'assests/Web.png',
    title: 'Web Development',
    description: 'Description for Service 1',
  },
  {
    imageUrl: 'assests/uiux.png',
    title: 'Ui / Ux designer',
    description: 'Description for Service 2',
  },
  {
    imageUrl: 'assests/promotion.png',
    title: 'Digital marketing',
    description: 'Description for Service 3',
  },
  {
    imageUrl: 'assests/seo.png',
    title: 'SEO',
    description: 'Description for Service 1',
  },
  {
    imageUrl: 'assests/cloud.png',
    title: 'Cloud Computing',
    description: 'Description for Service 2',
  },
  {
    imageUrl: 'assests/teaching.png',
    title: 'Courses Trainer',
    description: 'Description for Service 3',
  },
];

export default function Service() {
  return (
    <Container maxWidth="lg" className="pb-28">
      <h2 className="lg:text-5xl font-bold text-darkblue mb-4 text-center text-2xl">
        WE Provides
      </h2>
      <p className="text-lg font-light mb-12 text-center">
        We are ready to scale up your business with our great service.
      </p>
      <Grid container spacing={6} className="px-10">
        {services.map((service, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              sx={{
                borderRadius: '1rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                border: '1px solid #87CEFA',
                transition: 'transform 0.5s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <CardMedia
                component="img"
                alt={service.title}
                height="200"
                image={service.imageUrl}
                sx={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: '#1E3A8A',
                    paddingY: '1.75rem',
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                  }}
                >
                  {service.title}
                </Typography>
              </CardContent>
            </Card>

          </Grid>
        ))}
      </Grid>
    </Container>
  );
}