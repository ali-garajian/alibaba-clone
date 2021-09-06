import { Router } from 'express';
import { adminMW, loggedInMW } from './middleware';
import { login, logout, register } from './Auth';
import { getAllUsers, addOneUser, updateOneUser, deleteOneUser } from './Users';
import {
  getAllTicketsAndDates,
  getAllTickets,
  deleteTickets,
  createTicket,
} from './Tickets';
import { getAllCities } from './Cities';
import { getAirlinesAsOptions } from './Airlines';

// Auth router
const authRouter = Router();
authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.get('/logout', logout);

// User-router
const userRouter = Router();
userRouter.get('/all', getAllUsers);
userRouter.post('/add', addOneUser);
userRouter.put('/update', updateOneUser);
userRouter.delete('/delete/:id', deleteOneUser);

// Ticket router
const ticketRouter = Router();
ticketRouter.get('/client', getAllTicketsAndDates);
ticketRouter.get('/admin', adminMW, getAllTickets);
ticketRouter.delete('/admin', adminMW, deleteTickets as any);
ticketRouter.post('/admin', adminMW, createTicket);

// City router
const cityRouter = Router();
cityRouter.get('/', getAllCities);

// Airline router
const airlineRouter = Router();
airlineRouter.get('/admin', adminMW, getAirlinesAsOptions);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/auth', authRouter);
baseRouter.use('/users', adminMW, userRouter);
baseRouter.use('/tickets', ticketRouter);
baseRouter.use('/cities', cityRouter);
baseRouter.use('/airlines', airlineRouter);

export default baseRouter;
