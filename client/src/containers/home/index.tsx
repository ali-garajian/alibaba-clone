import Content from './components/Content';
import FeatureBox from './components/FeatureBox';
import QuestionFrequently from './components/Questions/questionFrequently';
import Banner from './layouts/Banner';
import { Box } from '@material-ui/core';

export default function HomePage() {
	return (
		<Box bgcolor="#fff">
			<Banner />
			<FeatureBox />
			<Content />
			<QuestionFrequently />
		</Box>
	);
}
