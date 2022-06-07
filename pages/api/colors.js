import { getColor, isValid } from '@utils/colors';
import { writeFileData, readFileData } from '@utils/fileReader';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { color } = req.body;

    if (!color) {
      return res.status(409).json({ message: 'Color not valid' });
    }
    if (!isValid(color)) {
      return res.status(409).json({ message: 'Color not valid' });
    }

    const hex = getColor(color).hex();

    const strippedColor = hex.slice(1);

    const str = `${strippedColor}\r\n`;
    writeFileData('colors.txt', str);
    return res.status(200).json({ color: strippedColor });
  }
  if (req.method === 'GET') {
    const colors = readFileData('colors.txt').slice(0, 20);
    return res.status(200).json({ colors });
  }

  // Handle any other HTTP method
  return res.status(405).json({ message: 'Method not valid' });
}
