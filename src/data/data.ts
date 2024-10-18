import { User, ServerUser } from "./types.ts";

export const data:Map<string, ServerUser> = new Map();

export const addData = (id: string, value: User) => {
  data.set(id, { id, ...value});
};

export const getUser = (id: string) => {
  return data.get(id);
}

export const getAllUsers = () => {
  return Array.from(data.values());
};

export const deleteUser = (id: string) => {
  return data.delete(id);
}

export const isValidateUser = (user: User) => {
  return user.username && user.age && user.hobbies;
 }
