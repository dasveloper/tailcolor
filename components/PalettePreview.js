import { getColor, getPalette } from '@utils/colors';
import Link from 'next/link';

export default function PalettePreview({ color }) {
  const colorObj = getColor(color);
  const palette = getPalette(colorObj);

  return (
    <Link href={`/palettes/${colorObj.hex().replace('#', '')}`}>
      <a>
        <div className="p-4 border hover:bg-gray-50">
          <span className="text-base uppercase">
            {colorObj.hex()}
          </span>
          <div className="mt-2 w-full flex">
            {palette.map((c) => <div key={c} className="w-full h-10" style={{ backgroundColor: c }} />)}
          </div>
        </div>
      </a>
    </Link>
  );
}
