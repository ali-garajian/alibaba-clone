import { useState } from 'react';
import { Box, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { AuthApi, isAuthenticated, sanitizeEmail } from '@alibaba-clone/core';

import { RoutesList } from 'routes/routesList';
import { IAuthSlice } from 'data/auth';
import useStore from 'data/Store';
import CustomButton from 'components/CustomButton';

const authSelector = (state: IAuthSlice) => state.setIsLoggedIn;

function LoginPage() {
	const history = useHistory();

	const [email, setEmail] = useState({
		value: '',
		error: '',
	});
	const [password, setPassword] = useState({
		value: '',
		error: '',
	});

	const [loading, setLoading] = useState(false);

	const setIsLoggedIn = useStore(authSelector);

	async function handleLogin() {
		try {
			if (!email.value)
				return setEmail((p) => ({ ...p, error: 'ایمیل الزامی است' }));

			if (sanitizeEmail(email.value) == null)
				return setEmail((p) => ({
					...p,
					error: 'ایمیل وارد شده صحیح نمی باشد',
				}));

			if (!password.value)
				return setPassword((p) => ({ ...p, error: 'رمز عبور الزامی است' }));

			setLoading(true);

			// login logic
			await AuthApi.login({
				email: email.value.trim(),
				password: password.value.trim(),
			});

			setIsLoggedIn(isAuthenticated());
			history.push(RoutesList.Dashboard);
		} catch (e: any) {
			setLoading(false);

			const msg = e.message ?? e.msg ?? 'خطایی در سیستم رخ داده است';
			alert(msg);
		}
	}

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			width="100vw"
			height="100vh"
		>
			<TextField
				label="ایمیل"
				variant="outlined"
				value={email.value}
				onChange={(e) => {
					setEmail((prev) => ({
						...prev,
						value: e.target.value,
					}));
				}}
				error={!!email.error}
				helperText={email.error}
			/>
			<Box my={1} />
			<TextField
				label="رمز عبور"
				variant="outlined"
				value={password.value}
				onChange={(e) => {
					setPassword((prev) => ({
						...prev,
						value: e.target.value,
					}));
				}}
				error={!!password.error}
				helperText={password.error}
				type="password"
			/>
			<Box mt={4} />
			<CustomButton onClick={handleLogin} loading={loading}>
				ورود
			</CustomButton>
		</Box>
	);
}

export default LoginPage;
