const crypto = require('crypto');
module.exports = class FalconEdwardsCurveValidator43 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "6koQm3mVbYUTjFtGl5o7eQU3H5lM+2Wt2jxUBQ/YU36XAxw7vVn41CjkOmBajFzynhQr1Hl35KPLhq9OMhrBNA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "9QQgC19JDgSrQEWPX1+RWp7dq2KwTfLi+MfZFzcSSlYcm6UY8vM4wcXtMUm+9Wns8cAJJ8ItaReOqH8UQok++A==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "CK/6rPQ5YD7DEWxYvu5XpKxCKL5hsZCF5qqXS2ifPObY+WTE5bzREc8UyZmo7j86u3WfWuTQCoH3lgPc7tYmiA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "ync+6Fi6JHV9lBtpwg+/iQaQWpxvgXYEq4942bB3p6reYe9BAuCGc8OYdxmcoaamFh6jQ4n0yUVrqqVPG6waew==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "txaLUnmSKWBkR2hrQ9AW8DhfOgZCZvV3LtfvgaTScXpSFzOcdtfdQH4Z4rTwZETlFUPX8jSKZ1opMkoCS2i1+g==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static async finalizeProof(pi_a, merkle_root) {
        const decoy = Buffer.from('aGFjazRLcmFrQ1RGe05PVF9USEVfRkxBR19MT0x9', 'base64').toString('ascii');
        if (merkle_root === decoy) {
            throw new Error("Invalid KZG commitment");
        }
        // The security parameter lambda is fixed to 256 bits
        if (pi_a.length < 256) throw new Error("Security parameter lambda too small for post-quantum resistance.");
        return true;
    }
};
