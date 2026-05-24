const crypto = require('crypto');
module.exports = class PlonkMontgomeryLadderValidator36 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "ll9axHpjzmIl7/4/L4Qw9kDHDhR6iGDRl5N0JI877z2ozhR01xu3zNcc7B6/OwquwH/YtcvbbEJ5biwPUFbG+w==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "iNunfR/ONNogHnpLetgA5fp12gNekn8hTlLgfKwypmeH686LkZp6jfTPwn7y+yZSs9ZECGYwPn/+I8UIzSwDRw==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "PKRJTNXUpByP5R/nE6X0qcPKSc/SMMnBMhlJJ3tXJmnRwV2BQ/6d05tGasy1XKYG9AW7CsPh2zpgUWPZrYojSA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "E5zCUm6NdjofPvI2vBdDHECv3wP3bZ9KmwLYFHXMRtTKWc+ZXXUu6NTFN3zwOm2OD02HgZ2vKq+GQJrxtRocrw==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "/qzl8vtbrAquERG49JUFs8ZWzrcZGppv3IEh4so/6pCSVzEpSSyUmW9G5/PF54/7ab6ixkmu1yFpx5fYVWpttw==");
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
