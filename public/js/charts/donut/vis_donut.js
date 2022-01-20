// PARAMS
let dWidth = 860;
let dHeight = 350;
let colors = ["#40E0D0", "#6495ED", "#DE3163", "#1F618D ", "#5B2C6F"];

let categories = [
    { label: "Home and neighborhood", sub: ["Residential home/Neighborhood, Retail/Wholesale/Services facility", "Residential home/Neighborhood"], count: 0 },
	{ label: "School and educationnal", sub: ["Primary school", "Secondary school", "College/University/Adult education"], count: 0 },
	{ label: "Public facilities", sub: ["Medical/Care", "Public transportation", "Park/Wilderness", "Place of worship", "Restaurant/Cafe", "Retail/Wholesale/Services facility", "Entertainment Venue", "Street/Highway"], count: 0 },
	{ label: "Government/military facilities", sub: ["Government facility", "Military facility"], count: 0 },
	{ label: "Work place", sub: ["Company/Factory/Office"], count: 0 }
];


// IMPORT DATA
d3.dsv(';')("datasets/mass-shootings-in-america.csv", function(data) {

	let donut = new Donut(dWidth, dHeight, "#donut", "donutTooltip");
	donut.generateDonut(colors, categories, data, true);
});

