const request = require('supertest');
const express = require('express');

// Mock app for testing
const app = express();

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Vanigan API is running',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

describe('Health Check Endpoint', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
  });

  it('should return correct status', async () => {
    const response = await request(app).get('/health');
    expect(response.body.status).toBe('OK');
  });

  it('should include uptime', async () => {
    const response = await request(app).get('/health');
    expect(response.body).toHaveProperty('uptime');
    expect(typeof response.body.uptime).toBe('number');
  });

  it('should include timestamp', async () => {
    const response = await request(app).get('/health');
    expect(response.body).toHaveProperty('timestamp');
  });
});
