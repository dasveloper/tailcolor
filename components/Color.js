import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';

export default function Color({ color, index }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className={`w-full h-24 ${index === 500 && 'border-4 border-gray-900 border-dashed'}`} style={{ backgroundColor: color }} />
      <div className="flex justify-between p-1">
        <p className="m-0 text-xs font-medium text-gray-500">{index}</p>
        <CopyToClipboard text={color} onCopy={() => toast.success('Copied to clipboard!')}>
          <button type="button" className="text-xs uppercase font-medium text-gray-500 hover:text-gray-900">
            {color}
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
}
