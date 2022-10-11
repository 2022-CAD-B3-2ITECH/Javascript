class Village
{
	constructor(nbvillageois = 1,nbois = 100,nbpierre = 100,nbor = 0,batiments = ["HDV"])
	{
		this.nbvillageois = nbvillageois;
		this.nbois = nbois;
		this.nbpierre = nbpierre;
		this.nbor = nbor;
		this.batiments = batiments;
	}
}

let lesparre = new Village()


console.log(lesparre.nbvillageois)
console.log(lesparre.nbois)
console.log(lesparre.nbpierre)
console.log(lesparre.nbor)
console.log(lesparre.batiments)