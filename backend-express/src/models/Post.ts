import { Table, Column, DataType, Model, HasMany, BelongsTo, ForeignKey, AllowNull, Unique, Default, BelongsToMany} from 'sequelize-typescript'
import User from './User'
import Like from './Like'


@Table({
    tableName: 'posts'
})

class Post extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.TEXT
    })
    declare content: string 

    /* @AllowNull(false)
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW 
    })
    declare date_publish: string */

    @ForeignKey(() => User)
    declare user_id: number

    @BelongsTo(() => User)
    declare user: User

    @BelongsToMany(() => User, () => Like)
    declare likedBy: User[];

}

export default Post