import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ description: 'the name of the customer' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'the last name of the customer' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'the phone number of the customer' })
  @IsString()
  @IsPhoneNumber()
  phone: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
