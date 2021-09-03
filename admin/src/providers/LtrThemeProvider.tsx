import { ThemeProvider, createTheme } from '@material-ui/core';

import DefaultTheme from 'themes';

const ltrTheme = createTheme({
  ...DefaultTheme,
  direction: 'ltr',
});

export default function LtrProvider({ children }: React.PropsWithChildren<{}>) {
  return <ThemeProvider theme={ltrTheme}>{children}</ThemeProvider>;
}
