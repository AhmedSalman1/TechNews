import crypto from 'crypto';
import { SignInReq, SignInRes, SignUpReq, SignUpRes } from '../api';
import { db } from '../datastore';
import { CustomHandler, User } from '../types';

export const signIn: CustomHandler<SignInReq, SignInRes> = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.sendStatus(400);
  }

  const existing =
    (await db.getUserByEmail(login)) || (await db.getUserByUsername(login));
  if (!existing || existing.password !== password) {
    return res.sendStatus(403);
  }

  return res.status(200).send({
    email: existing.email,
    firstName: existing.firstName,
    lastName: existing.lastName,
    id: existing.id,
    username: existing.username,
  });
};

export const signUp: CustomHandler<SignUpReq, SignUpRes> = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  if (!firstName || !lastName || !username || !email || !password) {
    return res.status(400).send('All fields are required');
  }

  const existing =
    (await db.getUserByEmail(email)) || (await db.getUserByUsername(username));
  if (existing) {
    return res.status(403).send('User already exists');
  }

  const user: User = {
    id: crypto.randomUUID(),
    firstName,
    lastName,
    username,
    email,
    password,
  };
  await db.createUser(user);
  return res.sendStatus(200);
};
