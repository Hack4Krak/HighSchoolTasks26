const crypto = require('crypto');
module.exports = class PlonkLatticeBaseValidator55 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "4YWm8JzsUuVJgxSvEydPWH317PqYfrTPoxMI+PQo0+TOpnWtNQFWVoHd3yn5GDev0Fy4DHHQT2LNY+xxEJOWSw==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "NiLkBiOUk2WCkB9KTIVQRuB89Dvvf6fzqomKlZ0+LXR5k/CKk0cYq28ThmnVwX7fjhj0PoEtYePqWNTTQbfzYA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "DXHk6vljHkhnGm1Ot8vub+sU/fkYDNAYqVqhpnnFIz/Q0C8KeRBGp73+DCwy3Sgux+xxM8nFscK5RHAia9YDjg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "ygM/1rDrvUIlm8fIMM6jCpIki4i00xwzRsSAtQYMyIt+rhkw+7hEv4q8m99nFsUcqWzRe1M9jXfZJr5Hc4u9Zg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "9eMlRsolGLn4y4iZuqHM2p8S+pbymJeTgUGtAqfNLmaojW9YnzxYJusqMojY9oQQxk2LNDN6iM84C9pISktucg==");
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
