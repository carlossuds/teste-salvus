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
        birthday: Sequelize.DATE,
        phone: Sequelize.STRING,
        role: Sequelize.STRING,
        specialty: Sequelize.STRING,
        experience: Sequelize.INTEGER,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        displacement: Sequelize.INTEGER,
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

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
export default User;
