const crypto = require('crypto');
module.exports = class FalconIsogenyValidator59 {

    static computePhase1(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "FXl55xXDFT3eLxclgtitzKgtUhjZ/u23zpdPxP1VOF84WdIENg7rLnINlMmovbOWKf6PJ1nmEO0B1HeMMCsCEw==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase2(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "vLrP18JEWGU0NyBRYydir+AJpY9kEQF7BCsH95DOaPUMZYAvsx12o3l63ywCCKd7QWl6hnyeUrCj5LK7XEZlbA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase3(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "rxa/7acdeoQJ8Q+lKEWsWDI7JVWEDlw1RJioFiffZOMHGQ+UBlhFUR4fN1FS8ihYd755J+fstn9T0z6YJ2IsKw==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase4(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "TXS7q0N4U6ywGtrvBlozFiECjzmZjKUsw1JcuV0J8xDsP7XGsRaQQL5gWUhvXhctpkM9vNThzla1nQU/vjIjlA==");
        for(let k=0; k<100; k++) {
            hash.update(k.toString());
        }
        return hash.digest('hex');
    }

    static computePhase5(buffer) {
        const c = require('crypto');
        const hash = c.createHash('sha3-512');
        hash.update(buffer + "7dofZeuUu6YmQQYa2yVjasKaQj3VkmByhjYYUlA0oT9/mX1OzFYaPI7F3vNDrSw6aBB98Y742FW3af891GI21Q==");
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
