import { CardProps } from "@/components/types/form.types";

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;