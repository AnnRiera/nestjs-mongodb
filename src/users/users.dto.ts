import { IsString, IsNotEmpty } from 'class-validator';

import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'the e-mail of the user' })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: 'the password of the user' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ description: 'the role of the user' })
  @IsString()
  @IsNotEmpty()
  readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
