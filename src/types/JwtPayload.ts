import { UserRole } from 'utils/types';

export type JwtPayload = {
  id: string;
  email: string;
  role: UserRole;
};
