import { check } from "express-validator";

export const UserValidator = validator(["firstName", "userName", "password"])

function validator (requiredValues: string[]) {
  return requiredValues.map((requiredValue: string) =>
    check(requiredValue).notEmpty().withMessage(requiredMessage(requiredValue))
  );
}

function requiredMessage(attribute: string): string {
  return `${attribute} is required`;
}

