const prompt = require('prompt-sync')({sigint: true});



/**
 * It takes a string and returns a string
 * @param move - The move that the player wants to make.
 * @returns The value of the key in the object.
 */
function prettymove(move) {
	const pmove = {"SCIE": "Construire une scierie", "MINEP": "Construire une mine de pierre" ,"MINEO": "Construire une mine d'or" ,"REPARER": "Reparer un batiment" ,"RIEN": "Ne rien faire ..."};
	return pmove[move];
}

class Village
{
	constructor(nbvillageois = 1,nbbois = 100,nbpierre = 100,nbor = 0,batiments = [new Batiment("HDV")]){
		this.nbvillageois = nbvillageois;
		this.nbbois = nbbois;
		this.nbpierre = nbpierre;
		this.nbor = nbor;
		this.batiments = batiments;
		this.turn = 0;
	}

	is_alive()
	{
		return this.getHDV().hp > 0
	}

	// construiremine() une mine coutera 100 pierre a construire et
	// ajoutera un batiment (MINEP)
	construiremine()
	{
		// couter 100 pierre
			// si on a au moins 100 pierre on peut construire
				// soustraire
				// ajouter un batiment
				//		push sur le tableau batiments
		if(this.nbpierre >= 100)
		{
			// i++  <====> i = i + 1
			// i -= 100  <====> i = i - 100
			this.nbpierre = this.nbpierre - 100;
			this.batiments.push(new Batiment("MINEP"))
			return true;
		}
		return false;
	}

	// construirescierie() une scierie coutera 100 bois a construire et
	// ajoutera un batiment (SCIE)
	construirescierie()
	{
		if(this.nbbois >= 100)
		{
			this.nbbois = this.nbbois - 100;

			this.batiments.push(new Batiment("SCIE"))
			return true;
		}
		return false
	}
													// &&
	// construiremineor() une scierie coutera 100 bois et 100 pierre a
	// construire et ajoutera un batiment (MINEP)
	construiremineor()
	{
		if(this.nbbois >= 100 && this.nbpierre >= 100)
		{
			this.nbbois = this.nbbois - 100;
			this.nbpierre = this.nbpierre - 100;

			this.batiments.push(new Batiment("MINEO") )
			return true
		}
		return false
	}

	createBatiment(type)
	{
		switch (type) {
			case "MINEP":
				return this.construiremine();

			case "MINEO":
				return this.construiremineor();

			case "SCIE":
				return this.construirescierie();

			default:
				return false;
		}
	}



	recolterressource(batiment)
	{
		const prod = batiment.produire()

		switch (prod.type) {

			case "MINEP":
				this.nbpierre += prod.uniteproduite;
				break;

			case "MINEO":
				this.nbor += prod.uniteproduite;
				break;

			case "SCIE":
				this.nbbois += prod.uniteproduite;
				break;

			default:
				break;
		}

	}

	toutrecolter()
	{
		for (const bat of this.batiments) {
			this.recolterressource(bat);
		}
	}

	possibilitesduprochaintour ()
	{
		let possibilites = []

		if(this.nbbois >= 100)
			possibilites.push("SCIE");

		if(this.nbbois >= 100 && this.nbpierre >= 100)
			possibilites.push("MINEO");

		if(this.nbpierre >= 100)
			possibilites.push("MINEP");

		for (const bat of this.batiments) {
			if(this.nbor >= bat.repare_cost) {
				possibilites.push("REPARER");
				break;
			}
		}
		possibilites.push("RIEN");
		return possibilites;
	}


	/**
	 * The function processreparation() is supposed to display a list of buildings that can be repaired,
	 * then ask the user to choose one of them and then ask the user to enter a budget for the repair, and
	 * then call the function restaurer_hp() on the chosen building.
	 */
	processreparation () {

		console.log("Vous pouvez reparer les batiments suivant : ");
		let batimentsreparable = this.batiments.filter((bat)=>{return this.nbor >= bat.repare_cost})

		for (const b of batimentsreparable) {
			console.log(`[${batimentsreparable.indexOf(b)}] : ${b.type } : ${b.hp}`);
		}
		// verifier choix
		let choix = prompt("Quel batiment voulez vous reparer ? : ")
		while (!(choix >= 0 && choix <= batimentsreparable.length))
		{
			choix = prompt("(Vous avez choisi une action impossible)\nQuel batiment voulez vous reparer ? : ");
		}
		// verifier or
		let or = prompt("Quel est votre budget reparation ?")
		// boucle
		while (!(or >= 0 && or <= this.nbor))
		{
			or = prompt("(Vous avez choisi un montant errone)\nQuel est votre budget reparation ? : ");
		}
		let resultat = batimentsreparable[choix].restaurer_hp(or)
		// le batiment a deja ete reparer
		this.nbor -= resultat.coutor
		console.log(`Vous avez restaure ${resultat.hprestaurer}HP au batiment : ${batimentsreparable[choix].type } , HP : ${batimentsreparable[choix].hp} , pour un cout de ${resultat.coutor}`);
	}

	jouertour()
	{
		this.turn++;

		this.toutrecolter();
		this.afficher();

		// on calcule les possibilités d'action
		const possibilites = this.possibilitesduprochaintour()


		console.log("Voici vos possibiliter :")
		for (const pos of possibilites) {
			console.log(`[${possibilites.indexOf(pos)}] : ${prettymove(pos)}`);
		}


		let choix = prompt("Que voulez vous faire ? : ");
		while (!(choix >= 0 && choix <= possibilites.length))
		{
			choix = prompt("(Vous avez choisi une action impossible)\nQue voulez vous faire ? : ");
		}
		if(["SCIE","MINEP","MINEO"].includes(possibilites[choix]))
		{
			this.createBatiment(possibilites[choix])
		}
		else if (possibilites[choix] === "REPARER")
		{
			this.processreparation()
		}

		const HDV = this.getHDV()
		HDV.hp--;
	}

	getHDV(){
		return this.batiments.find((bat) => {return bat.type === "HDV"})
	}

	afficher()
	{
		console.log("------DISPLAY-------");
		console.log("Tour : " + this.turn);
		// console.log("Villageois : " + this.nbvillageois);
		console.log("Bois : " + this.nbbois);
		console.log("Pierre : " + this.nbpierre);
		console.log("Or : " + this.nbor);
		console.log("Batiments : " + this.batiments.length);
		console.log("Details des batiments : ");
		for (const batiment of this.batiments) {
			batiment.afficher();
		}
		console.log("--------------------");
	}
}


class Batiment
{
	constructor(type, hp = 12, production  = 15, repare_cost = 2)
	{
		this.type = type;
		this.hp = hp;
		this.production = production;
		this.repare_cost = repare_cost;
	}

	restaurer_hp(montantor)
	{
		let hprestaurer =  Math.floor(montantor / this.repare_cost);

		this.hp = this.hp + hprestaurer;

		return {hprestaurer : hprestaurer, coutor : this.repare_cost * hprestaurer};
	}

	produire()
	{
		return {type : this.type, uniteproduite: this.production};
	}


	afficher()
	{
		console.log(" - " + this.type + " : " + this.hp + " HP");
	}
}



let myvillage = new Village()

while (myvillage.is_alive())
{
	myvillage.jouertour()
}



