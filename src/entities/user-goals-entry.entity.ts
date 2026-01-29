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

@Entity({ name: 'user_goals_entries' })
@Index('idx_user_goals_entries_user_logged_at', ['user_id', 'logged_at'])
export class UserGoalsEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // decimals come back as strings in JS (TypeORM behavior)
  @Column({ type: 'decimal', nullable: true })
  calories_goal: string | null;

  @Column({ type: 'decimal', nullable: true })
  target_weight_goal_kg: string | null;

  @Column({ type: 'decimal', nullable: true })
  protein_goal_g: string | null;

  @Column({ type: 'decimal', nullable: true })
  fat_goal_g: string | null;

  @Column({ type: 'decimal', nullable: true })
  carbs_goal_g: string | null;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  logged_at: Date | null;
}
