import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { DateAudit } from 'src/util/date_audit.entity';

@Entity({ name: 'likes' })
export class Like extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likedPosts, { eager: true })
  user: number;

  @ManyToOne(() => Post, (post) => post.userLikes, { onDelete: 'CASCADE' })
  post: number;
}
