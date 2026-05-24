const crypto = require('crypto');
module.exports = class McBitsHomomorphicValidator35 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "GpXUTvZo41pJJqeIklAaeZDU0IhhzfDV3vAHep9pNRKQKoHQc42lBJS3csZtChxmmyfy2xeZxf57KTb7Un94jw==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "vimcZllhVsfETpps+8mhvyX9M83ESPCDgwALfpfja25mpVXNxoV17dnJrMX2nOxpvF2zgDqDXy7/pZfwmSvWWg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "GXYuQbCkhpFoLjUMJonh64XEMrA8M2qPEdvQ3H2vkKk0LgC/+U81a3LcG1du92uWXjNVEazYC5EzHLEuiSbHzA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "tSevixujUNoXy6bolGEDmDeQMB9SS8K+PRzbLqamQea2iXnQYx+OTwO+0kvBCYYdUh81jXqJijKzviWa1MUTUg==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "85SK4xhjtH4jXdEaBHz+LDxCwlaXOZQYhwXtG9VeGeW/mkoweImajD/CiPXneCoFHPnlb/uZwmjoBrW6ngxBgQ==");
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
