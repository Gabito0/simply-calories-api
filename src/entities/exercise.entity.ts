import {
  Entity,
  PrimaryGeneratedColumn,
  Index,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './user.entity';
import { ExerciseType } from '../enums/exercise-type.enum';
import { MuscleGroup } from '../enums/muscle-group.enum';

@Entity({ name: 'exercise' })
@Index('uq_exercise_creator_name', ['created_by_user_id', 'name'], {
  unique: true,
})
@Index('idx_exercise_created_by_user_id', ['created_by_user_id'])
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'enum', enum: ExerciseType })
  exercise_type: ExerciseType;

  @Column({ type: 'enum', enum: MuscleGroup, nullable: true })
  muscle_group: MuscleGroup | null;

  @Column('uuid', { nullable: true })
  created_by_user_id: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by_user' })
  created_by_user: User | null;
}
