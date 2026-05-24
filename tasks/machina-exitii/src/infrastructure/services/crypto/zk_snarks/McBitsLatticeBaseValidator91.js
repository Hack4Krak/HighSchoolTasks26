const crypto = require('crypto');
module.exports = class McBitsLatticeBaseValidator91 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "tPaQQ5si4hBM/lggdOtSIqGxt1fB/k4rxDIpFKsbfaym4bRzlZDyPEJlqIWAfyWTFeM4bKUsH9i3qbwvVDb1Qw==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "bHmM5MQ/R+qtt6eKZ1qbo5FKyZGT9abQZwusILpwPEu+6wSN6JU25Zt0In/dDCShr3gNKjaiWgiRK7Uav+Ql2g==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "jTcBGNLqMwKX5eGOFad2KjYuqT2y7BlQnmYv4/ul/mCjzjdAwRLPebE2q59V5LNZjgrCLHcxaf/C+vN8GIZz8A==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "I03J1t1tH5Zg/yP6wZFT8+E4kcIymRdXTtWAXMSr1gkM2Wg6VflWMj9gqGIXyRBIaiKx7tujTQ0FMUh2CCiYXA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "YR7bshhNQP5PqeIBl7X37IRbVqNAjubaYiuPwyvaf9jP72bNVq6nPP0lbCbGgoB9CMLkIo6qO6LytDhAp4tqCg==");
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
