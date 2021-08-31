import AppProviders from 'providers';
import Header from './Header';
import Footer from 'containers/global/Footer';

export default function MainWrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <AppProviders>
      <Header />
      {children}
      <Footer />
    </AppProviders>
  );
}
