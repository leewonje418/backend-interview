import { Column, Entity, RelationId, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import Product from './product';
import User from './user';

@Entity('review')
export default class Review {
    @PrimaryGeneratedColumn()
    idx!: number;

    @RelationId((review: Review) => review.user)
    @Column({
        name: 'user_id',
    })
    userId!: string;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @RelationId((review: Review) => review.product)
    @Column({
        name: 'product_id',
    })
    productIdx!: number;

    @ManyToOne(type => Product)
    @JoinColumn({ name: 'product_id' })
    product!: Product;

    @Column({
        type: 'varchar'
    })
    content!: string;

    @Column({
        type: 'datetime'
    })
    createdAt: Date = new Date();    
}