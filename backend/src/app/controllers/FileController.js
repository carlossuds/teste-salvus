import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    console.log(req.file);

    const file = await File.create({
      name,
      path,
      user_id: req.userId,
    });

    return res.json(file);
  }

  async index(req, res) {
    const userFiles = File.findAll({ where: { user_id: req.userId } });
  }
}

export default new FileController();
