import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import apikey from '../api';
import symbols from '../symbols';
import Loading from './Loading';
import DisplayInfo from './DisplayInfo';
import Error from './Error';

const apiurl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY';

function compareValues(curr, prev) {
	let diff = (curr - prev).toFixed(2);
	let percentage = (diff / prev * 100).toFixed(2);
	return ({
		diff: diff,
		percentage: percentage
	});
}

function Fetch(props) {
	const [latest, setLatest] = useState(null);
	const [previous, setPrevious] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const onError = useRef(props.onError);
	const symbol = useRef(null);

	useEffect(() => {
		setLoading(true);
		setError(false);
		axios.get(`${apiurl}&symbol=${props.symbol}&apikey=${apikey}`).then((res) => {
			if (res.data.Note !== undefined) {
				alert('Maximum API calls exceeded. Try again later.');
				if (symbol.current === null) {
					setError(true);
				} else {
					onError.current(symbol.current);
				}
				setLoading(false);
			} else {
				let latestDate = Object.keys(res.data['Time Series (Daily)']).sort((a, b) => b - a)[0];
				let previousDate = Object.keys(res.data['Time Series (Daily)']).sort((a, b) => b - a)[1];
				symbol.current = res.data['Meta Data']['2. Symbol'];
				setLatest({
					date: latestDate,
					open: res.data['Time Series (Daily)'][latestDate]['1. open'],
					high: res.data['Time Series (Daily)'][latestDate]['2. high'],
					low: res.data['Time Series (Daily)'][latestDate]['3. low'],
					close: res.data['Time Series (Daily)'][latestDate]['4. close'],
					diff: compareValues(
						res.data['Time Series (Daily)'][latestDate]['4. close'],
						res.data['Time Series (Daily)'][previousDate]['4. close']
					).diff,
					percentage: compareValues(
						res.data['Time Series (Daily)'][latestDate]['4. close'],
						res.data['Time Series (Daily)'][previousDate]['4. close']
					).percentage
				});
				setPrevious({
					date: previousDate,
					close: res.data['Time Series (Daily)'][previousDate]['4. close']
				});
				setLoading(false);
			}
		}).catch((err) => {
			console.error(err);
		});
	}, [props.symbol]);

	if (loading) {
		return <Loading></Loading>;
	} else if (error) {
		return <Error></Error>;
	} else {
		return <DisplayInfo data={{latest: latest, previous: previous, symbol: symbol.current}}></DisplayInfo>;
	}
}

Fetch.propTypes = {
	symbol: PropTypes.oneOf(symbols.map((item) => (item.symbol))),
	onError: PropTypes.func.isRequired
};

export default Fetch;