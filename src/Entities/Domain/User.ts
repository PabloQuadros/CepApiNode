import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    Id: string;
  
    @CreateDateColumn({ type: 'timestamp with time zone' , default: 'now()' })
    CreatedDate: Date;
  
    @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
    LastUpdatedDate: Date | null;
  
    @Column({ type: 'varchar', length: 255 })
    Name: string;
  
    @Column({ type: 'varchar', length: 255, unique: true })
    Email: string;
  
    @Column({type: 'text'})
    Password: string;
  
    @Column({ type: 'timestamp with time zone', nullable: true })
    BirthDay: Date | null;
  
    @Column({type: 'varchar', length: 255, nullable: true })
    Sex: string | null;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    Role: string | null;
}