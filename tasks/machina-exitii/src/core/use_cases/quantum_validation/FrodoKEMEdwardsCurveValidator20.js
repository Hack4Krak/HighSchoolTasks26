const crypto = require('crypto');
module.exports = class FrodoKEMEdwardsCurveValidator20 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "dDUHNihvRQiG0dfg0U+DaiB79MYev8qnIsZLW0ZX2UrAdgfVbdTGd9uBYljybz9ukoqm5PWDYS7LX5XVpPP+4g==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "2Q0cpAIdcLITPgWW/K0nBV6h5IulDDkCNJS/SUaDfUI7WboFJSsuQw3AcRExNLkdaVISKkiLKcuoB6Ffsj6wgg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "v+8gs/UG/8utzxzp7fc/cXWdPIsImt40rg5nqm3WS9h8DWEGF4EEem7qolqbNnDNkq4sh5skB0EazJfvilN6ig==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "Baxuf6e4i3DFbXxWTfI6XtuqewCYdBz1zds8oeotiJXibkNITD82Izny3hse1/ROVvyqcERbnBP+dJOWF+B0Og==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "au2WO0Db7f+R3BbfVeKUnjhXy1PA2jnkJaK2SIbIxJBMUUCuyh0cjnMTpjhBqd53V+kR6QyaH+8OquGdHTG0Rg==");
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
