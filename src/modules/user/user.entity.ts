import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../post/post.entity';
import { Comment } from '../comment/commnet.entity';
import { Like } from '../like/like.entity';
import { DateAudit } from 'src/util/date_audit.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MANAGER = 'manager',
}

@Entity({ name: 'users' })
export class User extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'firstName', nullable: true })
  firstName: string;

  @Column({ name: 'lastName', nullable: true })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password', nullable: true })
  password: string;

  @Column({
    default:
      'https://firebasestorage.googleapis.com/v0/b/post-images-storage.appspot.com/o/%2Fposts%2Fsquare_avatar.png?alt=media&token=1bf5a1c9-9691-45dc-bd26-b2d1753f7c53',
  })
  profilePicture: string;

  @Column({ name: 'role', default: UserRole.USER })
  role: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  likedPosts: Like[];
}
