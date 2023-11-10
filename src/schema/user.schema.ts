import { TypeOf, object, string } from "zod";

export const createUserSchema = object({
  body: object({
    email: string({
      required_error: "Email is Required",
    }).email({
      message: "This Email is Invalid",
    }),
    password: string({
      required_error: "Password Field is Required.",
    }).min(6, {
      message: "Password Minimum Length is 6",
    }),
    passwordConfirmation: string({
      required_error: "Password Confirmation Is Required",
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords Don't Match.",
    path: ["passwordConfirmation"],
  }),
});

export const verfiyUserSchema = object({
  body: object({
    email: string({
      required_error: "Email is Required",
    }).email({
      message: "This Email is Invalid",
    }),
    password: string({
      required_error: "Password Field is Required.",
    }).min(6, {
      message: "Password Minimum Length is 6",
    }),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
export type VerifyUserInput = TypeOf<typeof verfiyUserSchema>["body"];
