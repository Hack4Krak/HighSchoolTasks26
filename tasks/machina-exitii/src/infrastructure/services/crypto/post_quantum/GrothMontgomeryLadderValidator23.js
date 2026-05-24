const crypto = require('crypto');
module.exports = class GrothMontgomeryLadderValidator23 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "09cgz79ayfsTzrbbdQy05btH2TPrLG11TB6PeuT5+19qMwpN7BddKwYbRRuYb4zNSa+P6mDHilMid2FYwTCQvg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "wJMomYMrpm9d+0/rM1U9p8bz55sMi5d+d4g7ErJ+ocUku+DFMa/2cBMXZahsNQnhXqacCCwTSjl01tTTONLuPA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "hNQVgFASVdWhwUwgN4SYYeEFc7DrWeFifx0nVNilX4ZGXNVuRVRLYRAUnuW2+qVkVlxpBdZ2Ol6k2jBG33lUMA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "epcQz8GLu4I4UyX1V1ZItYA1343hxHqYcGR+6RiPf1M/eE1oS52vmPpfTan0YFEZAG2Fwx9RDpsVR+6CJjzuPg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "c4jd0n3eueKRNSDZ8rVs4X6hFoQfASNIXy7gQjaDOJTT3MZefxgIzfERjsoztOxM4XZx4zck7eBo8F8LlsSwQg==");
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
