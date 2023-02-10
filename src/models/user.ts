import sequelize from "./index";
import { Model, DataTypes } from "sequelize";
interface UsersAttributes {
    // id: number | null;
    title: string;
    context: string;
    img: Blob;
}
export class Users extends Model<UsersAttributes> {
    public title!: string;
    public context!: string;
    public img!: Blob;
}
Users.init(
    {
        title: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        context: {
            type: DataTypes.STRING(60),
            allowNull: true,
        },
        img: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
    },
    {
        modelName: "Users",
        tableName: "Users",
        sequelize,
        freezeTableName: true,
        timestamps: true,
        updatedAt: "updateTimestamp",
    }
);
