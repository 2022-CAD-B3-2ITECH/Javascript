// Exercice page 29

// Exercice 1

// function est5(tocheck) {
// 	return tocheck === 5;
// }


// function aumoins3 (array,verifcallback)
// {
// 	var compteur = 0;
// 	// Tout les element de array
// 	for (element of array)
// 	{
// 		// verifier le callback
// 			// si vrai : incrementer compteur
// 			// si faux : rien
// 		if (verifcallback(element))
// 			compteur ++

// 	}
// 	// renvoyer si compteur >= 3
// 	return compteur >= 3
// }

// var arr = [1,4,5,5,5,4]

// console.log(aumoins3([1,4,5,5,5,4],est5)); // true
// console.log(aumoins3([1,4,5,5,4],est5)); // false
// console.log(aumoins3([1,4,5,5,5,5,5,4],est5)); // true
// console.log(aumoins3([1,4],est5)); // false


// Exercice 3

function filter(arr,verifcallback) {
	var tab = []
	for (element of arr)
	{
		if(verifcallback(element))
		{
			tab.push(element);
			// mettre dans le tab;
		}
	}
	// retourner tab
	return tab;
}

function sup2(element) {
	return element > 2
}
// [1,2,3,2,5,7]
// sup2 == function
// sup2() == retour execution
console.log(filter([1,2,3,2,5,7],sup2))