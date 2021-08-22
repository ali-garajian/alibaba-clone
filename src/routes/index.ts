import { Router } from 'express';
import { adminMW, loggedInMW } from './middleware';
import { login, logout } from './Auth';
import { getAllUsers, addOneUser, updateOneUser, deleteOneUser } from './Users';
import { getAllTickets } from './Tickets';
import { getAllCities } from './Cities';

// Auth router
const authRouter = Router();
authRouter.post('/login', login);
authRouter.get('/logout', logout);

// User-router
const userRouter = Router();
userRouter.get('/all', getAllUsers);
userRouter.post('/add', addOneUser);
userRouter.put('/update', updateOneUser);
userRouter.delete('/delete/:id', deleteOneUser);

// Ticket router
const ticketRouter = Router();
ticketRouter.get('/', getAllTickets);

// City router
const cityRouter = Router();
cityRouter.get('/', getAllCities);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/auth', authRouter);
baseRouter.use('/users', adminMW, userRouter);
baseRouter.use('/tickets', ticketRouter);
baseRouter.use('/cities', cityRouter);

export default baseRouter;
