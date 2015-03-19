
var wave_names =	[	"Zerglings",	"Lava Crawlers",	"Space Cows",	"Marines",			"Hoverlords",	"Roaches",	"Zealots",		"Reapers",		"Exotics",	"The Infestor",
						"Scantipedes",	"Hydralisks",		"Brood Lords",	"Immortals",		"Lurkers",		"Hellions",	"Marauders",	"Corruptors",	"Lyotes",	"Fatty",
						"Feederlings",	"Abberations",		"A.R.E.S.",		"High Templars",	"Hybrids",		"Kerrigan",	"Predators",	"Preservers",	"Zukars",	"Brutalisk"	];
						
var wave_income = 	[	13,	15,	17,	18,	20,	22,	23,	25,	27,	28,		30,	32,	33,	35,	37,	38,	40,	42,	43,	45,		47,	48,	50,	52,	53,	55,	57,	58,	60,	62	];
var creep_income = 	[	3,	4,	4,	5,	5,	5,	6,	6,	6,	81,		6,	5,	7,	12,	9,	8,	9,	8,	10,	126,	10,	13,	15,	17,	81,	19,	21,	26,	27,	200	];
var num_creeps =	[	12,	15,	15,	12,	12,	12,	10,	12,	15,	1,		18,	15,	15,	8,	12,	15,	12,	15,	12,	1,		12,	16,	12,	12,	4,	12,	12,	8,	10,	1	];

function getIncome(wave_num, current_mins, current_income, expected_leaks) {
	return current_mins + current_income + wave_income[wave_num] + creep_income[wave_num] * (num_creeps[wave_num] - expected_leaks);
}

function updateIncome() {
	
	var currentMinerals = parseInt(document.getElementById('txtCurrentMins').value) || 1;
	var currentWave = parseInt(document.getElementById('txtWaveNumber').value) || 0;
	var currentIncome = parseInt(document.getElementById('txtIncome').value) || 0;
	var expectedLeaks = parseInt(document.getElementById('txtExpected').value) || 0;

	var expected = getIncome(currentWave - 1, currentMinerals, currentIncome, expectedLeaks);
	
	if (currentWave >= 1 && currentWave <= 30) document.getElementById("waveName").innerHTML = wave_names[currentWave - 1];
	else document.getElementById("waveName").innerHTML = "";
	
	if (expectedLeaks > 0 && expectedLeaks <= num_creeps[currentWave - 1]) {
		document.getElementById("loss").innerHTML = expectedLeaks * creep_income[currentWave - 1] + " minerals lost";
	}
	
	else document.getElementById("loss").innerHTML = "";
	
	if (currentMinerals >= 0 && currentWave >= 1 && currentWave <= 30 && currentIncome >= 0) {
	document.getElementById("info").innerHTML = "Expected minerals by " + wave_names[currentWave] + ": " + expected
		+ "<br>Base income from this round is " + wave_income[currentWave];
	}
	
	else document.getElementById("info").innerHTML = "";
}

function initialize() {
	document.getElementById('txtWaveNumber').value = 1;

	document.getElementById('txtCurrentMins').value = 100;
	document.getElementById('txtIncome').value = 0;
	document.getElementById('txtExpected').value = 0;
	
	updateIncome();
}