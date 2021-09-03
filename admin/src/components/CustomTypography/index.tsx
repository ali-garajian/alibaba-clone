import { Typography, TypographyProps, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

type FontWeight = 'bold' | 'normal';
interface IStylesProps {
  size?: number;
  weight?: FontWeight;
}
const useStyles = makeStyles({
  typogrpahy: ({ size, weight }: IStylesProps) => ({
    fontSize: size,
    fontWeight: weight,
  }),
});

interface ICustomTypographyProps extends TypographyProps {
  size?: number;
  weight?: FontWeight;
}
export default function CustomTypography({
  children,
  size,
  weight,
  className,
  ...rest
}: ICustomTypographyProps) {
  const classes = useStyles({
    size,
    weight,
  });
  return (
    <Typography {...rest} className={clsx(classes.typogrpahy, className)}>
      {children}
    </Typography>
  );
}
