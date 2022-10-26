import { RoutesDefinition } from "common/routes";

interface ProtectedRoutes {
  url?: string;
  auth: boolean;
}

export const ProtectedRoutes: ProtectedRoutes[] = [
  { url: RoutesDefinition.dashboard, auth: true },
];
