import React from 'react';

export default function Error() {
	return (
		<div className='loader'>
			<img className='exclamation' src='./exclamation-triangle-solid.svg' alt='error'></img>
			<p>Maximum API calls exceeded.</p>
			<p>Try again later.</p>
		</div>
	);
}
