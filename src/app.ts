import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());
app.use(express.json());
// app.use('/auth', authRoutes);
// app.use('/users', userRoutes);

export default app;
