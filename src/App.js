import React, { useState, useRef } from 'react';
import './App.css';
import Fetch from './Components/Fetch';
import symbols from './symbols';

function App() {
	const [symbol, setSymbol] = useState(symbols[0].symbol);
	const selectorRef = useRef(null);

	function changeSelect(s) {
		selectorRef.current.value = s;
	}

	return (
		<div className='app'>
			<h1>Stock Market</h1>
			<select className='selector' ref={selectorRef} onChange={(e) => {
				setSymbol(e.target.value);
			}}>
				{symbols.map((item) => (
					<option key={item.symbol} value={item.symbol}>{`${item.name} (${item.symbol})`}</option>
				))}
			</select>
			<Fetch symbol={symbol} onError={(s) => changeSelect(s)}></Fetch>
		</div>
	);
}

export default App;