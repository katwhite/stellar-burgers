import { ROLE } from './constants';

export type Role = (typeof ROLE)[keyof typeof ROLE];

export type User = {
  id: number;
  name: string;
  login: string;
  role: Role;
};
