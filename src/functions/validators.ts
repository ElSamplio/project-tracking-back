import { check } from "express-validator";

export const UserValidator = validator([
  "firstName",
  "userName",
  "password",
  "company",
]);
export const CompanyValidator = validator(["name"]);
export const CompanyPatchValidator = validator(["id", "data"]);

function validator(requiredValues: string[]) {
  return requiredValues.map((requiredValue: string) =>
    check(requiredValue).notEmpty().withMessage(requiredMessage(requiredValue))
  );
}

function requiredMessage(attribute: string): string {
  return `${attribute} is required`;
}
