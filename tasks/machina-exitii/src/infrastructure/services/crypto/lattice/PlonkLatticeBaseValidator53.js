const crypto = require('crypto');
module.exports = class PlonkLatticeBaseValidator53 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "CI9uVb+jihZ9HCRGuYsv4jnbPHKgjOVil/bZHM16WbO7LZTEVX0QcASfGQTEQ3zf5+pVXcEL+ewfwrct30OsmQ==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "ilKyyn+b969fGMI3sifnh7p80NqanddGg/848TfTa6ZedPpjxNcK214wUu7AUyUbruxUI82F/swVB7JfDOtFLQ==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "I9VBTeU4qYtHjvjIxnXD6uR98WJWqPm7Ry4wqc94ilLCdK2d5Fu9rzU/xKkqg670lg+E7DE3SpdPIGpf7g5iag==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "h9bm6eEGMUr4ZstwnbHpeNgo7vXzwx73wkgha952v/dHx+SHonzPzcut5SRxnpcSgSyyyiEn2TLgYDtzKk3l7Q==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "NZ1GAiri60HMLts3kR8/o5KH8ZLBOyKxp/CdpzqRrpnyr/1jDcSThkv6hmRz08tQF2EXmwYKCkg8SVyVajn7QA==");
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
