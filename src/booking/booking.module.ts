import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { BookingsController } from './booking.controller';
import { BookingService } from './booking.service';
import { Show } from 'src/show/entities/show.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Show, User])],
  controllers: [BookingsController],
  providers: [BookingService],
})
export class BookingModule {}
