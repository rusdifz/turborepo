enum GenderEnum {
  MALE = "male",
  FEMALE = "faemale",
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  fullname: string;
  password: string;
  profile_picture: string;
  age: number;
  gender: GenderEnum;
  address: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  created_by: string;
  updated_by: string;
}
