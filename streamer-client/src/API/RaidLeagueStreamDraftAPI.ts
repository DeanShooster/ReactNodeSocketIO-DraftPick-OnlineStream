import { server } from "../constants/API";

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
 * Generic error handler. Defined by server error configuration of { Message , status } for errors.
 * @param {Object: Error/Data} ob 
 * @returns Error object {error , status} or the data object.
*/
export async function errorHandler(ob : any){
    if(ob.Message) return {error: ob.Message , status: ob.status };
    return ob;
}