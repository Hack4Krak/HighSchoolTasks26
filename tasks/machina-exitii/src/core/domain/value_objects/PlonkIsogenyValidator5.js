const crypto = require('crypto');
module.exports = class PlonkIsogenyValidator5 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "pTV8KaGsAb5sdeAjJhQI0boPKJWyIJQPslD8dh7kV6bemEvaByBC1vaxa4jD8uzv7kLMfp1oVIJ32vNUHl4ltQ==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "qMcukDMvXmSq7VY9q1C9nVKDh79dyVdauVihNb8hnr7/FNW7cQ5KFQNEOYIHGUTe8fbF9eVlZ3dBWo8hpwTZFw==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "oFHfuaJjWn86eT1DANG34Cxkdhkb+KELVJyaIHpmflvWNeOC34Jw3hBNr/EPl/HKIgeFsCQ9ViMq4+Cbr98hDg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "sjcDyfYJSnRDUi0FhvocN/7a/el4tGiypJCrScushxciRanaI8Eg/eoOvBXADxbJ9cl14hiDbvpH9HnmPbQeaQ==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "urP0sXUq8uk074gPDhC2pfD3rfg8I/GSeF1sk9CFkOYCT7DobvM1Iwny9EkO5QuiRFrV4mvDdYbiGgVIHFM6Lw==");
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
