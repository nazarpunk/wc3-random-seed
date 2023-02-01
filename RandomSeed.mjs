export class RandomSeed {
	constructor(seed) {
		this.m_w = seed;
		this.m_z = 987654321;
	}

	next() {
		this.m_z = 36969 * (this.m_z & 65535) + (this.m_z >> 16) & 4294967295;
		this.m_w = 18000 * (this.m_w & 65535) + (this.m_w >> 16) & 4294967295;
		return ((this.m_z << 16) + this.m_w & 4294967295) / 4294967296 + .5;
	}

	/**
	 * @param factor
	 * @return {number}
	 */
	nextGaussianScale(factor) {
		let rand = 0;
		for (let i = 0; i < factor; i += 1) {
			rand += this.next();
		}
		return rand / factor;
	}

	/**
	 * @param {number} min
	 * @param {number} max
	 * @return {number}
	 */
	int(min, max) {
		return Math.floor(this.next() * (max - min + 1)) + min;
	}

	real(min, max){
		return this.next() * (max - min) + min
	}
}