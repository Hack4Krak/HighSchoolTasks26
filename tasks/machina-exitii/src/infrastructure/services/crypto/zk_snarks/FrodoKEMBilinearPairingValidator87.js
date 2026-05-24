const crypto = require('crypto');
module.exports = class FrodoKEMBilinearPairingValidator87 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "l9C4pEnQNIwQpuISfkTssjKNB6yb7anYIEz/dkZPuFSmIYE3eLp+Lv5/mcYAkN5U+MNfeaD6PErnhIDJW4Uuaw==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "PqjEHn2Sh08WmStWw4O4AtSCOcDdVMkVhKk2PYKejTtdaBNMQ4Y21GukJy+B3y4HZd33K2MhnQNi08APjbzTPQ==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "F7jKd5p2GZsscv4zbBo5hvpmWL/4LDq9KDDLAp6MIZ+P3gyKCRdiBm6zCTIbPYm1qG7jAFpiDf42AaHz8z+bTA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "KqWoycAcoWrCG++25p3v7OD5+kTV8kxdVcnNKr2N3wZZIZaPHAEgEnRh+o1lOUtoVqi12ik4TafI3qVTRGnSoA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "+10MAYX40M5ZKU8MoVDfVtHEdjtF/ml49Pgg+Om8/352MWSwdXnCrJl62xCG4fGvBylUXzC8yKDd64X93cLpBA==");
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
