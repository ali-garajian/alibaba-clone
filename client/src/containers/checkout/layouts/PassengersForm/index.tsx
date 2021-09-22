import { useForm, useFieldArray } from 'react-hook-form';
import shallow from 'zustand/shallow';
import { ComboEntry } from '@alibaba-clone/core';

import useStore, { RootState } from 'data/Store';
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

const passengersSelector = (state: RootState) =>
	[state.passengers, state.passengersInfo] as const;

function PassengersForm() {
	const [passengers, passengersInputData] = useStore(
		passengersSelector,
		shallow
	);

	const form = useForm<IPassengersForm>({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		shouldFocusError: true,
		defaultValues: {
			passengers:
				passengersInputData ??
				Object.keys(passengers).flatMap((category) =>
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
