import fs from 'fs';

export const readFileData = (file) => {
  const data = fs.readFileSync(file, 'utf-8').split('\r\n');
  data.pop();
  return data;
};

export const writeFileData = (file, data) => {
  fs.appendFileSync(file, data);
};
