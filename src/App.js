import '../node_modules/swiper/swiper.min.css' ;
import '../node_modules/boxicons/css/boxicons.min.css';
import  './App.scss';

import Header from './component/header/Header';

import MyRoutes from './config/MyRoutes';
import Footer from './component/footer/Footer';



	function App() {
	return (
		<>
		<Header />
		<MyRoutes/>
		<Footer />
		</>
	);
	}

export default App;
