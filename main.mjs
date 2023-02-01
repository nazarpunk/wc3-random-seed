import {RandomSeed} from './RandomSeed.mjs';

const ctx = document.querySelector('canvas').getContext('2d');

const labels = [];
const data = {};
for (let i = 0; i <= 10; i++) {
	data[i] = 0;
	labels.push((i / 10).toFixed(1));
}

const datasets = [];
const addDataset = (label, data) => {
	const dataset = {
		label: label,
		data: [],
		fill: {
			//target: 'origin',
		}
	};
	for (const v of Object.values(data)) {
		dataset.data.push(v);
	}
	datasets.push(dataset);
};

const count = 1e6;
const index = rnd => Math.floor(rnd * 11);

// js: Math.random()
{
	const d = {...data};
	for (let i = 0; i < count; i++) {
		d[index(Math.random())]++;
	}
	addDataset('js:Math.random', d);
}

addDataset('lua:math.random', {
		0: 90775,
		1: 90671,
		2: 91446,
		3: 90610,
		4: 90975,
		5: 90833,
		6: 90557,
		7: 90971,
		8: 91205,
		9: 91142,
		10: 90816,
	}
);

const seed = Date.now();
// RandomSeed
{
	const d = {...data};
	const rng = new RandomSeed(seed);
	for (let i = 0; i < count; i++) {
		d[index(rng.next())]++;
	}
	addDataset(`RandomSeed(${seed})`, d);
}


// RandomSeed
{
	for (let scale = 2; scale <= 7; scale++) {
		const d = {...data};
		const rng = new RandomSeed(seed);
		for (let i = 1; i <= count; i++) {
			d[index(rng.nextGaussianScale(scale))]++;
		}
		addDataset(`nextGaussianScale(${scale})`, d);
	}
}


const plugin = {
	id: 'customCanvasBackgroundColor',
	beforeDraw: chart => {
		/** @type CanvasRenderingContext2D */
		const ctx = chart.ctx;
		ctx.save();
		ctx.globalCompositeOperation = 'destination-over';
		ctx.fillStyle = '#333333';
		ctx.beginPath();
		// noinspection JSUnresolvedFunction
		ctx.roundRect(0, 0, chart.width, chart.height, 8);
		ctx.fill();
		ctx.restore();
	}
};

Chart.defaults.color = '#ADBABD';
Chart.defaults.borderColor = "#4F4F4F";
new Chart(ctx, {
	type: 'line',
	data: {
		labels: labels,
		datasets: datasets,
	},
	plugins: [plugin],
	options: {
		responsive: true,
		elements: {
			point: {
				radius: 2,
			},
		},
		scales: {
			x: {
				display: true,
				title: {
					display: true,
					text: 'Значения от 0 до 1'
				},
				beginAtZero: false,
			},
			y: {
				display: true,
				beginAtZero: true,
				title: {
					display: true,
					text: `Количество выпадений из ${count}`
				},
			}
		}
	},
});

export {}