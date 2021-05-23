import { Length, validate } from 'class-validator';
import HttpError from '../error/httpError';

export default class reviewDTO {
  @Length(1, 250)
  readonly content!: string;

  readonly productIdx!: number;  

  constructor(body: reviewDTO) {
    this.content = body.content;
    this.productIdx = body.productIdx;
  }

  async validate(): Promise<void> {
    const errors = await validate(this);

    if (errors.length > 0) {
      throw new HttpError(400, '검증 오류');
    }
  }
}