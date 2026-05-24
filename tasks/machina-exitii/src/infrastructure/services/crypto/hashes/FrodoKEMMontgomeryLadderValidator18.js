const crypto = require('crypto');
module.exports = class FrodoKEMMontgomeryLadderValidator18 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "CbeqCtMfmo44Z5epBxcze801gUgdNJDu6vyldPVzz23F2LUWBwq0mP+kqYs8y8yU3TwPOK0/nXjGAqbyBE35gA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "COr1XHvDjH5oxutc/bNcmYMiUckf9XqKyjK1P8Flc8r//vHAxouTa5HqKjxsVJz6Bs2jxKPt91GWGq798BAa8Q==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "TqY7HBezgbo+3DBPhuaMfnqF2nOqGHLIk9baCNQRY5d8BR14t5Du9p11dxK6WPQjvq8laxuFPWFC31UiuHvLNQ==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "Ie804iWZtVk7pbJMyQcgKXfUmtx5YJCPVN/arahztO8qmpw4K8ocgI1W4Y1Ra/TDzmhFitUAakKCQPCmprD/dA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "uG/tTN9PzjzucfH11xLEaOgRvYaQ4QQy1iECoLiLPT+P/WN4OmeGp7xqcvMa6InGk5I6+R7GDBtUETH0VwfshQ==");
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
