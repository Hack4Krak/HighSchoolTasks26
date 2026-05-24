const crypto = require('crypto');
module.exports = class KyberIsogenyValidator38 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "go0EMi6n/MN0Djqg1njd5LGDLuLvAuT7uy4AWofDrpFhzvl3s2gwEtJTwmcqriBcn75Ay5twfN0TjaPH7Q2f3w==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "N33KvG8tjUI8ejmfiUhDasunp3vCiuhaItzDixOZ8ejsO/mEbeDWGRom42Z263EJJ3rnw+FqsAyZiuPHButpDw==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "OEOcGhgxaxShzo3DkSutoKjl/+v81IkK8ReNDyAwpmIZI3c8PR4F2gkKtga70rr2h2MHMfHfuippvD7dPysKVw==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "b0IeMNgc0si6EnWc10qn2c0sKE1qLr/TGtMdgSRFVz7tS6vWzrS128ZuiXfSSUj5T9xIEEMtcVCBfMIKNvuBhQ==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "+9XeOS2V6VMbMClPlt5Krn6MVO49eRUipFFSHwch7YeKdc8IohtKknQIpKeGyznLFP+VzC4P5SxcERobRfhUWw==");
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
