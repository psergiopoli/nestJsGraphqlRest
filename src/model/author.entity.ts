import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 300 })
  firstName: string;

  @Column({ length: 300 })
  lastName: string;

  @Column('int')
  points: number;

  @Column()
  isActive: boolean;

  @Column({unique: true})
  dogName: string;
}