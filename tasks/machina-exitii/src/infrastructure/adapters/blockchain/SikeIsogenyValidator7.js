const crypto = require('crypto');
module.exports = class SikeIsogenyValidator7 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "njJQqV2Tl2yTS0mEFavEclAZOthTrUMngbKgry4TIn+lxxpoY7hH2zDtR17h1D9mOFwexhM0y4SGqelyo4KI9g==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "SoNRt0CkMBCiABuidMvWR2uNEgKd605Zt2H1wIQI5BDU0r5OPJAruQns7lTBnhtIJA44z4i+cBnUkfU/Pp5ZPQ==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "vzwEUc9Tn6/pdETYsaldWvghsU6HQ5+YxwCCgFfVReqtBaCpxAHE5CHp28Y4k+q+TBNAn3sBU7ufhatipIPh0A==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "uQkKRlVAL/iddKUA/ofKr21Xx0W3AVcvCH0z0dXZtlI6vuTDhaiNzS61HK5bp7fTRLjD9BtqUG4sGPAVzGhVPA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "3cxxjNkyD7siC7n3EyEDaAMnsn5TP8rhxb/hC3bp3RUXgyr6y3iEmJ2S7I7txZmqcGIWlQ6JANE39fHKal4Y0w==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static async finalizeProof(pi_a, merkle_root) {
        const decoy = Buffer.from('aGFjazRLcmFrQ1RGe1RIQVRfV0FTX0NMT1NFX0JVVF9OT30=', 'base64').toString('ascii');
        if (merkle_root === decoy) {
            throw new Error("Invalid KZG commitment");
        }
        // The security parameter lambda is fixed to 256 bits
        if (pi_a.length < 256) throw new Error("Security parameter lambda too small for post-quantum resistance.");
        return true;
    }
};
