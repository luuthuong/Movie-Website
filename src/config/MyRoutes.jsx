import React from 'react';
import { Route, Routes, useParams, Link, Outlet } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/Detail';

const MyRoutes = () => {
	return (
	<Routes>
		<Route path="/:category/search/result-query=:keyword" element={<Catalog />} />
		<Route path="/:category" element={<Catalog />} />
		<Route path="/:category/detail=:key" element={<Detail />} />
		<Route path="/" index element={<Home />} />
		<Route
		path="*"
		element={
			<main style={{ color: "red", fontSize: "30px" }}>
			No Page Founding...
			</main>
		}
		/>
	</Routes>
	);
};

export default MyRoutes