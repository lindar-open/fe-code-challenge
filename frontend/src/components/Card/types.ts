export interface CardProps {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export interface CardHeaderProps {
  children: React.ReactNode;
}

export interface CardContentProps {
  children: React.ReactNode;
}
