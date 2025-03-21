import { Length, validate } from 'class-validator';
import HttpError from '../error/httpError';

export default class LoginDTO {
  @Length(2, 100)
  readonly id!: string;
  readonly pw!: string;

  constructor(body: LoginDTO) {
    this.id = body.id;
    this.pw = body.pw;
  }

  async validate(): Promise<void> {
    const errors = await validate(this);

    if (errors.length > 0) {
      throw new HttpError(400, '검증 오류');
    }
  }
}