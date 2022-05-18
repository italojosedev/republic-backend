// import { IBoatCategorie } from './index';

export interface IUser {
  id?: number;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  republic?: number;
  profileImage?: string;
  phone?: string;
  isAdmin: boolean;
  isActived: true;
}
export interface IUserUpdate {
  id?: number;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  profileImage?: string;
  bornDate?: Date;
  documentNumber?: string;
  phone?: string;
  acceptedTermsOfUse?: boolean;
  acceptedPrivacyPolicy?: boolean;
  boatCategories?: number[],
  addressCep?: string;
  addressStreet?: string;
  addressNumber?: string;
  addressComplement?: string;
  addressDistrict?: string;
  addressCity?: string;
  addressState?: string;
}
