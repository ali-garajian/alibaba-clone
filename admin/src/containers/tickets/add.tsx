/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Box } from '@material-ui/core';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import useSwr, { mutate } from 'swr';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns-jalali';
import {
	EFlightClass,
	EFlightTicketType,
	AirlineApi,
	CitiesApi,
	FlightTicketsApi,
} from '@alibaba-clone/core';
import {
	FormTextInput,
	FormComboBox,
	FormDatePicker,
	CustomButton,
} from '@alibaba-clone/core-ui-web';

import { RoutesList } from 'routes/routesList';
import { AddTicketForm } from 'types';

const ticketTypeOptions = [
	{
		id: 1,
		title: 'چارتر',
	},
	{
		id: 2,
		title: 'سیستمی',
	},
];
const flightClassOptions = [
	{
		id: 1,
		title: 'اکونومی',
	},
	{
		id: 2,
		title: 'بیزینس',
	},
];

class FaDateFnsUtils extends DateFnsUtils {
	format = (date: Date, formatString: string) => {
		return format(date, formatString, { locale: this.locale });
	};
}

function AddTicketPage() {
	const history = useHistory();

	const {
		control,
		formState: { errors },
		handleSubmit,
		getValues,
	} = useForm<AddTicketForm>({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		shouldFocusError: true,
	});

	const [loading, setLoading] = useState(false);

	const onSubmit: SubmitHandler<AddTicketForm> = async (data) => {
		try {
			setLoading(true);
			const {
				airline,
				source,
				destination,
				ticketType,
				departureDate,
				arrivalDate,
				...rest
			} = data;
			const response = await FlightTicketsApi.createTicket({
				...rest,
				departureDate: data.departureDate.toISOString(),
				arrivalDate: data.arrivalDate.toISOString(),
				ticketType:
					ticketType?.id == 1
						? EFlightTicketType.Charters
						: EFlightTicketType.Systematic,
				airlineId: airline!.id,
				class:
					data.class!.id == 1 ? EFlightClass.Economy : EFlightClass.Buisiness,
				destinationId: destination!.id,
				sourceId: source!.id,
			});
			mutate('/tickets');

			history.replace(RoutesList.TicketList);
		} catch (e: any) {
			setLoading(false);
			alert(e.message ?? e.msg ?? 'خطایی در برنامه رخ داده است');
		}
	};

	return (
		<MuiPickersUtilsProvider utils={FaDateFnsUtils}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={3}>
						<FormTextInput
							label="مدل هواپیما"
							control={control}
							name="airplane"
							rules={{ required: 'نام هواپیما الزامی است' }}
							textFieldProps={{
								error: !!errors.airplane,
								helperText: errors.airplane?.message,
							}}
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<FormTextInput
							label="حداثر بار مجاز(کیلوگرم)"
							control={control}
							name="permittedLoggage"
							rules={{ required: 'حداکثر بار مجاز الزامی است' }}
							textFieldProps={{
								error: !!errors.permittedLoggage,
								helperText: errors.permittedLoggage?.message,
							}}
							defaultValue={20}
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<FormTextInput
							label="ترمینال"
							control={control}
							name="terminalNumber"
							rules={{ required: 'شماره ترمینال مجاز الزامی است' }}
							textFieldProps={{
								error: !!errors.terminalNumber,
								helperText: errors.terminalNumber?.message,
							}}
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<FormTextInput
							label="قیمت"
							control={control}
							name="price"
							rules={{ required: 'قیمت الزامی است' }}
							textFieldProps={{
								error: !!errors.price,
								helperText: errors.price?.message,
							}}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={2}>
					<Grid item xs={12} md={3}>
						<FormTextInput
							label="تعداد بلیط باقی مانده"
							control={control}
							name="quantity"
							rules={{ required: 'تعداد بلیط باقی مانده الزامی است' }}
							textFieldProps={{
								error: !!errors.quantity,
								helperText: errors.quantity?.message,
							}}
							defaultValue={1}
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<Controller
							render={({ field: { onChange, ...rest } }) => (
								<FormComboBox
									{...rest}
									label="نوع بلیط"
									options={ticketTypeOptions}
									onChange={(_, newValue) => {
										onChange(newValue);
									}}
									inputProps={{
										error: !!errors.ticketType,
										// @ts-ignore
										helperText: errors.ticketType?.message,
									}}
								/>
							)}
							control={control}
							name="ticketType"
							defaultValue={ticketTypeOptions[0]}
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<Controller
							render={({ field: { onChange, ...rest } }) => (
								<FormComboBox
									{...rest}
									label="شرکت هواپیمایی"
									useOptions={() => {
										const { data, error } = useSwr('/airlines', () =>
											AirlineApi.getAirlines()
										);

										return {
											options: data?.data ?? [],
											loading: !data && !error,
										};
									}}
									onChange={(_, newValue) => {
										onChange(newValue);
									}}
									inputProps={{
										error: !!errors.airline,
										// @ts-ignore
										helperText: errors.airline?.message,
									}}
								/>
							)}
							control={control}
							name="airline"
							rules={{
								required: 'شرکت هواپیمایی الزامی است',
							}}
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<Controller
							render={({ field: { onChange, ...rest } }) => (
								<FormComboBox
									{...rest}
									label="کلاس پرواز"
									options={flightClassOptions}
									onChange={(_, newValue) => {
										onChange(newValue);
									}}
									inputProps={{
										error: !!errors.class,
										// @ts-ignore
										helperText: errors.class?.message,
									}}
								/>
							)}
							control={control}
							name="class"
							defaultValue={flightClassOptions[0]}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={2}>
					<Grid item xs={12} md={3}>
						<Controller
							render={({ field: { onChange, ...rest } }) => (
								<FormComboBox
									{...rest}
									label="مبدا"
									useOptions={() => {
										const { data, error } = useSwr('/cities', () =>
											CitiesApi.getCities({ q: '' })
										);

										return {
											options: data?.data ?? [],
											loading: !data && !error,
										};
									}}
									onChange={(_, newValue) => {
										onChange(newValue);
									}}
									inputProps={{
										error: !!errors.source,
										// @ts-ignore
										helperText: errors.source?.message,
									}}
								/>
							)}
							control={control}
							name="source"
							rules={{
								required: 'مبدا الزامی است',
							}}
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<Controller
							render={({ field: { onChange, ...rest } }) => (
								<FormComboBox
									{...rest}
									label="مقصد"
									useOptions={() => {
										const { data, error } = useSwr('/cities', () =>
											CitiesApi.getCities({ q: '' })
										);

										return {
											options: data?.data ?? [],
											loading: !data && !error,
										};
									}}
									onChange={(_, newValue) => {
										onChange(newValue);
									}}
									inputProps={{
										error: !!errors.destination,
										// @ts-ignore
										helperText: errors.destination?.message,
									}}
								/>
							)}
							control={control}
							name="destination"
							rules={{
								required: 'مقصد الزامی است',
								validate(value) {
									const source = getValues('source');
									return source?.id === value?.id
										? 'مبدا و مقصد نمی توانند یکی باشند'
										: undefined;
								},
							}}
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<Controller
							render={({ field }) => (
								<FormDatePicker
									{...field}
									label="زمان شروع پرواز"
									error={!!errors.departureDate}
									helperText={errors.departureDate?.message}
								/>
							)}
							control={control}
							name="departureDate"
							rules={{ required: 'زمان شروع پرواز الزامی است' }}
							defaultValue={new Date()}
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<Controller
							render={({ field }) => (
								<FormDatePicker
									{...field}
									label="زمان پایان پرواز"
									error={!!errors.arrivalDate}
									helperText={errors.arrivalDate?.message}
								/>
							)}
							control={control}
							name="arrivalDate"
							rules={{
								required: 'زمان پایان پرواز الزامی است',
								validate: (endDate) => {
									const startDate = getValues('departureDate');
									return (
										endDate >= startDate ||
										'زمان پایان پرواز باید از زمان شروع آن بزرگتر باشد'
									);
								},
							}}
							defaultValue={new Date()}
						/>
					</Grid>
				</Grid>

				<Box mt={3} />
				<CustomButton type="submit" loading={loading}>
					ثبت
				</CustomButton>
			</form>
		</MuiPickersUtilsProvider>
	);
}

export default AddTicketPage;
