import React from "react";

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
}

export const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  className = "",
  ...props
}) => {
  return (
    <hr
      className={`app-divider app-divider-${orientation} ${className}`.trim()}
      aria-orientation={orientation}
      {...props}
    />
  );
};
