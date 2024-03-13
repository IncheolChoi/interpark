import { IsInt } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  showId: number;

  @IsInt()
  userId: number;
}
