import AppProviders from 'providers';

export default function MainWrapper({ children }: React.PropsWithChildren<{}>) {
  return <AppProviders>{children}</AppProviders>;
}
