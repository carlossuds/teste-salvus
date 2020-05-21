import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        name: Sequelize.STRING,
        age: Sequelize.INTEGER,
        phone: Sequelize.STRING,
        role: Sequelize.STRING,
        experience: Sequelize.INTEGER,
      },
      { sequelize }
    );
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  /*static associate(models) {
    this.hasMany(models.File, { foreignKey: 'user_id' });
  }*/

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
export default User;
