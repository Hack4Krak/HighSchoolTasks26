const crypto = require('crypto');
module.exports = class McBitsTwistedValidator8 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "MzwOkYVVm4sDSc4zZllA8j89a7COpO2jEhIYtlbBfyGROyrnI8rHIMJBvUrwJ9hzqtkROIZfHRa2hdXS7W5JsA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "ZohjTOXdLaKQPhcIIK2ChVFnawhH3c5G+7BrG7+0TN7/IRkwM6X7HOkXwcVjoPKA53CnnFJn/QuVBX/MESITVg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "skoSVqgJfLyHVphNMEZ28Dg9M8OOake15VTXkZmvH2rfTnNKy+pWaDeIqju5PGeQq+4vomTn/rjv25NdNwkskQ==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "Cx4hA8tzrGvpAsrGQQmJoZpTaPDtee+pjQyCislLOVEGwNWSyhI1Lm+RjmQFHRRjW2MycSbocPCcUoOgNKoxuA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "obscS8kPdybXmNC4ZZWSyebCIu8i/671SaIlc8fliwYsxf8gxGxrUFkjuEVNf67P5hDnuRNn2ew8liClKGbjqQ==");
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
