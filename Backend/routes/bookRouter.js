import express from 'express';
import {addBook } from '../controllers/bookController.js'; 
import jwt from 'jsonwebtoken';

const router = express.Router();

 
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  

  if (!token) {
    return res.status(401).json({ message: 'authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  
    req.user = decoded;  
    next();  
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

router.post('/books/add', authenticateToken, addBook);

 
export default router;
