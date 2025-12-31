import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});