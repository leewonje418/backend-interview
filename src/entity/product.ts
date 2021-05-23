import Gender from 'src/enum/Gender';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export default class Product {
    @PrimaryGeneratedColumn()
    idx!: number;
  
    @Column({
      type: 'varchar'
    })
    name!: string;
  
    @Column({
      type: 'varchar'
    })
    description!: string;
  
    @Column({
      type: 'varchar'
    })
    brand!: string;
  
    @Column({
      type: 'int'
    })
    price!: number;

    @Column({
      type: 'varchar'
    })
    size!: string;
    
    @Column({
      type: 'varchar'
    })
    color!: string;

    @Column({
      type: 'boolean',
      nullable: true
    })
    gender?: Gender | undefined;
}