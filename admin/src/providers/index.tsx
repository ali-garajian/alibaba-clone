import StylesProvider from './StylesProvider';
import SuspenseProvider from './SuspenseProvider';
import ThemeProvider from './ThemeProvider';

export default function AppProviders({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <StylesProvider>
      <ThemeProvider>
        <SuspenseProvider>{children}</SuspenseProvider>
      </ThemeProvider>
    </StylesProvider>
  );
}
