import * as bcrypt from 'bcrypt';

async function compare(data: string, encrypted: string): Promise<boolean> {
  return await bcrypt.compare(data, encrypted);
}

async function hash(data: string | Buffer, saltOrRounds = 10) {
  return await bcrypt.hash(data, saltOrRounds);
}

export const cryptography = {
  hash,
  compare,
};
