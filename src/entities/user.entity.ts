import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { UserGoalsEntry } from './user-goals-entry.entity';
import { WeightEntry } from './weight-entry.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column({ default: false })
  verified: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @Column({ type: 'text', nullable: true })
  subject_identifier: string | null;

  @OneToOne(() => UserProfile, (profile) => profile.user)
  profile: UserProfile | null;

  @OneToMany(() => UserGoalsEntry, (entry) => entry.user)
  goals_entries: UserGoalsEntry[];

  @OneToMany(() => WeightEntry, (entry) => entry.user)
  weight_entries: WeightEntry[];
}
