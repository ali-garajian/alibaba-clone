import Footer from 'containers/global/Footer';
import Content from './components/Content';
import FeatureBox from './components/FeatureBox';
import Banner from './layouts/Banner';

export default function HomePage() {
  return (
    <>
      <Banner />
      <FeatureBox />
      <Content />
      <Footer />
    </>
  );
}
