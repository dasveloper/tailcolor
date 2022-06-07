import { getColor, isValid } from '@utils/colors';
import redis from '@utils/redis';

async function handler(req, res) {
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

    const str = strippedColor;

    await redis.lpush('colors', str);

    return res.status(200).json({ color: strippedColor });
  }

  // Handle any other HTTP method
  return res.status(405).json({ message: 'Method not valid' });
}

export default handler;
