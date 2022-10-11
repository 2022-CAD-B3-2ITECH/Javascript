class Village
{
	constructor(nbvillageois = 1,nbbois = 100,nbpierre = 100,nbor = 0,batiments = ["HDV"]){
		this.nbvillageois = nbvillageois;
		this.nbbois = nbbois;
		this.nbpierre = nbpierre;
		this.nbor = nbor;
		this.batiments = batiments;
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
			console.log("Gate : 1.1");

			// i++  <====> i = i + 1
			// i -= 100  <====> i = i - 100
			this.nbpierre = this.nbpierre - 100;
			this.batiments.push("MINEP")
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

			this.batiments.push("SCIE")
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

			this.batiments.push("MINEO")
			return true
		}
		return false
	}

}



let lesparre = new Village()


console.log(lesparre.nbvillageois)
console.log(lesparre.nbbois)
console.log(lesparre.nbpierre)
console.log(lesparre.nbor)
console.log(lesparre.batiments)
console.log("-----------------------");
console.log("--------PIERRE----------");
console.log(lesparre.construiremine())
console.log(lesparre.batiments)
console.log("-----------------------");
console.log("----------BOIS--------");
console.log(lesparre.construirescierie())
console.log(lesparre.batiments)
console.log("-----------------------");
console.log("----------OR----------");
console.log(lesparre.construiremineor())
console.log(lesparre.batiments)
console.log("-----------------------");

