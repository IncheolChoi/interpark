import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShowDto } from './dto/createShow.dto';
import { Show } from './entities/show.entity';

@Injectable()
export class ShowsService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
  ) {}

  async create(CreateShowDto: CreateShowDto): Promise<Show> {
    const show = this.showRepository.create(CreateShowDto);
    return await this.showRepository.save(show);
  }

  async findAll(): Promise<Show[]> {
    return this.showRepository.find();
  }

  async findByName(name: string): Promise<Show[]> {
    return this.showRepository.find({ where: { name } });
  }

  async findById(id: number): Promise<Show> {
    return this.showRepository.findOneBy({ id });
  }
}
