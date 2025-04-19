export const UserTypeEnum = {
  CLIENT: "client",
  DOCTOR: "doctor",
  ADMIN: "admin",
} as const;

export type UserTypeEnum = typeof UserTypeEnum[keyof typeof UserTypeEnum];