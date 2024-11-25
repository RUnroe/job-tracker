import { ApplicationStatus } from "./ApplicationStatus";


export default interface Application {
  ID?: string;
  userId?: string;
  company: string;
  position: string;
  location: string;
  isRemote: boolean;
  status: ApplicationStatus;
  salary: string;
  listingLink: string;
  technologies: string[];
  companyInfo: string;
  roleInfo: string;
  dateApplied: string;
  dateUpdated: string;
}