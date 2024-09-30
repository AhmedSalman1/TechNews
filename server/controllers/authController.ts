import crypto, { sign } from 'crypto';
import { SignInReq, SignInRes, SignUpReq, SignUpRes } from '../api';
import { db } from '../datastore';
import { CustomHandler, User } from '../types';
import { signJwt } from '../auth';

export const signIn: CustomHandler<SignInReq, SignInRes> = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.sendStatus(400);
  }

  const existing =
    (await db.getUserByEmail(login)) || (await db.getUserByUsername(login));
  if (!existing || existing.password !== hashPassword(password)) {
    return res.sendStatus(403);
  }

  const jwt = signJwt({ userId: existing.id });

  return res.status(200).send({
    user: {
      email: existing.email,
      firstName: existing.firstName,
      lastName: existing.lastName,
      id: existing.id,
      username: existing.username,
    },
    jwt,
  });
};

export const signUp: CustomHandler<SignUpReq, SignUpRes> = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  if (!firstName || !lastName || !username || !email || !password) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  const existing =
    (await db.getUserByEmail(email)) || (await db.getUserByUsername(username));
  if (existing) {
    return res.status(403).send({ error: 'User already exists' });
  }

  const user: User = {
    id: crypto.randomUUID(),
    firstName,
    lastName,
    username,
    email,
    password: hashPassword(password),
  };
  await db.createUser(user);
  const jwt = signJwt({ userId: user.id });
  return res.status(200).send({
    jwt,
  });
};

function hashPassword(password: string) {
  return crypto
    .pbkdf2Sync(password, 'salt', 1000, 64, 'sha512')
    .toString('hex');
}