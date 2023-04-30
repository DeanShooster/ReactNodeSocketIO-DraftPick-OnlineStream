import { server } from "../constants/API";

/**
 * Sends credentials code to the server and gets a token.
 * @param {Credentials String Code} credentials 
 * @returns token or error.
 */
export async function authenticator(credentials){
    const result = await fetch(`${server}/auth`,{
        method: 'POST',
        headers:  { 'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
    });
    return await errorHandler(await result.json());
}

/**
 * Sends the local storage token in order to validate in order to avoid a login.
 * @param {Encrypted String Token} token 
 * @returns Team name or error.
 */
export async function authValidation(token){
    const result = await fetch(`${server}/validation`,{
        method: 'GET',
        headers: {token}
    });
    return await errorHandler(await result.json());
}

/**
 * Sends a ready check signal to the server.
 * @param {Encrypted String Token} token 
 * @returns Team name or error.
 */
export async function readyCheck(token){
    const result = await fetch(`${server}/ready-check`,{
        method: 'PATCH',
        headers: {token}
    });
    return await errorHandler(await result.json());
}

/**
 * Gets the numerous pick and ban limitations.
 * @returns Object with numerous pick and ban fields or error.
 */
export async function getPickNBanLimit(){
    const result = await fetch(`${server}/pick-and-ban-limit`,{
        method: 'GET'
    });
    return await errorHandler(await result.json());
}

/**
 * Updates the team pick or ban in the server.
 * @param {Encrypted String Token} token 
 * @param {Picked or Banned Spec String} specName 
 * @returns Team name or error.
 */
export async function pickNBanHandler(token,spec){
    const result = await fetch(`${server}/pick-and-ban`,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json' , token},
        body: JSON.stringify(spec)
    });
    return await errorHandler(await result.json());
}

/**
 * Updates the team squad composition in the server.
 * @param {Encrypted String Token} token 
 * @param {Spec Squad Array} squad 
 * @returns Team name or error.
 */
export async function squadHandler(token,squad){
    const result = await fetch(`${server}/squad`,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json' , token},
        body: JSON.stringify({squad})
    });
    return await errorHandler(await result.json());
}

/**
 * Sends the submission log to the server.
 * @param {Encrypted String Token} token 
 * @param {Squad Log Submission URL} log 
 * @returns Team name or error.
 */
export async function logSubmission(token,log){
    const result = await fetch(`${server}/log`,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json' , token},
        body: JSON.stringify({log})
    });
    return await errorHandler(await result.json());
}

/**
 * Generic error handler. Defined by server error configuration of { Message , status } for errors.
 * @param {Object: Error/Data} ob 
 * @returns Error object {error , status} or the data object.
*/
export async function errorHandler(ob){
    if(ob.Message) return {error: ob.Message , status: ob.status };
    return ob;
}