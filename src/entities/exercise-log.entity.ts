import {
  Entity,
  Column,
  JoinColumn,
  Index,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Exercise } from './exercise.entity';
import { ExerciseDiary } from './exercise-diary.entity';

@Entity({ name: 'exercise_log' })
@Index('idx_exercise_log_user_logged_at', ['user_id', 'logged_at'])
@Index('idx_exercise_log_diary', ['exercise_diary_id'])
export class ExerciseLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('uuid')
  exercise_diary_id: string;

  @ManyToOne(() => ExerciseDiary, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'exercise_diary_id' })
  exercise_diary: ExerciseDiary;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  logged_at: Date;

  @Column('uuid')
  exercise_id: string;

  @ManyToOne(() => Exercise, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

  @Column({ type: 'int', nullable: true })
  reps: number | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ type: 'decimal', nullable: true })
  weight: string | null;

  @Column({ type: 'int', nullable: true })
  time_seconds: number | null;

  @Column({ type: 'decimal', nullable: true })
  distance: string | null;
}
