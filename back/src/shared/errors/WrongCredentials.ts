export class WrongCredentials extends Error {
  constructor() {
    super('Email/Password invalid!');
  }
}
