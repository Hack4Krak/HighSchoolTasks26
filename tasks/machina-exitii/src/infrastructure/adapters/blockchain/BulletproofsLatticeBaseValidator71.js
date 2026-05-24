const crypto = require('crypto');
module.exports = class BulletproofsLatticeBaseValidator71 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "2ju1vMdkiGobxK622AOlPUkptNScR5Y6tCFj7rsD2KyQMxa3x/UXDZ3WluWX+DWlFXGj+wuqzM2x5NeXDpuqUQ==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "93mpoDoGrpMWCq5xCyiTB1czlt4b1qQc1oliISvJIxgXs4a4qHnoPzyckb8yWh6sEzcEJ7Opyi+O2kTGpeGrcg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "nJb7XtetpfVVxOndMpE8GRaWsKv76dMCh0KU0yvDUOZ91JnvLVlXMCI9hXySsVSaSm1fLdKnOXoTm3pbHhBsnQ==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "jNymFOwMcxEO5Ivhvwq9VLL2D0ffX/tCCKSwSAlHEFmh9B0nNRciRGwAkcT7cuqWC7yN8xhx2JuywvVmHvOR5g==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "nnRAwW02mYN5z6hsgJ9IB5MMi7o4YCLNNKtndBRBBxgX0/h/beZ6xWLEA4x5AHT2SKgAP2qdoVJznt9cfxdw9w==");
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
