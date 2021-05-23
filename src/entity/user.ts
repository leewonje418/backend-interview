import Role from 'src/enum/Role';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export default class User {
  @PrimaryColumn()
  id!: string;

  @Column({
    type: 'varchar',
  })
  password!: string;

  @Column({
    type: 'varchar'
  })
  name!: string;

  @Column({
    type: 'int'
  })
  role!: Role;
}