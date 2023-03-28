import { BaseEntity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class DateAudit extends BaseEntity {
  @CreateDateColumn({
    nullable: true,
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date;
}
