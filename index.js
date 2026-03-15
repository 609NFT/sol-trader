const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4003;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API endpoints
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    app: 'Sol Trader Jupiter Swap',
    timestamp: new Date().toISOString() 
  });
});

// Catch all - serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Sol Trader running on port ${PORT}`);
  console.log(`📱 App: https://sol-trader.vibekit.bot`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🔴 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('💀 Process terminated');
  });
});