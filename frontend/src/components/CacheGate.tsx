'use client';

import { FC, ReactElement, ReactNode, useEffect, useState } from 'react';
import { persistorReady } from '@/queries/apolloClient';
import PageLoader from './PageLoader';

const CacheGate: FC<{ children: ReactNode }> = ({ children }): ReactElement => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    persistorReady.then(() => setReady(true));
  }, []);

  return ready ? <>{children}</> : <PageLoader />;
};

export default CacheGate;
