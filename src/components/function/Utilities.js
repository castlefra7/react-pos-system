export function addDataChart(chart, data, labels, backgroundColor) {
	removeDataChart(chart);
	labels.forEach((label) => {
		chart.data.labels.push(label);
	})

	if(chart.config.type === "doughnut") {
		chart.data.datasets.forEach((dataset) => {
			data.forEach((d) => {
				dataset.data.push(d);
				backgroundColor.forEach((color) => {
					dataset.backgroundColor.push(color);
				})
			})
		});
	} else {
		chart.data.datasets.forEach((dataset) => {
			data.forEach((d) => {
				dataset.data.push(d);
			})
		});
	}
	
	chart.update();
}

function removeDataChart(chart) {
	chart.data.labels.splice(0, chart.data.labels.length);
	chart.data.datasets.forEach((dataset) => {
		dataset.data.splice(0, dataset.data.length)
		if(chart.config.type === "doughnut") {
			dataset.backgroundColor.splice(0, dataset.backgroundColor.length);
		}
	});

	chart.update();
}

export const months = [
	'Janvier',
	'Février',
	'Mars',
	'Avril',
	'Mai',
	'Juin',
	'Juillet',
	'Août',
	'Septembre',
	'Octobre',
	'Novembre',
	'Décembre'
];

export function dateFormat(date) {
	const months = [
		'Janvier',
		'Février',
		'Mars',
		'Avril',
		'Mai',
		'Juin',
		'Juillet',
		'Août',
		'Septembre',
		'Octobre',
		'Novembre',
		'Décembre'
	];
	const days = [
		'Dim',
		'Lun',
		'Mar',
		'Mer',
		'Jeu',
		'Ven',
		'Sam'
	]
	let dt = new Date(date);
	return days[dt.getDay()] + " " + (dt.getDate()) + " " + months[dt.getMonth()] + " " + dt.getFullYear();
}

export function bodyHeight(document) {
	var body = document.body,
		html = document.documentElement;

	const height = Math.max(body.scrollHeight, body.offsetHeight,
		html.clientHeight, html.scrollHeight, html.offsetHeight);

	return height;
}

export function getValue(location, key) {
	const search = location.search;
	const index = search.indexOf(key);
	if (index === -1) {
		return "";
	} else {
		let begin = index + key.length + 1;
		let result = "";
		while (search[begin] !== "&" && begin < search.length) {
			result = result.concat(search[begin]);
			begin++;
		}
		return result;
	}
}

export function randomName(name) {
	const a = Math.floor(Math.random() * 10).toString();
	const b = Math.floor(Math.random() * 10).toString();
	const c = Math.floor(Math.random() * 10).toString();
	const d = Math.floor(Math.random() * 10).toString();
	const e = Math.floor(Math.random() * 10).toString();
	const f = Math.floor(Math.random() * 10).toString();
	const g = Math.floor(Math.random() * 10).toString();
	const h = Math.floor(Math.random() * 10).toString();
	const i = Math.floor(Math.random() * 10).toString();
	const j = Math.floor(Math.random() * 10).toString();


	return a + b + c + d + e + f + g + h + i + j + name;
}
