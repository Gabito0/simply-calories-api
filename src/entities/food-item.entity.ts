import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { ServingSizeUnit } from '../enums/serving-size-unit.enum';

@Entity({ name: 'food_items' })
@Index('idx_food_items_barcode', ['barcode'], { unique: true })
@Index('idx_food_items_created_by_user_id', ['created_by_user_id'])
export class FoodItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // custom foods: who created it (nullable for global foods)
  @Column('uuid', { nullable: true })
  created_by_user_id: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by_user_id' })
  created_by_user: User | null;

  // barcode foods (nullable for custom items)
  @Column({ type: 'text', nullable: true })
  barcode: string | null;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  brand: string | null;

  // Serving size for the nutrition numbers below

  @Column({ type: 'decimal', nullable: true })
  serving_size_amount: string | null;

  @Column({ type: 'enum', enum: ServingSizeUnit, nullable: true })
  serving_size_unit: ServingSizeUnit | null;

  // Nutrition per serving (decimals come back as strings)
  @Column({ type: 'decimal', nullable: true })
  calories: string | null;

  @Column({ type: 'decimal', nullable: true })
  protein_g: string | null;

  @Column({ type: 'decimal', nullable: true })
  carbs_g: string | null;

  @Column({ type: 'decimal', nullable: true })
  fat_g: string | null;

  @Column({ type: 'text', nullable: true })
  source_ref: string | null;

  @Column({ type: 'text', nullable: true })
  source: string | null;
}
