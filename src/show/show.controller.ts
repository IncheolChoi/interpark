import {
  Body,
  Query,
  Param,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateShowDto } from './dto/createShow.dto';
import { Show } from './entities/show.entity';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ShowsService } from './show.service';
import { Role } from 'src/user/types/userRole.type';

@Controller('shows')
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post()
  create(@Body() createShowDto: CreateShowDto): Promise<Show> {
    return this.showsService.create(createShowDto);
  }

  @Get()
  async findAll(): Promise<Show[]> {
    return this.showsService.findAll();
  }

  @Get('search')
  async search(@Query('name') name: string): Promise<Show[]> {
    return this.showsService.findByName(name);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Show> {
    return this.showsService.findById(id);
  }
}
