import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';

import { User } from './user.entity';

@Entity({ name: 'weight_entries' })
@Index('idx_weight_entries_user_measured_at', ['user_id', 'measured_at'])
export class WeightEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'decimal' })
  weight_kg: string;

  @CreateDateColumn({ type: 'timestamptz' })
  measured_at: Date;
}
