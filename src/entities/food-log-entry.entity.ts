import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  Index,
  CreateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { FoodItem } from './food-item.entity';
import { FoodLogUnit } from '../enums/food-log-unit.enum';
import { MealType } from '../enums/meal-type.enum';

@Entity({ name: 'food_log_entries' })
@Index('idx_food_log_entries_user_logged_at', ['user_id', 'logged_at'])
export class FoodLogEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('uuid', { nullable: true })
  food_item_id: string | null;

  // If the food item is deleted later, keep the log entry (history) and null the FK
  @ManyToOne(() => FoodItem, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'food_item_id' })
  food_item: FoodItem | null;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  logged_at: Date;

  @Column({ type: 'enum', enum: MealType })
  meal_type: MealType;

  @Column({ type: 'decimal' })
  quantity: string;

  @Column({ type: 'enum', enum: FoodLogUnit })
  unit: FoodLogUnit;

  // Snapshot macros at time of logging
  @Column({ type: 'decimal' })
  calories: string;

  @Column({ type: 'decimal' })
  protein_g: string;

  @Column({ type: 'decimal' })
  carbs_g: string;

  @Column({ type: 'decimal' })
  fat_g: string;

  @Column({ type: 'decimal', nullable: true })
  grams: string | null;

  @Column({ type: 'decimal', nullable: true })
  milliliters: string | null;
}
