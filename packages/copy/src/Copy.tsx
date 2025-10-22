import { useCopy } from './useCopy';
import type { CopyProps } from './types';
import './index.less';

export default function Copy({
  text,
  showIcon,
  onCopy,
  children,
  className = '',
  style = {},
}: CopyProps) {
  const { copyText } = useCopy();
  const handleCopy = async () => {
    if (showIcon) return;
    const { copied } = await copyText(text);
    onCopy?.(text, copied);
  };
  const handleIconCopy = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    const { copied } = await copyText(text);
    onCopy?.(text, copied);
  };

  return (
    <div className={`w-copy ${className}`} style={style} onClick={handleCopy}>
      {children && <span className="w-copy-text">{children}</span>}
      {showIcon && (
        <span className="w-copy-icon" onClick={handleIconCopy}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-copy-icon lucide-copy"
          >
            <title>copy</title>
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        </span>
      )}
    </div>
  );
}
