import up from '@/assets/up.png';
import down from '@/assets/down.png';
import './trendIcon.css';
interface TrendIconProps {
  trend: string | null;
}

export default function TrendIcon({ trend }: TrendIconProps) {
  switch (trend) {
    case 'UP':
      return <img className="trend__icon" src={up} />;
    case 'DOWN':
      return <img className="trend__icon" src={down} />;
    default:
      return <div />;
  }
}
