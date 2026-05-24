const crypto = require('crypto');
module.exports = class NTRUHomomorphicValidator57 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "5feBcWCmjjfLySNg1M8CND8JB8BGPMEBH33knWKDZx9mLhhCxtAEEww9YPV3MbhC1xRWqrTxpnAl3XJCLrg+cg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "yeFtSj+p+WPRKbiCOcQV+K7/vnOMqb+s47Se0MDmV1IFgqlaq+BCEDOWXvdH+kBdMQ8QYVId7wxpNcG8pLqpEw==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "gRW4JXlJVJtX3Eo6zk7yxq86Wjf//zGIYxQl5eJvmqBbCDOD1oX50OI8PQSdsQ5sxf41x7kq03AFFIKpOOxs+A==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "A42oHaot6OVuh6cDbzAsq0ealLMpnK2HsYbrHRJnKSiOmJQp+k6hIU4ELRbbpLvNLh9e3jmQ3NyN81v+ISmOKA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "L1Gy6DnLaZPhJphWIn/Q/bYBQT2BubaxIwtMZ/KAq9Wjdjy6KNJug0RPIu3tJ89gO/M+XxrwDPQwz2/OmGjgDQ==");
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
