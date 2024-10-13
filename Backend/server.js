import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';   
import bookRouter from './routes/bookRouter.js';   

dotenv.config();   

const app = express();
app.use(express.json());  

 
const port = process.env.PORT || 3000;
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log('Connection to MongoDB successful');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}
main();

 
app.use('/api/users', userRouter);   
app.use('/api/books', bookRouter);  

 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});

 
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
