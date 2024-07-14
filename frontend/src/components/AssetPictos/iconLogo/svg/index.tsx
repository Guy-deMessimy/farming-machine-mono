import * as React from 'react';
import '../styles.scss';

interface FarmingMachineLogoSvgProps extends React.SVGProps<SVGSVGElement> {
  title: string;
  alt: string;
  width?: number | string;
  height?: number | string;
}
const FarmingMachineLogoSvg: React.FC<FarmingMachineLogoSvgProps> = ({ title, alt, width, height, ...props }) => {
  return (
    <svg className="svg" viewBox="0 0 24 24" role="img" aria-label={alt} width={width} height={height} {...props}>
      <title>{title}</title>
      <path d="M13.3 2.79l-3.5 3.5.7.71 1.4-1.39 1.1 1.1V9c0 1.11-.89 2-2 2h-.54A6 6 0 0112 15a6 6 0 01-.09 1h3.12a4.5 4.5 0 014.47-4 4.5 4.5 0 012.5.76V8c0-1.11-.89-2-2-2h-6.29l-1.1-1.1L14 3.5l-.7-.71M4 7c-.55 0-1 .45-1 1s.45 1 1 1h5a2 2 0 00-2-2H4m2 3a5 5 0 00-1.56.25l.36.93-.47.18-.33-.93a5 5 0 00-2.46 2.31l.91.41-.21.45-.9-.4A5 5 0 001 15a5 5 0 00.25 1.56l.93-.36.18.47-.93.33a5 5 0 002.31 2.46l.4-.91.46.21-.4.9A5 5 0 006 20a5 5 0 001.56-.25l-.36-.93.47-.18.33.93a5 5 0 002.46-2.31l-.91-.4.21-.46.9.4A5 5 0 0011 15a5 5 0 00-.25-1.56l-.93.36-.18-.47.93-.33a5 5 0 00-2.31-2.46l-.4.91-.46-.21.4-.9A5 5 0 006 10m0 2a3 3 0 013 3 3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 013-3m13.5 1a3.5 3.5 0 00-3.5 3.5 3.5 3.5 0 003.5 3.5 3.5 3.5 0 003.5-3.5 3.5 3.5 0 00-3.5-3.5m0 2a1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5 1.5 1.5 0 01-1.5-1.5 1.5 1.5 0 011.5-1.5z" />
    </svg>
  );
};

export default FarmingMachineLogoSvg;
