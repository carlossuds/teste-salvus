import base64ToImage from 'base64-to-image';
import fs from 'fs';
import path from 'path';
import File from '../models/File';

class FileController {
  async store(req, res) {
    const filepath = path.join(process.cwd(), '/tmp/uploads');
    const { base64 } = req.body;
    const name = Date.now() + '.jpg';

    fs.writeFile(filepath + name, base64, 'base64', function (err, data) {
      if (err) {
        console.log('err', err);
      }
      console.log(data, 'data');
    });

    const file = await File.create({
      name,
      user_id: req.userId,
    });

    return res.json(file);
  }

  async index(req, res) {
    const userFiles = await File.findAll({ where: { user_id: req.userId } });

    return res.json(userFiles);
  }
}

export default new FileController();
