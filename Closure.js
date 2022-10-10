function direBonjour(prenom) {
	const message = (prenom === "Paul") ? "Bonjour, " + prenom + " !" : "Aurevoir " + prenom;

	// quelque chose de complexe

	return function() {
	  console.log(message);
	};
  }

  const direBonjourJohn = direBonjour("John");
  direBonjourJohn(); // Bonjour, John !

  const direBonjourPaul = direBonjour("Paul");
  direBonjourPaul(); // Bonjour, Paul !


















function direBonjour2(prenom) {
	const message = "Bonjour, " + prenom + " !" ;

	if (prenom === "Paul") {
			return function() {
				console.log("Aurevoir " + prenom);
			};
	} else {
		return function() {
			console.log(message);
		};
	}
}

  const direBonjourJohn2 = direBonjour("John");
  direBonjourJohn2(); // Bonjour, John !

  const direBonjourPaul2 = direBonjour("Paul");
  direBonjourPaul2(); // Bonjour, Paul !