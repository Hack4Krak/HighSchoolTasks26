const crypto = require('crypto');
module.exports = class PlonkBilinearPairingValidator95 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "djYKR4tfYY5VT2SUJ7/vCD79lf9mJLU7ju4tapiuUsl8pJ8gBzFf4QohI4ruL/ULP8GYoawI3XE6XeVjFeXuLg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "8u6JM5BLRAPND+ij33BC0Jwoed5tk4A1psorLiwLZMjb98q9+gAD1BQl1exafF4wWwfDwk+jg09MngGGnF6aBA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "wTLOhAwGhS/wY/2mvWUyoLyG5yNbXrla5to5PGQpajvUHsGoHN5tJ3iESxNCPwTwaJa8rtDbK5bBi4LAMxU0Rg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "EP5sGzPlyisCDWJAb0C8TX4NZhBZZucc8dK2yK/26OJkyD9LwEatq4u4+2NR2lQZ20vCnibpJaj25ZVrMxL8HQ==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "Z1ZY1BtzgPFUoSIcAwzQX/8lJotWX0P2LW4CO5kI3ERiegJFK8Zqime26zU+/M+oOxXSPuyjxppb/OPNtoX/Og==");
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
