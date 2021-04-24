import { hash, compare, genSalt } from "bcryptjs";

/**
 * 
 * @param passwod 
 */
export const encryptPassword = async (passwod: string): Promise<string> => {
    const salt: string = await genSalt(10);
    return await hash(passwod, salt);
}

/**
 * 
 * @param hash 
 * @param password 
 */
export const comparePassword = async (hash: string, password: string): Promise<boolean> => 
    await compare(password, hash);