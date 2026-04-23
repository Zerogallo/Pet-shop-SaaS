import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
  name: string;

  @Column()
  category: string; // ração, medicamento, acessório

  @Column('decimal')
  price: number;

  @Column()
  stock: number;

  @Column({ nullable: true })
  description: string;
}