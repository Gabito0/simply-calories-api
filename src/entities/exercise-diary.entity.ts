import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'exercise_diary' })
@Index('idx_exercise_diary_user_start_time', ['user_id', 'start_time'])
export class ExerciseDiary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // use Column so you can backdate; default now
  @Column({ type: 'timestamptz', default: () => 'now()' })
  start_time: Date;

  @Column({ type: 'timestamptz', nullable: true })
  end_time: Date | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}
