import { Suspense } from 'react';

const SuspenseProvider = ({ children }: React.PropsWithChildren<{}>) => {
  return <Suspense fallback={<div>Loading ...</div>}>{children}</Suspense>;
};

export default SuspenseProvider;
