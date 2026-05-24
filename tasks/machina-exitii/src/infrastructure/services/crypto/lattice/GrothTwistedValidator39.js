const crypto = require('crypto');
module.exports = class GrothTwistedValidator39 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "dLU3QdgJH1BCN6x+q0a07Q+3dc1RpP4hxiLDiNQrmLbku8rV858EGtt6jZV0EvK1MiD+pZaezHGevFWFvO9xnw==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "MA8eaWVbkvGJuvP5OKddGtgv2z+hjzQo/2j/sxoLiSLQ0X7Wzl2R88YpF8rIFfdu9X786sNPDDE11KypmtHxyA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "5BYO/Ru1U7GLMbPXJxU4x7gLCs2ON+iS4GqfKOLD85t9I6dYLE3zJeKivplqO7M71pmpZMObreQku6Pf3QnN1w==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "yFx1baTm84YkVncSiRTM37FfMET+qW2qQgFjI2SadP6iJDpd8NbJU3dS1RDLFf9Y6p+oDPrQAaahApu5sM2gtg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "tqrNS8sxikSg6Et9+hAr48YHE7dO+3sddgFGLtVdSTFJc0rBHGQhMwf/prjQ8Q6iJ87XtuNbEoqmm/EA1a8sXA==");
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
