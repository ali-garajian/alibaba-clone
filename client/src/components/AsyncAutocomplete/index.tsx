import { useState, useEffect } from 'react';
import { TextField, makeStyles, TextFieldProps } from '@material-ui/core';
import { LocationOnOutlined as LocationOnOutlinedIcon } from '@material-ui/icons';
import { Autocomplete, AutocompleteProps } from '@material-ui/lab';
import { IdTitleModel } from '@alibaba-clone/core';

import _CACHE from 'data/_CACHE';

const useStyles = makeStyles({
	startAdornment: {
		fontSize: 20,
		color: '#aaa',
	},
});

interface IAsyncAutocompleteProps
	extends Partial<AutocompleteProps<any, any, any, any>> {
	fetchOptions(search?: string): Promise<IdTitleModel[]>;
	textFieldProps?: TextFieldProps;
	cacheKey: string;
}
export function AsyncAutocomplete({
	fetchOptions,
	textFieldProps,
	cacheKey,
	...autocompleteProps
}: IAsyncAutocompleteProps) {
	const classes = useStyles();

	const [open, setOpen] = useState<boolean>(false);
	const [options, setOptions] = useState<IdTitleModel[]>([]);

	const loading = open && !options.length;

	useEffect(() => {
		if (!open) return;

		(async () => {
			try {
				const cached = _CACHE[cacheKey];
				if (cached?.length) {
					setOptions(cached);
				} else {
					const options = await fetchOptions();
					setOptions(options);
					_CACHE[cacheKey] = options;
				}
			} catch (e) {
				console.error('something went wrong.', e.message);
			}
		})();
	}, [open]);

	return (
		<Autocomplete
			open={open}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
			options={options}
			getOptionLabel={(option) => option.title}
			disableClearable
			popupIcon={null}
			loading={loading}
			loadingText="در حال بارگذاری ..."
			noOptionsText="موردی یافت نشد"
			renderInput={(params) => (
				<TextField
					{...params}
					variant="filled"
					InputProps={{
						...params.InputProps,
						disableUnderline: true,
						startAdornment: (
							<LocationOnOutlinedIcon className={classes.startAdornment} />
						),
					}}
					{...textFieldProps}
				/>
			)}
			{...autocompleteProps}
		/>
	);
}
