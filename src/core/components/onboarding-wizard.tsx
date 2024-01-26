import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';
import { useMutation } from "@blitzjs/rpc"
import userOnboardComplete from "~/src/features/users/mutations/userOnboardComplete"

export function OnboardingWizard() {
  const [active, setActive] = useState(1);
  const [$markOnboardComplete, {isLoading}] = useMutation(userOnboardComplete)
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const isFinalStep = active === 3

  return (
    <>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="First step" description="Create an account">
          Step 1 content: Create an account
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button loading={isLoading} onClick={async () => {
          if (isFinalStep) {
            await $markOnboardComplete({})
        } else {
            nextStep()
          }
        }}>
          {isFinalStep ? "Finish" : "Next"}
        </Button>
      </Group>
    </>
  );
}