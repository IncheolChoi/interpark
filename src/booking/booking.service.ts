import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';
import { Show } from 'src/show/entities/show.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async bookShow(createBookingDto: CreateBookingDto): Promise<Booking> {
    const { userId, showId } = createBookingDto;

    // 예매 시 공연정보 확인
    const show = await this.showRepository.findOne({ where: { id: showId } });
    if (!show) {
      throw new NotFoundException('공연을 찾을 수 없습니다.');
    }

    // 공연의 가격을 가져옴 30000포인트 균일가
    const showPrice = 30000;

    // 사용자가 존재하는지 확인
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    // 사용자의 보유 포인트 확인
    if (user.point < showPrice) {
      throw new BadRequestException('포인트가 부족합니다.');
    }

    // 예약이 이미 만석인 경우 확인
    const bookingsCount = await this.bookingRepository.count({
      where: { showId },
    });
    if (bookingsCount >= show.seats) {
      throw new BadRequestException('공연자리는 만석입니다.');
    }

    // 공연을 예매하면 사용자의 포인트 차감
    user.point -= showPrice;
    await this.userRepository.save(user);

    // 예매 내역 생성 및 저장
    const booking = this.bookingRepository.create({ userId, showId, show });
    return this.bookingRepository.save(booking);
  }

  async getUserBookings(userId: number): Promise<Booking[]> {
    // 현재 사용자의 예매 내역 조회
    return this.bookingRepository.find({
      where: { userId },
      relations: ['show'], // 공연 정보를 함께 로드
    });
  }
}
