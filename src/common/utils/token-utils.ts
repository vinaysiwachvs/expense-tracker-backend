import jwt from 'jsonwebtoken';
import CommonVariables from '../common-variables';

const secretToken = CommonVariables.getAccessTokenSecret();

export const generateToken = async (_id: string, expiresInMins?: number): Promise<string> => {
	const expiresInMinsString = expiresInMins ? `${expiresInMins}m` : '24h';
	const token = jwt.sign({ _id }, secretToken, { expiresIn: expiresInMinsString });
	return token;
};

export const verifyToken = async (token: string): Promise<any> => {
	const decoded = jwt.verify(token, secretToken);
	return decoded;
};
