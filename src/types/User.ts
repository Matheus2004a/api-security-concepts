export interface CreateUser {
  name: string;
  photo?: string;
  street: string;
  street_number: number;
  street_comp?: string;
  date_open: Date;
  date_close: Date;
}
