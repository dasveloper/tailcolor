import Color from '@components/Color';
import { getPalette } from '@utils/colors';

export default function Palette({ color }) {
  const palette = getPalette(color);

  return (
    <div className="mt-4 w-full grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
      {palette.map((c, i) => <Color key={c} color={c} index={i * 100 || 50} />)}
    </div>
  );
}
