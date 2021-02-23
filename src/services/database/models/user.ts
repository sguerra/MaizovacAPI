import { Model, Optional } from 'sequelize';
import { APIUser } from '../../../api/schema/types/user';

interface APIUserCreationAttributes extends Optional<APIUser, 'uuid'> {}

class User
    extends Model<APIUser, APIUserCreationAttributes>
    implements APIUser {
    username: string;
}

export default User;
