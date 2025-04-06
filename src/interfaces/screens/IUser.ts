export interface IUser {
  id: number;
  full_name: string;
  email: string;
  password: string;
  is_verified: boolean;
  status: boolean;
  created_at: Date;
  update_at: Date;
}
