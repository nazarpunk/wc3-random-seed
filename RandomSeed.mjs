export class RandomSeed {
	constructor(seed) {
		// 1103515245, 12345, 0x10000 from Ansi C
		// 1664525, 1013904223, 0x10000 from Numerical Recipes
		// 214013, 2531011, 0x10000 from MVC
		this.a = 1103515245;
		this.c = 12345;
		this.m = 0x10000;
		this.ic = this.c;
		this.x = seed;
	}

	/**
	 * @return {number}
	 */
	uniform() {
		const t = this.a * this.x + this.c;
		this.x = t % this.m;
		this.c = Math.floor(t / this.m);
		return this.x / 0x10000;
	}

	/**
	 * @param {number} min
	 * @param {number} max
	 * @return {number}
	 */
	uniformInt(min, max) {
		return Math.floor(this.uniform() * (max - min + 1)) + min;
	}

	/**
	 * @param {number} min
	 * @param {number} max
	 * @return {number}
	 */
	uniformReal(min, max) {
		return this.uniform() * (max - min) + min
	}

	/**
	 * @param {number} factor
	 * @return {number}
	 */
	normal(factor) {
		let rand = 0;
		for (let i = 0; i < factor; i++) {
			rand += this.uniform();
		}
		return rand / factor;
	}

	/**
	 * @param {number} min
	 * @param {number} max
	 * @param {number} factor
	 * @return {number}
	 */
	normalInt(min, max, factor) {
		return Math.floor(this.normal(factor) * (max - min + 1)) + min;
	}

	/**
	 * @param {number} min
	 * @param {number} max
	 * @param {number} factor
	 * @return {number}
	 */
	normalReal(min, max, factor) {
		return this.normal(factor) * (max - min) + min
	}
}
