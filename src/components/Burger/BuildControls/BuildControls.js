import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label: 'Meat', type: 'meat' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Lettuce', type: 'lettuce' },
	{ label: 'Bacon', type: 'bacon' }	
];

const buildControls = ( props ) => (
	<div className={classes.BuildControls}>
		<p>Current Price: <b>${props.price.toFixed(2)}</b></p>
		{ controls.map(ctrl => (
			<BuildControl
				key={ctrl.label}
				label={ctrl.label}
				added={() => props.ingredientAdded(ctrl.type)}
				removed={() => props.ingredientRemoved(ctrl.type)}
				disabled={props.disabled[ctrl.type]} />
		))}
		<button
			className={classes.OrderButton}
			disabled={!props.purchasable}>Order Now</button>
	</div>
);

export default buildControls;