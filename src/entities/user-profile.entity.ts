import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Sex } from '../enums/sex.enum';

@Entity({ name: 'user_profiles' })
export class UserProfile {
  // PK = FK to users.id (1:1 enforced)
  @PrimaryColumn('uuid')
  user_id: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Optional profile fields
  @Column({ nullable: true })
  first_name: string | null;

  @Column({ nullable: true })
  last_name: string | null;

  @Column({ type: 'date', nullable: true })
  birth_date: Date | null;

  @Column({ type: 'enum', enum: Sex, nullable: true })
  sex: Sex | null;

  @Column({ type: 'int', nullable: true })
  height_cm: number | null;
}
