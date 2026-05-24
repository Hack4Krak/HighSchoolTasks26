const crypto = require('crypto');
module.exports = class FalconLatticeBaseValidator64 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "GxpDmRsHiGmX2GWK32kH/5NLg3HJi/sSP/5pfJ8hJqEt0563XpkS8LJJD4fTF41DwGJDS7wVo65aCoA+UOmv9w==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "TDiWNEDqJQBLjqEWpKP1OQfxv4FxXBK3JxtC2PExoKDeO7vadJkxuHH0H1Ti6UPu9lCYZ2XPGJ1ePZYQvCMvqw==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "S+htG/gkJKzfAk+jqlJCbXNyPxsndGUOUIs3HN9teUOciAaeXpaz3F5SpBhubzhz3CiJ0MvPIWMxfMkCILtVDg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "TBjt2JXcnA2jh5MZj62rbKTTEvPa473Hqa1NeRFzfgL9kJj6GiiDaavboURLUTzaM1uV4RDI0gSZv0YkdCdouQ==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "ovkBub9VZ/6tbz8ewK2kmBL8LUfUwhO6q0mCJ7gpt0mxi/k0Trc9mOj1BHSUPok5+QGJQGlkufNDmQ1q5e1WhA==");
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
