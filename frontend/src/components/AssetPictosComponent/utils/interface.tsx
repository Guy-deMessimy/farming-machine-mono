export interface Icon {
  title: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  path: string;
  onclick?: () => void;
}

export interface SvgLogo extends React.SVGProps<SVGSVGElement> {
  title: string;
  alt: string;
  width?: number | string;
  height?: number | string;
}
