import { useMediaQuery } from "react-responsive";

export const DesktopView = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
