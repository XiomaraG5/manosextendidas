// Logo de la Fundación. Usa máscara CSS sobre el SVG (un solo color) para
// poder pintarlo de cualquier color con `text-*` (cian en crema, blanco en
// morado, etc.) manteniendo el fondo transparente.
export function Logo({
  className = "",
  label = "Fundación Manos Extendidas",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span
      role="img"
      aria-label={label}
      className={className}
      style={{
        display: "inline-block",
        aspectRatio: "6916 / 3458",
        backgroundColor: "currentColor",
        WebkitMaskImage: "url(/logo/manos-extendidas.svg)",
        maskImage: "url(/logo/manos-extendidas.svg)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}
