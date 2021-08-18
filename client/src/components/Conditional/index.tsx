interface IConditionalProps {
  condition: boolean;
}
export default function Conditional({
  condition,
  children,
}: React.PropsWithChildren<IConditionalProps>) {
  return condition ? <>{children}</> : null;
}
