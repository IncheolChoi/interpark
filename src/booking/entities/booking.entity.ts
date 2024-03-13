import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Show } from 'src/show/entities/show.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  showId: number;

  @ManyToOne(() => Show)
  show: Show;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  bookingTime: Date;
  //공연가격
  @Column({ type: 'int' })
  showPrice: number;
}
