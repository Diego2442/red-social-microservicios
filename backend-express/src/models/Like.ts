import { Column, ForeignKey, Table } from "sequelize-typescript";
import User from "./User";
import { Model } from "sequelize-typescript";
import Post from "./Post";

@Table({ tableName: 'likes', timestamps: false })
class Like extends Model {
  @ForeignKey(() => User)
  @Column
  declare user_id: number;

  @ForeignKey(() => Post)
  @Column
  declare post_id: number;
}

export default Like;