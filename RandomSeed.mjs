export class RandomSeed {
	constructor(seed) {
		this.m_w = seed;
		this.m_z = 987654321;
	}

	/**
	 * @return {number}
	 */
	uniform() {
		this.m_z = 36969 * (this.m_z & 65535) + (this.m_z >> 16) & 4294967295;
		this.m_w = 18000 * (this.m_w & 65535) + (this.m_w >> 16) & 4294967295;
		return ((this.m_z << 16) + this.m_w & 4294967295) / 4294967296 + .5;
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