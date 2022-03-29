import React from 'react'
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';

import Movie from '../component/movie/Movie'
import mvdbApi ,{category}from './../api/mvdpApi';
import PageHeader from './../component/pageHeader/PageHeader';

	const Catalog = () => {
	let params = useParams();
	let location=useLocation();
	return (
		<div> 
			<PageHeader cate={params.category}>
			</PageHeader>
			<div className="container">
				<div className="container__section">
					<Movie cate={params.category}></Movie>
				</div>
			</div>
		</div>
	)
	}

export default Catalog