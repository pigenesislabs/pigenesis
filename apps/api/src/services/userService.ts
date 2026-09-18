import {
  deleteUser,
  findAllUsers,
  findUserByEmail,
  findUserById,
  insertUser,
  updateUser,
  type UserRecord,
  type UserStatus,
} from "./userRepository";

export type CreateUserInput = {
  id: string;
  email: string;
  displayName: string;
  status: UserStatus;
};

export type UpdateUserInput = {
  email: string;
  displayName: string;
  status: UserStatus;
};

export async function getUsers(): Promise<UserRecord[]> {
  return findAllUsers();
}

export async function getUserById(
  userId: string
): Promise<UserRecord | null> {
  return findUserById(userId);
}

export async function createUser(
  input: CreateUserInput
): Promise<UserRecord> {
  const existingUser = await findUserByEmail(input.email);

  if (existingUser) {
    throw new Error("A user with this email already exists.");
  }

  return insertUser(input);
}

export async function editUser(
  userId: string,
  input: UpdateUserInput
): Promise<UserRecord | null> {
  const existingUser = await findUserByEmail(input.email);

  if (
    existingUser &&
    existingUser.id !== userId
  ) {
    throw new Error("A user with this email already exists.");
  }

  return updateUser(userId, input);
}

export async function removeUser(
  userId: string
): Promise<boolean> {
  return deleteUser(userId);
}