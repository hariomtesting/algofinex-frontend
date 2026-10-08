/**
 * AlgoFinex — Router Utilities & React Router Integration
 * Adapts react-router-dom hooks and components for consistent usage.
 */

import React from "react";
import {
  Link as RRLink,
  LinkProps as RRLinkProps,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";

export interface LinkProps extends RRLinkProps {
  readonly to: string;
  readonly activeClassName?: string;
}

export const Link: React.FC<LinkProps> = ({
  to,
  className = "",
  activeClassName = "active",
  children,
  ...props
}) => {
  const location = useLocation();
  const targetPath = to.split("?")[0].split("#")[0];
  const isActive =
    location.pathname === targetPath ||
    (targetPath !== "/" && location.pathname.startsWith(targetPath));

  const combinedClassName = `${className} ${isActive ? activeClassName : ""}`.trim();

  return (
    <RRLink to={to} className={combinedClassName} {...props}>
      {children}
    </RRLink>
  );
};

export const useRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const queryParams = React.useMemo(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((val, key) => {
      params[key] = val;
    });
    return params;
  }, [searchParams]);

  return {
    currentPath: location.pathname,
    queryString: location.search,
    queryParams,
    navigate,
    location,
  };
};
