const crypto = require('crypto');
module.exports = class PlonkMontgomeryLadderValidator31 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "6UnElDrZ4OJnvhoYy9ocmHIGK5cbWVcsW3H8FBwqQKzks12ITkslBqc7/3IwwkB+4eeu4Ywg+G+OQa1M0G05hQ==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "uPHOG0rG9wjXgqLCzeGtkRyRktpxT8iSqAnUBSaiJ0LmHRxtLa+eo0Ty9ZQoYgiL0AHsGkkJbWu0a8QhBap3LA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "c/p4YFbts/5wZeqVVmUQlaiqP3MqYINq+DQbe090uuLgtvw2NyLToFTgfQ2ounkUUZ4N7IKCvESY8ooaubQKIg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "cNKWFsaPGtdUGcSdM7zrogFLEVpW/XheAmcbTCiDEgkPm/HRfr0vwpXG5Z/j/WTQK2v3p+eB7DvV++J4apOvSg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "d+Kmh585Zha6UY35TYKSQLkbuaMm/JeshXfmN9gderOSKd23Eu6G45e3TSJDPrwj9M6jNMnrojYIwLVhHBOgwQ==");
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
