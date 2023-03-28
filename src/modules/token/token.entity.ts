import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { DateAudit } from 'src/util/date_audit.entity';

@Entity({ name: 'tokens' })
export class Token extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'refreshToken', nullable: true })
  refreshToken: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
