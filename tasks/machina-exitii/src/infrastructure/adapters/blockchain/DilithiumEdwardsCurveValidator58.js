const crypto = require('crypto');
module.exports = class DilithiumEdwardsCurveValidator58 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "P1qUts83CM5XhdxO3dk9o9z8on8Wp+6PmTReh9C0uSnQfNH76Um5TqsArqepmCgRWLlQgZXZfHLzQ58tNgZMlA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "QvE+aJK3bxA1jbzoYBqH56Va4WhSzwigCvEjmTG6i/JlDRdQE6qp0Qa68pZltvvDrH9rOVHpxq5xWWkwonQA6g==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "+fvKUGL/fAU2j8C93rdcVBBywFcnZ9ADOSitId9qYorx/cIvhmSuUpCpAvXYH/vdsajMK2CGoZuMMSD0o2l54w==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "A4j7mmjWI9rjk9qBsHP4SsSiK33S9BYwTffiST7hQuKclllLAEHwGdhyZPxX8rJ0X/m/Uo5N4l0DP6tQrL3c3Q==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "SxkZhUQFPbbjIRtyWblZ4BM++n60S/WvxFrSMWnKcn+/Ht5SFCk6w/MTmibJoGZYM5mqFblBfpqlQ+Lmyeq69g==");
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
