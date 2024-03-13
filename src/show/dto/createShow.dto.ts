import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateShowDto {
  @IsString()
  @IsNotEmpty({ message: '공연 이름을 입력해주세요.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '공연 설명을 입력해주세요.' })
  description: string;

  @IsArray()
  @IsNotEmpty({ message: '공연 날짜와 시간을 입력해주세요.' })
  dateTime: Date[];

  @IsString()
  @IsNotEmpty({ message: '공연 장소를 입력해주세요.' })
  location: string;

  @IsString()
  @IsNotEmpty({ message: '좌석 정보를 입력해주세요.' })
  seats: number;

  @IsString()
  @IsNotEmpty({ message: '공연 이미지를 입력해주세요.' })
  image: string;

  @IsString()
  @IsNotEmpty({ message: '공연 카테고리를 입력해주세요.' })
  category: string;
}
