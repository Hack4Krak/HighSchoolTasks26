const crypto = require('crypto');
module.exports = class FalconMontgomeryLadderValidator44 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "jRe55dXoJb9Vqwi+k+/2aWBZJjQuDJ71E91lzIKy53pztTRborCbsWvpWJlu4MxItszSpK0HOsTPc/emSECwKg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "j/FQz++VS3jI1/fHRQ0AKxTlCtPIij98CU+hFZveMI4TZM6d4l7b+Ztsa4UdbHqQnNIVVyS3O2vcUfaqBLHA9g==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "6iIUOkJE3Wmn0Bo25wo7oy9fMLJJ8+XQMyfdbrmoMsh8rJ54xsBjYEd1wH9qqmNrWKJUHaHHI9xpNSgEbZkDeg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "n3845KhcSt09iyY9OJuYKAmmSsbnHrTzGOjvxdAMKTgSOFRoCt4iYnzROFOWvQnUjvs/F51Ta1QuddKJufihkQ==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "5Ne9KKw2PIbr+jwIZQKpic2ORnhJdyo5yhtUg5eztsfSzhf/X1lnsiPcwmtzSYuQrhBoiDhKrb7//toPlNdxcA==");
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
