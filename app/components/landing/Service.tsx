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
    <Container maxWidth="lg" className="pt-20 pb-28">
      <h2 className="text-5xl font-bold text-darkblue mb-4 text-center">
        WE Provides
      </h2>
      <p className="text-lg font-light mb-12 text-center">
        We are ready to scale up your business with our great service.
      </p>
      <Grid container spacing={6} className="px-10">
        {services.map((service, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card className="rounded-2xl shadow-2xl border border-lightblue transform transition duration-500 hover:scale-105 ">
              <CardMedia
                component="img"
                alt={service.title}
                height="200"
                image={service.imageUrl}
                className="rounded-t-2xl"
              />
              <CardContent className="text-center">
                <Typography variant="h5" className="text-darkblue py-7 text-xl font-bold">
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