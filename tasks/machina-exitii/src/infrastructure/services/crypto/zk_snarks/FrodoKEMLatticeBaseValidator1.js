const crypto = require('crypto');
module.exports = class FrodoKEMLatticeBaseValidator1 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "pmGCsjWrs5fEzT2EE56yUOAex65DQBoRATAkTGS8uAuX90MlLrAfRXkazmcgGKC2v+Ryau/lWa7VySHcy9PWaQ==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "3VryOQV7Y9w/doy80GDvbsAAcE4SdtEleTRBtjyp/VS3t2gsKKl6lApOWSiuKNFFBg59guMxGkZXEYquXZ28uQ==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "zvz45rWJLTZcuu2x7KRP19Jqtyim2aOP2CI6dLH8pKegbgsh1iOGyyKuMlrtQ+tw6sWOghbb/YxVjwh1UAmK8A==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "JNSiAnF+CHRmz81+Un2J69zDNX3H0sTRhNoof0T7lpmoYPC1fhfIIVipg7Z5TuykICA89M4+5abrmdfW7ZGD/A==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "W2ImrBW6e1dXJA4qRTTJZBrDhf/Lm/Kw+EtR3Qd6Ku/t3gGlyPuy6tml9/OYWBi5ePshGemcWH2gIctP6dAbAg==");
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
