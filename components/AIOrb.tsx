export default function AIOrb({ size = 40 }: { size?: number }) {
  return <div className="orb shrink-0" style={{ width: size, height: size }} aria-hidden />;
}
