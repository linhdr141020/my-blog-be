import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { DateAudit } from 'src/util/date_audit.entity';

@Entity({ name: 'comments' })
export class Comment extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'text', nullable: true })
  text: string;

  @Column({ name: 'dateAndTimePublish', nullable: true })
  dateAndTimePublish: Date;

  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  user: number;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  post: number;
}
