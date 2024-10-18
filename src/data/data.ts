import { User, ServerUser } from "./types.ts";

export const data:Map<string, ServerUser> = new Map();

export const addData = (id: string, value: User) => {
  data.set(id, { id, ...value});
};

export const getUser = (key: string) => {
  return data.get(key);
}

export const getAllUsers = () => {
  return Array.from(data.values());
};

export const isValidateUser = (user: User) => {
  return user.username && user.age && user.hobbies;
 }
