import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowsController } from './show.controller';
import { ShowsService } from './show.service';
import { Show } from './entities/show.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Show, User])],
  controllers: [ShowsController],
  providers: [ShowsService, RolesGuard],
})
export class ShowsModule {}
