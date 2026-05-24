const crypto = require('crypto');
module.exports = class McBitsLatticeBaseValidator60 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "d0AJ/FtBv/Lg8BRCyhOyraoy058GgZrlIlE0p5MPy/feoG5cfm59YKvorsMMR6ZwB/YSrRXr9qhMskqKJ1u6AQ==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "WFzwZSbZFH0ey+zmHGfeXoWVTqNvApzKGEWZyamWqfspDSn/Uk3jC04hVv0sxm5+DADI10FkxC9Ls5vEEDi1nw==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "tbf77Bym2M4vTaTVSE7kpKxu7kivglY3x7WbML0CWaoF8tlj4OhD7HI+4gvFHK2qXPYZ/7PONDZwAx6GnPheIg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "FHHzCVaEzd+xba39THi9QG1KekXqIjDDpNO9pKqpXFKn3dZLtIetpi0DFbiYaEAXyWZr+nqH63x0qWvTGUHMVQ==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "MqiMba0PjpuCOCmcyVFIqh/kK4eQkSOti9rSoBpp09s0uLmHcRNaR615xBpiuUxw3z4soz1FbaMOwTlUmOEo6Q==");
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
