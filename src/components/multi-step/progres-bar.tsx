import {
  CheckIcon,
  ListBulletIcon,
  LockClosedIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { ReactElement } from "react";

interface ProgresBar {
  currentStep: number;
  steps: stepProgresBar[];
}

interface stepProgresBar {
  text: string;
  icon: React.ElementType;
}

export const ProgresBar = ({ currentStep, steps }: ProgresBar) => {
  return (
    <div className="flex ">
      {steps.map((step, index) => {
        if (index < currentStep)
          return <ProgressBarItemCompleted key={index} />;
        if (index == currentStep)
          return (
            <ProgressBarItemSelected
              key={index}
              icon={step.icon}
              text={step.text}
              step={currentStep}
              length={steps.length}
            />
          );
        if (index > currentStep)
          return <ProgressBarItemPending key={index} icon={step.icon} />;
      })}
    </div>
  );
};

const ProgressBarItemCompleted = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center w-8 h-8 bg-secondary text-white font-bold rounded-full">
        <CheckIcon />
      </div>
      <span className="w-4 h-1 bg-secondary"> </span>
    </div>
  );
};

interface ProgressBarItemSelected {
  icon: React.ElementType;
  text: string;
  length: number;
  step: number;
}

const ProgressBarItemSelected = ({
  icon: IconComponent,
  text,
  length,
  step,
}: ProgressBarItemSelected) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center p-2 bg-secondary text-white font-extrabold text-base rounded-full">
        {<IconComponent className="w-6 h-6" />}
      </div>
      <span className="w-4 h-1 bg-secondary"> </span>
      <div className="flex flex-col mx-4">
        <span className="text-secondary text-xs font-medium">
          Paso {step + 1}/{length}
        </span>
        <p className="text-sm text-white font-bold">{text}</p>
      </div>
    </div>
  );
};

interface ProgressBarItemPending {
  icon: React.ElementType;
}

const ProgressBarItemPending = ({
  icon: IconComponent,
}: ProgressBarItemPending) => {
  return (
    <div className="flex items-center justify-center">
      <span className="w-2 h-0.5 bg-white"> </span>
      <div className="flex items-center justify-center w-8 h-8 bg-white text-secondary rounded-full">
        {<IconComponent />}
      </div>
    </div>
  );
};
