export const AllowedBorrowingDays = 10;
export const PenaltyPerDay = 5;

export enum WeekendsType {
  Type1 = 1, // Saturday and Sunday
  Type2 = 2, // Friday and Saturday
}

export interface Contact {
  id: number;
  name: string;
}

export interface Country {
  id: number;
  name: string;
  currencySymbol: string;
  currencyName: string;
  flag: string;
  weekend: number;
  holiDays: string[];
  penaltyPerDay: number;
}

export interface IBookBorrow {
  bookBorrowDate: Date | null;
  bookReturnDate: Date | null;
  country: Country | null;
  bookPhotoFront: string | null;
  bookPhotoBack: string | null;
  randomText: string | undefined;
}
