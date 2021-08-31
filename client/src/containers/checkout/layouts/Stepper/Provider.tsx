import { createContext, useContext } from 'react';

import { CheckoutSteps } from './_utils';

interface IStepperCtx {
  activeStep: CheckoutSteps;
  setActiveStep: React.Dispatch<React.SetStateAction<CheckoutSteps>>;
}

export const StepperCtx = createContext<IStepperCtx | null>(null);

export function useStepperCtx() {
  const ctx = useContext(StepperCtx);

  if (ctx == null)
    throw new Error(
      'useStepperCtx: StepperCtx is either used outside its provider tree, or is not initialized'
    );

  return ctx;
}
