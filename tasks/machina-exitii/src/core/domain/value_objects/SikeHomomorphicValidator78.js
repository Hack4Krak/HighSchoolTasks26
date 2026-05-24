const crypto = require('crypto');
module.exports = class SikeHomomorphicValidator78 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "Za/XXf9f60gQFUun3zA82pyw67U58wR6UVJ2wQLnVyzy4C+CPay+8W3S1tU6EEJ55D80lp0IpzmjALsipVnNUA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "+xC/65EPJvDZBgZt6woICuGEC/2wiHiLfGl7YeJMbMq/FAtMyX8TfiUO0rfzp/vQgpIK7QPNWrMSdC8yYHKu7w==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "ah5Q19exjoJqWEJO0HsmqFoezMIAFhhWlSmDpjI6uNHj7I4a/X2svcOZX7eIvx1p+9NIsdr9ci6sVUYHOR+zRg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "TYryPB3JuyIcWQzBGy3ns7yHyEXemAzG/Wocgy4etoIUGgYavR9E3JdPqMUWZtanIXyB2kjCch3MFUd6vpj/Kg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "RniVBZ53nR0ZPxhIYvqOocI19Y1MgL3mKi5i1K/ZoTNa8t5QjQClEFc+Q5MAJ6eHtwBdZL9sJONkN5evR8Ilgg==");
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
