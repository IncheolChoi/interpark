import { Test, TestingModule } from '@nestjs/testing';
import { ShowsController } from './show.controller';

describe('ShowController', () => {
  let controller: ShowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShowsController],
    }).compile();

    controller = module.get<ShowsController>(ShowsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
