export interface IEmployee {
  name: string;
  email: string;
  password: string;
  role: string;
  date_hired: Date;
  date_fired?: Date;
  restaurant_id: string;
}
