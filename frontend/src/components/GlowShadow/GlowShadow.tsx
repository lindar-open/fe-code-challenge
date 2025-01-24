import './glowShadow.css';

interface GlowShadowProps {
  up: boolean;
}

const GlowShadow = function GlowShadow({ up }: GlowShadowProps) {
  const direction = up ? 'up' : 'down';
  return <div className={`glowShadow ${direction}`} />;
};

export default GlowShadow;
