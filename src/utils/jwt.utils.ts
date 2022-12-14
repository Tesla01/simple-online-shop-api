import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

export function signJwt(
    object: Object,
    options?: jwt.SignOptions | undefined) {
    console.info(privateKey);
    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: 'RS256'
    });
}

function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded: decoded
        }
    } catch (e: any) {
        return {
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: null
        }
    }
}