import React, { Component } from 'react';

import Auxil from '../../hoc/Auxil';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import orderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {  // A global variable, so its name is in ALL CAPS
	bacon: 0.75,
	lettuce: 0.5,
	cheese: 0.4,
	meat: 1.3
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			bacon: 0,
			lettuce: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4,
		purchasable: false
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients) // Put this object's property names in an array
			.map(ingKey => {   // .map is on this line for readablity; line break is no prob
				return ingredients[ingKey];  // Return each item in the ingredients array 
			})
			.reduce((sum, el) => { // reduce() runs function passed to it on each array value.
				return sum + el;  // Here 'sum' is the previously returned value, while el
			}, 0);                // is the currently iterating array element.
		this.setState({purchasable: sum > 0}); // Set purchasable T/F per comparison result.
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const newCount = oldCount + 1; // To save ingredient's newCount to state,
		const updatedIngredients = {   // don't edit state directly! Instead
			...this.state.ingredients  // make a copy of state,
		};							   // edit that copy, then
		updatedIngredients[type] = newCount; // save the newCount to it ...
		const priceAddition = INGREDIENT_PRICES[type]; // 
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition; // ... then use setState to ...
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		// ... merge your edited copy of state into the real state.
		this.updatePurchaseState(updatedIngredients);
	}
	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if(oldCount <= 0) {
			return;
		}
		const newCount = oldCount - 1; // To save ingred's newCount to state,
		const updatedIngredients = {   // DON'T edit state directly! Instead
			...this.state.ingredients  // copy state,
		};							   // edit that copy, 
		updatedIngredients[type] = newCount; // saving the newCount to it ...
		const priceDeduction = INGREDIENT_PRICES[type]; // 
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction; // ... then use setState to ...
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		// ... merge your edited copy of state into the real state.
		this.updatePurchaseState(updatedIngredients);
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		return(
			<Auxil>
				<Modal>
					<orderSummary ingredients={this.state.ingredients} />
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					purchasable={this.state.purchasable}
					price={this.state.totalPrice} />
			</Auxil>
		);
	}
}

export default BurgerBuilder;
