import { ReactNode } from "react";

interface Props {
  className?: string,
  children?: ReactNode
}

const Card = ({className, children}: Props) => {
  return ( 
    <div className={`card ${className || ""}`}>
      {children}
    </div>
   );
}
 
export default Card;