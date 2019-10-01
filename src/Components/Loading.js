import React from 'react';

export default function Loading() {
	return (
		<div className='loader'>
			Loading...
			<img className='loadingimg' src='./arrows.svg' alt='loading'></img>
		</div>
	);
}
