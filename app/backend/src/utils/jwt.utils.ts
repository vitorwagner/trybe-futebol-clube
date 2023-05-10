import * as jwt from 'jsonwebtoken';

const jwtConfig: jwt.SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secret: jwt.Secret = process.env.JWT_SECRET || 'yourSecret';

export function createToken(email: string) {
  return jwt.sign(
    {
      email,
    },
    secret,
    jwtConfig,
  );
}

export function validateToken(token: string) {
  return jwt.verify(token, secret, jwtConfig);
}
