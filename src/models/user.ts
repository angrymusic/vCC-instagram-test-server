import sequelize from "./index";
import { Model, DataTypes } from "sequelize";
interface UsersAttributes {
    name: string;
    title: string;
    context: string;
    img: string;
}
export class Users extends Model<UsersAttributes> {
    public name!: string;
    public title!: string;
    public context!: string;
    public img!: string;
}
Users.init(
    {
        name: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
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
