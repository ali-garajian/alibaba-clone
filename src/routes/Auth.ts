import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';

import UserDao from '@daos/User/UserDao.mock';
import { JwtService } from '@shared/JwtService';
import { cookieProps, pwdSaltRounds } from '@shared/constants';
import { IResponseModel } from '@entities/base/ResponseModel';
import { EMessages } from '@shared/messages';

const userDao = new UserDao();
const jwtService = new JwtService();
const { BAD_REQUEST, OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = StatusCodes;

export async function login(req: Request, res: Response<IResponseModel>) {
  // Check email and password present
  const { email, password, role } = req.body;
  if (!(email && password)) {
    return res.status(BAD_REQUEST).json({
      msg: EMessages.UsernameOrPasswordMissing,
    });
  }

  // Fetch user
  const user = await userDao.getOne(email);
  if (!user) {
    return res.status(UNAUTHORIZED).json({
      msg: EMessages.LoginFailed,
    });
  }

  // Check password
  const pwdPassed = await bcrypt.compare(password, user.pwdHash);
  if (!pwdPassed) {
    return res.status(UNAUTHORIZED).json({
      msg: EMessages.LoginFailed,
    });
  }

  // Check user's role
  if (user.role !== role) {
    return res.status(UNAUTHORIZED).json({
      msg: EMessages.Unauthorized,
    });
  }

  // Setup Admin Cookie
  const jwt = await jwtService.getJwt({
    id: user.id,
    role: user.role,
  });
  const { key, options } = cookieProps;
  res.cookie(key, jwt, options);
  res.cookie('logged-in', true, {
    maxAge: options.maxAge,
  });

  // Return
  return res.status(OK).end();
}

export async function register(req: Request, res: Response<IResponseModel>) {
  try {
    const { email, password, role } = req.body;
    if (!(email && password)) {
      return res.status(BAD_REQUEST).json({
        msg: EMessages.UsernameOrPasswordMissing,
      });
    }

    const hashedPassword = await bcrypt.hash(password, pwdSaltRounds);
    await userDao.add({
      email,
      pwdHash: hashedPassword,
      name: email,
      role,
    });

    return res.status(OK).end();
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      msg: EMessages.InternalServerError,
    });
  }
}

export function logout(req: Request, res: Response) {
  const { key, options } = cookieProps;
  res.clearCookie(key, options);
  res.clearCookie('logged-in', { maxAge: options.maxAge });

  return res.status(OK).end();
}
