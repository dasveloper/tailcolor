import fs from 'fs';
import path from 'path';

export const readFileData = (file) => {
  const filePath = path.join(process.cwd(), file);
  const data = fs.readFileSync(filePath, 'utf-8').split('\r\n');
  data.pop();
  return data;
};

export const writeFileData = (file, data) => {
  const filePath = path.join(process.cwd(), file);
  fs.appendFileSync(filePath, data);
};
