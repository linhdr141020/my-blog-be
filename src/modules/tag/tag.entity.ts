import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { DateAudit } from 'src/util/date_audit.entity';

@Entity({ name: 'tags' })
export class Tag extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'color', nullable: true })
  color: string;

  @Column({ name: 'description', nullable: true })
  description: string;
}
