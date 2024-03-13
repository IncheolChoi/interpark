import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @UseGuards(AuthGuard('jwt')) // 예매는 인증된 사용자만 가능하도록 설정
  async bookShow(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
    const showPrice = 30000; // 가격은 고정
    const userPoints = 1000000; // 사용자 보유 포인트

    // 사용자의 보유 포인트가 공연 가격보다 적으면 예외 발생
    if (userPoints < showPrice) {
      throw new BadRequestException('보유 포인트가 부족합니다.');
    }
    return this.bookingService.bookShow(createBookingDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt')) // 예매 내역 확인은 인증된 사용자만 가능하도록 설정
  async getUserBookings(@Request() req): Promise<Booking[]> {
    return this.bookingService.getUserBookings(req.user.id);
  }
}
