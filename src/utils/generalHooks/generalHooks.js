import { matchRoutes, useLocation } from "react-router-dom";
import { ROUTES } from "../../Constant/const";

const generalHooks = {
  usePathPattern: () => {
    const location = useLocation();
    const matches = matchRoutes(ROUTES, location);
    if (matches) {
      return matches[0].route.path;
    }
    return null;
  },
};

export default generalHooks;
