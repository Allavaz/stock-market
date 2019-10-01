import React from 'react';
import PropTypes from 'prop-types';

export default function DisplayInfo(props) {
	return (
		<div className='container'>
			<div className='main' style={{color: props.data.latest.diff > 0 ? 'green' : 'red'}}>
				<div className='value'>
					<span>{parseFloat(props.data.latest.close).toFixed(2)}</span>
					<span className='currency'>USD</span>
				</div>
				<div className='diff'>{`${props.data.latest.diff > 0 ? '+' : ''}${props.data.latest.diff} (${props.data.latest.diff > 0 ? '+' : ''}${props.data.latest.percentage}%)`}</div>
			</div>
			<div className='secondary'>
				<div className='open'>
					<div className='value'>{parseFloat(props.data.latest.open).toFixed(2)}</div>
					<div className='label'>Open</div>
				</div>
				<div className='high'>
					<div className='value'>{parseFloat(props.data.latest.high).toFixed(2)}</div>
					<div className='label'>High</div>
				</div>
				<div className='low'>
					<div className='value'>{parseFloat(props.data.latest.low).toFixed(2)}</div>
					<div className='label'>Low</div>
				</div>
				<div className='prevclose'>
					<div className='value'>{parseFloat(props.data.previous.close).toFixed(2)}</div>
					<div className='label'>Prev. Close</div>
				</div>
				<div className='lastrefreshed'>
					<div className='value'>{props.data.latest.date}</div>
					<div className='label'>Last Refreshed</div>
				</div>
			</div>
		</div>
	);
}

DisplayInfo.propTypes = {
	data: PropTypes.object.isRequired
};