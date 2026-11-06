import logoSrc from "../imports/gavroche_logo.jpg";

interface Props {
  size?: number;
  className?: string;
}

export default function Logo({ size = 48, className = "" }: Props) {
  return (
    <img
      src={logoSrc}
      alt="Gavroche – Pâtisserie Italienne"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{ imageRendering: "crisp-edges" }}
    />
  );
}
