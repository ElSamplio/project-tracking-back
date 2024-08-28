import CompanyModel from "../models/company.model";
import { Company } from "../types/company";

export const createCompany = async (company: Company): Promise<Company> => {
  try {
    const createdCompany = (await CompanyModel.create(company)) as unknown as Company;
    return createdCompany;
  } catch (error) {
    throw error;
  }
};

export const findCompanyById = async (id: String) => {
  try {
    return await CompanyModel.findById(id);
  } catch (error) {
    throw error;
  }
};

export const findCompanies = async (filter: Object) => {
  try {
    return await CompanyModel.find(filter);
  } catch (error) {
    throw error;
  }
};

export const updateCompany = async (id: String, company: Company) => {
  try {
    const createdCompany = await CompanyModel.replaceOne(
      { _id: id },
      { ...company }
    );
    return createdCompany;
  } catch (error) {
    throw error;
  }
};
