import { check } from "express-validator";

export const UserValidator = validator([
  "firstName",
  "userName",
  "password",
  "company",
  "isAdmin",
]);
export const CompanyValidator = validator(["name"]);
export const CompanyPatchValidator = validator(["id", "data"]);
export const TaskValidator = validator(["companyId", "description"]);
export const LoginValidator = validator(["userName", "password"]);

function validator(requiredValues: string[]) {
  return requiredValues.map((requiredValue: string) =>
    check(requiredValue).notEmpty().withMessage(requiredMessage(requiredValue))
  );
}

function requiredMessage(attribute: string): string {
  return `${attribute} is required`;
}
