import React, { useState, useMemo } from 'react';
import { Stepper, Step, StepLabel, Paper } from '@material-ui/core';

import { steps, CheckoutSteps } from './_utils';
import CustomStepIcon from './StepIcon';
import CustomStepConnector from './StepConnector';
import { StepperCtx } from './Provider';

interface ICheckoutStepperProps {}
function CheckoutStepper({
  children,
}: React.PropsWithChildren<ICheckoutStepperProps>) {
  const [activeStep, setActiveStep] = useState<CheckoutSteps>(
    CheckoutSteps.Passengers
  );

  const value = useMemo(
    () => ({
      activeStep,
      setActiveStep,
    }),
    [activeStep]
  );

  return (
    <>
      <Paper>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          connector={<CustomStepConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>
      <StepperCtx.Provider value={value}>
        {React.Children.map(children, (child, index) =>
          React.isValidElement(child) ? (
            index + 1 <= activeStep ? (
              index + 1 === activeStep ? (
                child
              ) : (
                <div style={{ display: 'none' }}>{child}</div>
              )
            ) : null
          ) : null
        )}
      </StepperCtx.Provider>
    </>
  );
}

export default CheckoutStepper;
