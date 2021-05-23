import { Length, validate } from 'class-validator';
import Gender from 'src/enum/Gender';
import HttpError from '../error/httpError';

export default class productDTO {
  @Length(1, 50)
  readonly name!: string;

  @Length(1, 300)
  readonly description!: string;

  @Length(1, 50)
  readonly brand!: string; 
  
  readonly price!: number;

  readonly size!: string;

  readonly color!: string;

  readonly gender!: Gender;

  constructor(body: productDTO) {
    this.name = body.name;
    this.description = body.description;
    this.brand = body.brand;
    this.price = body.price;
    this.size = body.size;
    this.color = body.color;
    this.gender = body.gender;
  }

  async validate(): Promise<void> {
    const errors = await validate(this);

    if (errors.length > 0) {
      throw new HttpError(400, '검증 오류');
    }
  }
}