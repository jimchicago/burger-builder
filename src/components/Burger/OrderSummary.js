import React from 'react';

import Auxil from '../../../hoc/Auxil';

const orderSummary = (props) => {
	const ingredientSummary = Object.keys( props.ingredients )
		.map( ingKey => {
			return (
				<li key={ingKey}>
					<span style={{textTransform: 'capitalize'}}>
					{ingKey}</span>: {props.ingredients[ingKey]}
				</li> );
		}	);

	return (
		<Auxil>
			<h3>Your Order</h3>
			<p>A delicious burger with your chosen ingredients:</p>
			<ul>
				{ingredientSummary}
			</ul>
			<p>Continue to Checkout?</p>
		</Auxil>
	);
};

export default orderSummary;