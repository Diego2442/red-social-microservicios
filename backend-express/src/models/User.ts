import { Table, Column, DataType, Model, HasMany, BelongsTo, ForeignKey, AllowNull, Unique, BelongsToMany} from 'sequelize-typescript'
import Post from './Post'
import Like from './Like'


@Table({
    tableName: 'users'
})

class User extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING(150)
    })
    declare full_name: string 

    @Unique(true)
    @AllowNull(false)
    @Column({
        type: DataType.STRING(60)
    })
    declare user_name: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(60)
    })
    declare password: string

    @AllowNull(false)
    @Column({
        type: DataType.DATE()
    })
    declare birth_date: string

    @HasMany(() => Post, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    declare posts: Post[]

    @BelongsToMany(() => Post, () => Like)
    declare likedPosts: Post[];
    
}

export default User