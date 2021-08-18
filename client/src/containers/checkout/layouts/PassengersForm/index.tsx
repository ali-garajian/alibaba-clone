import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';

import useStore, { ISearchOptionsSlice } from 'data/Store';
import { IPassengers } from 'containers/home/components/SearchForm/PassengerPickerBox';
import { ComboEntry } from 'components/ComboBox';
import PassengersFormBody from './Body';
import PassengersFormHeader from './Header';

export enum ESex {
  Male = 1,
  Female,
}
export interface IPassengerInputData {
  type: 'adult' | 'child' | 'infant';
  firstname_en?: string;
  lastname_en?: string;
  sex?: ComboEntry | null;
  ssn?: string;
  firstname?: string;
  lastname?: string;
  birthdate?: {
    day: ComboEntry | null;
    month: ComboEntry | null;
    year: ComboEntry | null;
  };
}
export interface IPassengersForm {
  passengers: Array<IPassengerInputData>;
}

const passengersSelector = (state: ISearchOptionsSlice) => state.passengers;

interface IPassengersFormProps {}
function PassengersForm({}: IPassengersFormProps) {
  const passengers = useStore(passengersSelector);

  const form = useForm<IPassengersForm>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    defaultValues: {
      passengers: Object.keys(passengers).flatMap((category) =>
        Array.from({
          length: passengers[category as keyof typeof passengers],
        }).map(() => ({
          type: category as IPassengerInputData['type'],
        }))
      ),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'passengers',
  });

  return (
    <>
      <PassengersFormHeader {...{ append }} />
      <PassengersFormBody {...{ ...form, fields, remove }} />
    </>
  );
}

export default PassengersForm;
