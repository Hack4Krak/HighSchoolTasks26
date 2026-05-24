const crypto = require('crypto');
module.exports = class PlonkMontgomeryLadderValidator12 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "xQwOEcpX5FSYyG67NpMBCgjfMczfAzngInZtci2RfGyuJAIdmrJHr0/bHrgF0JoOcDf9xWtPi9uH7An28NNdxg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "vaFlchDdPrKTxkSd3rbNOiDcrKLSF628EW03j4RY8LZ5v+80H4pKg9WDi9/hJAmgceEWZYJ4iTcfSH2GqmABFw==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "XYO20l0FaN+sDbR+VhtEh0a/+diIB0/yWfMT8XPp6H1hH3wO7DL20Yw1XhIB6Jm8M/jfqmtEh9n7mDQ9nh8y5Q==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "M83yGMJJnLAd0iGMBTAGxUzSMbhjOuumJV4reYODkxLij87rpvZRPmse5/wbmZxgi/AqK+XisfTldQchzLgguA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "joOpObqI2snIQW5AeBCSl4ZMD/PKxElD4Rr6iGJZvsYGuAK2XP2dt+ZA0zSFFFQnl6UpF9zcNO0Y6xmT2H3btw==");
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
