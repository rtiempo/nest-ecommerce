export class CreateUserDto {
  name: string;
  contact: number;
  email: string;
}

export class UpdateUserDto extends CreateUserDto {
  gender: string;
  birthDate: Date;
  addresses: string[];
}
