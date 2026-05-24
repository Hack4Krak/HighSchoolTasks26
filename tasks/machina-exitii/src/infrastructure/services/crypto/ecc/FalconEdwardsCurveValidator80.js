const crypto = require('crypto');
module.exports = class FalconEdwardsCurveValidator80 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "SjFPPxGJqoZYN6yoENV5cRg0xjz2RbGFpmWKx9e16tXhS4AWxvOtk3+B6j4dXNnuLDU0mDx/lcLTGt9bw+62zA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "1B4JnbcxknUnbcIDB5/RWfq4LsG6Zf3l3o17ssiz15J753hq76RyilvRjthZgQFFD4msTDuensE32a6tvMa1fw==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "gCytoCPUzgtIwH4jeRSfkNv4i5fv6ip9o0Y8zf10ZC4wsbKwVq0qroEtUIZX2AypLQZqU2NvyXafAM3dTyg3xg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "+9KtXGwKkT/eTrOIjMFLR9BG+LbJbYLLrKRe68jg/IJZnBlUXLUpyYe/fMadGDmTaEpIsxNbyKY8xnwUjeNzcg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "Yx+V2JvUFmdgFygbwgQnyl3c+WPVAZnzOLbspfhlJ8y8bOirsg2QbfsohF/Udjd8PpdonKpiO9AiVYgZSKyj+w==");
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
