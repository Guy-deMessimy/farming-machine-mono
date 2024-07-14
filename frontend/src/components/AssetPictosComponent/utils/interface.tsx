export interface Logo {
  title: string;
  alt: string;
  width?: number | string;
  height?: number | string;
}

export interface SvgLogo extends React.SVGProps<SVGSVGElement> {
  title: string;
  alt: string;
  width?: number | string;
  height?: number | string;
}
