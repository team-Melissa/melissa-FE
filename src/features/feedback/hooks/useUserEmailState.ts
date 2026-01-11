import { useGetUser } from '@/src/apis/_generated/serverAPI';
import { useEffect, useState } from 'react';

export const useUserEmailState = (initialEmail: string) => {
  const [email, setEmail] = useState<string>(initialEmail);
  const { data: userData } = useGetUser();

  useEffect(() => {
    if (userData?.result?.email) {
      setEmail(userData.result.email);
    }
  }, [userData]);

  return [email, setEmail] as const;
};
