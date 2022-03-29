import React,{useState,useEffect} from 'react'
import './pageHeader.scss'
import { Link, useNavigate, Outlet } from 'react-router-dom';

import $ from 'jquery'

const PageHeader = ({children,cate}) => {

	let navigate=useNavigate();
	const [search,setSearch]=useState('');
	
	const onSearch=(query) => {
		query? navigate(`/${cate}/search/result-query=${query}`):alert(`No data ${cate.toUpperCase()} to search`)
	}
	useEffect(() => {
	const eventEnter = (e) => {
		e.preventDefault();
		if (e.keyCode === 13) {
			onSearch(search);
		}
    };
	document.addEventListener('keyup',eventEnter);
	return () => {
		document.removeEventListener("keyup", eventEnter)
		}},[search])

	return (
			<div className="page__header">
				<div className="page__header__title">
					<h1>{cate.toUpperCase()} Center</h1>
				</div>
				<div className="search-bar">
						<input 
					value={search} 
					type="text" 
					placeholder={`Search for ${cate.toUpperCase()}`}
					onChange={
						(e)=>{
								setSearch(e.target.value)
							}}
						/>
						
						<i 
							className='bx bx-search-alt-2'  
							onClick={(e)=>{
								e.preventDefault()
								onSearch(search)
							}} ></i>
						
						
						</div>

			{children}
			</div>
	)
}

export default PageHeader