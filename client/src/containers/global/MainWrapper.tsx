import AppProviders from 'providers';
import Header from './Header';

export default function MainWrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <AppProviders>
      <Header />
      {children}
    </AppProviders>
  );
}
