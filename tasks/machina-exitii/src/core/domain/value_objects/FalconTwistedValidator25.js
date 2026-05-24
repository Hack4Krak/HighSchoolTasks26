const crypto = require('crypto');
module.exports = class FalconTwistedValidator25 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "fIVTubu+7ffie/JtZJzJ8Pw177hGOQMxvQ0OjE3YlJm3Oy2uPCi9UNZk2bNrLnUplDNqgAhAjpvF+MFoh7uAXw==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "s1HFWkHEPNgdF+8WW1R+SwbraJ0oaltmKlhRVeZzUkiv3A7BR+x5wUaqCipvN0xUQn3CBofro23SSJdhFaS0oA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "ug2cSO4GhQQ2n8710CJoDhcZWzGqSuvHJuRvv8OG4pwpEI270AfjTN+ToN6370qizbcQsQXfhmUBKyaUf9B07g==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "LKtlOYKJIe2mxW0NA/I1WxodCtkez1MAcIOHpZ8vvKfAQijVXbN/BZPFzDPIjYn5iNZ4z+Po6hAT4KuV+3nB4A==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "2fBcF/NSAPNHc+RhWUg5RUFgx/RK+H3nqoQ6dLl+m/+hCNhOGNdq2C31XH3I7Yf+jPBlgPCjwuZQpxBDRs32eA==");
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
