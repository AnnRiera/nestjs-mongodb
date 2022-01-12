import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({ description: 'the name of the brand' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'the image of the brand' })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
