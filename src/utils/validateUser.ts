import { User } from "../data/types";

export const isValidateFields = (user: User) => {
  const userFields = Object.keys(user);
  const fields = ['username', 'age', 'hobbies'];
  return userFields.length === fields.length && fields.every(field => user.hasOwnProperty(field));
}

export const isValidateTypes = (user: User) => {
  return (
    typeof user.username === 'string' &&
    typeof user.age === 'number' &&
    Array.isArray(user.hobbies) &&
    user.hobbies.every(hobby => typeof hobby === 'string')
  );
};
