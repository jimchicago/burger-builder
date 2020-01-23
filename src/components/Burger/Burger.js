import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => {
	// Object.keys() returns an array of the given object's property names (their "keys")
	let arrayedIngredients = Object.keys( props.ingredients )
		.map(ingKey => {
			return [...Array( props.ingredients[ingKey] )].map((_, i) => {
				return <BurgerIngredient key={ingKey + i} type={ingKey} />
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el)
		}, []);
	if(arrayedIngredients.length === 0) {
		arrayedIngredients = <p>Please start adding ingredients!</p>
	};
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{arrayedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>

	);
}

export default burger;