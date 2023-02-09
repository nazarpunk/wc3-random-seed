import {RandomSeed} from './RandomSeed.mjs';

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

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
		tension: 0.4,
	};
	for (const v of Object.values(data)) {
		dataset.data.push(v === 0 ? null : v);
	}
	datasets.push(dataset);
};

const count = 1e6;
const index = rnd => Math.floor(rnd * 11);

const seed = Date.now();

{
	const d = {...data};
	const rng = new RandomSeed(seed);
	for (let i = 0; i < count; i++) {
		d[index(rng.uniform())]++;
	}
	addDataset(`RandomSeed(${seed})`, d);
}

{
	for (let scale = 2; scale <= 7; scale++) {
		const d = {...data};
		const rng = new RandomSeed(seed);
		for (let i = 1; i <= count; i++) {
			d[index(rng.normal(scale))]++;
		}
		addDataset(`normal(${scale})`, d);
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
				radius: 4,
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
