import { User, ServerUser } from './types';

export const data:Map<string, ServerUser> = new Map();

export const addData = (id: string, value: User) => {
  data.set(id, { id, ...value});
};

export const getUser = (id: string) => {
  return data.get(id);
};

export const getAllUsers = () => {
  return Array.from(data.values());
};

export const updateUser = (id: string, user: ServerUser, updateUser: User) => {
  data.set(id, { ...user, ...updateUser });
};

export const deleteUser = (id: string) => {
  return data.delete(id);
};
