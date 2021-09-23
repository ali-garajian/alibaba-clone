import {
	Box,
	Card,
	CardHeader,
	CardContent,
	makeStyles,
	Grid,
	FormLabel,
	Theme,
	Typography,
	Button,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import {
	FieldArrayWithId,
	Control,
	Controller,
	FieldErrors,
} from 'react-hook-form';
import clsx from 'clsx';
import { FormTextInput, FormComboBox, Conditional } from '@alibaba-clone/core';

import { ESex, IPassengersForm } from '..';
import useStore, { ISearchOptionsSlice } from 'data/Store';

const useStyles = makeStyles((theme: Theme) => ({
	card: {
		borderTopRightRadius: 0,
		borderTopLeftRadius: 0,
	},
	inputLabel: {
		display: 'inline-block',
		fontSize: 12,
		marginBottom: 5,
		marginLeft: theme.spacing(2),
	},
	birthdateError: {
		fontSize: 12,
	},
	cardHeaderRoot: {
		padding: 0,
	},
	cardHeaderTitle: {
		borderLeft: '5px solid #74b49b',
		fontSize: 16,
		color: '#646464',
		padding: 12,
		borderBottom: '1px solid #f5f5f5',
	},
	cardHeaderAction: {
		alignSelf: 'stretch',
		margin: 0,
		'& .close-icon': {
			height: '100%',
			minWidth: 52,
			paddingLeft: 10,
			paddingRight: 10,
			color: '#e63200',
			borderLeft: '1px solid #e1e1e1',
			borderRadius: 0,
			'&.disabled': {
				color: '#aaa',
				pointerEvents: 'none',
				backgroundColor: '#e1e1e1',
			},
		},
	},
}));

const passengersSelector = (state: ISearchOptionsSlice) =>
	[state.passengers, state.setPassengers] as const;

interface IPassengerInputCardProps {
	field: FieldArrayWithId<IPassengersForm, 'passengers', 'id'>;
	control: Control<IPassengersForm>;
	errors: FieldErrors<IPassengersForm>;
	index: number;
	remove?: (index?: number | number[] | undefined) => void;
}
function PassengerInputCard({
	field,
	control,
	errors,
	index,
	remove,
}: IPassengerInputCardProps) {
	const classes = useStyles();
	const [passengers, setPassengers] = useStore(passengersSelector);

	const removeDisabled =
		field.type === 'adult' &&
		(passengers.adult === 1 ||
			passengers.adult <= passengers.child + passengers.infant);

	return (
		<Box my={2}>
			<Card className={classes.card}>
				<CardHeader
					title={
						{ adult: 'بزرگسال', child: 'کودک', infant: 'نوزاد' }[field.type]
					}
					action={
						<Button
							className={clsx('close-icon', {
								disabled: removeDisabled,
							})}
							onClick={() => {
								setPassengers((prev) => ({
									...prev,
									[field.type]: prev[field.type] - 1,
								}));
								remove?.(index);
							}}
						>
							<CloseIcon />
						</Button>
					}
					classes={{
						root: classes.cardHeaderRoot,
						title: classes.cardHeaderTitle,
						action: classes.cardHeaderAction,
					}}
				/>
				<CardContent>
					<Grid container spacing={2}>
						<Grid item xs={12} md={3}>
							<FormTextInput
								label="نام لاتین"
								control={control}
								name={`passengers.${index}.firstname_en`}
								rules={{ required: 'نام لاتین الزامی است' }}
								textFieldProps={{
									error: !!errors?.passengers?.[index]?.firstname_en,
									helperText:
										errors?.passengers?.[index]?.firstname_en?.message,
								}}
							/>
						</Grid>
						<Grid item xs={12} md={3}>
							<FormTextInput
								label="نام خانوادگی لاتین"
								control={control}
								name={`passengers.${index}.lastname_en`}
								rules={{ required: 'نام خانوادگی لاتین الزامی است' }}
								textFieldProps={{
									error: !!errors?.passengers?.[index]?.lastname_en,
									helperText: errors?.passengers?.[index]?.lastname_en?.message,
								}}
							/>
						</Grid>
						<Grid item xs={12} md={3}>
							<Controller
								render={({ field: { onChange, ...rest } }) => (
									<FormComboBox
										{...rest}
										label="جنسیت"
										options={[
											{
												id: ESex.Male,
												title: 'مرد',
											},
											{
												id: ESex.Female,
												title: 'زن',
											},
										]}
										onChange={(_, newValue) => {
											onChange(newValue);
										}}
									/>
								)}
								control={control}
								name={`passengers.${index}.sex`}
								defaultValue={{
									id: ESex.Male,
									title: 'مرد',
								}}
							/>
						</Grid>
						<Grid item xs={12} md={3}>
							<FormTextInput
								label="کد ملی"
								control={control}
								name={`passengers.${index}.lastname_en`}
								rules={{ required: 'کد ملی الزامی است' }}
								textFieldProps={{
									error: !!errors?.passengers?.[index]?.lastname_en,
									helperText: errors?.passengers?.[index]?.lastname_en?.message,
								}}
							/>
						</Grid>
					</Grid>

					<Grid container spacing={2}>
						<Grid item xs={12} md={3}>
							<FormTextInput
								label="نام"
								control={control}
								name={`passengers.${index}.firstname`}
								rules={{ required: 'نام الزامی است' }}
								textFieldProps={{
									error: !!errors?.passengers?.[index]?.firstname,
									helperText: errors?.passengers?.[index]?.firstname?.message,
								}}
							/>
						</Grid>
						<Grid item xs={12} md={3}>
							<FormTextInput
								label="نام خانوادگی"
								control={control}
								name={`passengers.${index}.lastname`}
								rules={{ required: 'نام خانوادگی الزامی است' }}
								textFieldProps={{
									error: !!errors?.passengers?.[index]?.lastname,
									helperText: errors?.passengers?.[index]?.lastname?.message,
								}}
							/>
						</Grid>
						<Grid item xs={12} md={3}>
							<Box mt="9px">
								<FormLabel className={classes.inputLabel}>
									تاریخ تولد (شمسی)
								</FormLabel>
								<Grid item container spacing={1}>
									<Grid item xs={12} md={4}>
										<Controller
											render={({ field: { onChange, ...rest } }) => (
												<FormComboBox
													{...rest}
													options={Array.from(
														{ length: 31 },
														(_, i) => i + 1
													).map((i) => ({
														id: i,
														title: i.toString(),
														slug: '',
													}))}
													placeholder="روز"
													onChange={(_, newValue) => {
														onChange(newValue);
													}}
													inputProps={{
														error:
															!!errors?.passengers?.[index]?.birthdate?.day,
													}}
												/>
											)}
											control={control}
											name={`passengers.${index}.birthdate.day`}
											rules={{ required: true }}
										/>
									</Grid>

									<Grid item xs={12} md={4}>
										<Controller
											render={({ field: { onChange, ...rest } }) => (
												<FormComboBox
													{...rest}
													options={Array.from(
														{ length: 12 },
														(_, i) => i + 1
													).map((i) => ({
														id: i,
														title: i.toString(),
														slug: '',
													}))}
													placeholder="ماه"
													onChange={(_, newValue) => {
														onChange(newValue);
													}}
													inputProps={{
														error:
															!!errors?.passengers?.[index]?.birthdate?.month,
													}}
												/>
											)}
											control={control}
											name={`passengers.${index}.birthdate.month`}
											rules={{ required: true }}
										/>
									</Grid>

									<Grid item xs={12} md={4}>
										<Controller
											render={({ field: { onChange, ...rest } }) => (
												<FormComboBox
													{...rest}
													options={Array.from(
														{ length: 61 },
														(_, i) => 1390 - i
													).map((i) => ({
														id: i,
														title: i.toString(),
														slug: '',
													}))}
													placeholder="سال"
													onChange={(_, newValue) => {
														onChange(newValue);
													}}
													inputProps={{
														error:
															!!errors?.passengers?.[index]?.birthdate?.year,
													}}
												/>
											)}
											control={control}
											name={`passengers.${index}.birthdate.year`}
											rules={{ required: true }}
										/>
									</Grid>

									<Conditional
										condition={
											!!errors?.passengers?.[index]?.birthdate?.day ||
											!!errors?.passengers?.[index]?.birthdate?.month ||
											!!errors?.passengers?.[index]?.birthdate?.year
										}
									>
										<Typography
											color="error"
											className={classes.birthdateError}
										>
											تاریخ تولد الزامی است
										</Typography>
									</Conditional>
								</Grid>
							</Box>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Box>
	);
}

export default PassengerInputCard;
