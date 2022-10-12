const prompt = require('prompt-sync')({sigint: true});



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
	// construiremine() une mine coutera 100 pierre a construire et
	// ajoutera un batiment (MINEP)

	is_alive()
	{
		return this.getHDV().hp > 0
	}
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
		console.log("gate 2");
		console.log("this.nbbois >= 100 : ",this.nbbois >= 100);
		console.log("this.nbbois : ",this.nbbois);
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
		for (const bat of this.batiments) {
			bat.afficher();
		}
		console.log("--------------------");
	}

	recolterressource(batiment)
	{
		const prod = batiment.produire()
			switch (batiment.type) {

				case "MINEP":
					this.nbpierre += prod;
					break;

				case "MINEO":
					this.nbor += prod;
					break;

				case "SCIE":
					this.nbbois += prod;
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


	processreparation () {
		console.log("Vous pouvez reparer les batiments suivant : ");
		let batimentreparable = this.batiments.filter((bat)=>{return this.nbor >= bat.repare_cost})

		for (const b of batimentreparable) {
			console.log(`[${batimentreparable.indexOf(b)}] : ${b.type } : ${b.hp}`);
		}
		const choix = prompt("Quel batiment voulez vous reparer ?")
		const or = prompt("Quel est votre budget reparation ?")

		batimentreparable[choix].restaurer_hp(or)

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

		const choix = prompt("Que voulez vous faire ? : ");

		console.log(possibilites[choix] in ["SCIE","MINEP","MINEO"]);
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

		return {hprestaurer : hprestaurer, coutor : montantor - (this.repare_cost * hprestaurer)};
	}

	produire()
	{
		return this.production;
	}


	afficher()
	{
		console.log(" - " + this.type + " : " + this.hp + " HP");
	}
}



let myvillage = new Village()

while (myvillage.is_alive()) {
	myvillage.jouertour()
}