const server = 'http://localhost:8080';

/**
 * Sends admin credentials to the server and gets a token.
 * @param password Admin password
 * @returns token or error.
 */
export async function adminLogin(password : string){
    const result = await fetch(`${server}/admin-login`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({password})
    });
    return await errorHandler(await result.json());
}

/**
 * Checks if a admin user is already logged in.
 * @param {Encrypted String Token} token
 * @returns 
 */
export async function isAdminLogged(token: string){
    const result = await fetch(`${server}/admin-login`,{
        method: 'GET',
        headers: {token}
    });
    return await errorHandler(await result.json());
}

/**
 * Returns the current Draft Settings.
 * @returns Settings object or Error.
 */
export async function getSettings(){
    const result = await fetch(`${server}/settings`,{ method: 'GET'});
    return await errorHandler(await result.json());
}

/**
 * Sends an update to the pick and ban server object.
 * @param {Encrypted String Token} token
 * @param pickBan Pick Ban Object {pick,ban}.
 * @returns The updated object or error.
 */
export async function updatePickBan(token: string,pickBan: {pick: number , ban: number}){
    const result = await fetch(`${server}/update/pick-ban`,{
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' , token},
        body: JSON.stringify({pickBan})
    });
    return await errorHandler(await result.json());
}

/**
 * Sends an addition for a new team.
 * @param {Encrypted String Token} token
 * @param team Team Object {name,code}
 * @returns The new team or error,
 */
export async function addNewTeam(token: string,team: {name: string , code: string}){
    const result = await fetch(`${server}/update/new-team`,{
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' , token},
        body: JSON.stringify({team})
    });
    return await errorHandler(await result.json());
}

/**
 * Sends an edition for a team.
 * @param {Encrypted String Token} token
 * @param team Team Object {name, newName,code}
 * @returns Team or error.
 */
export async function editExistingTeam(token: string,teamEdition: {name: string, newName: string , newCode: string}){
    const result = await fetch(`${server}/update/edit-team`,{
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' , token},
        body: JSON.stringify({teamEdition})
    });
    return await errorHandler(await result.json());
}

/**
 * Sends a reset match draft request.
 * @param {Encrypted String Token} token
 * @returns Rest match object or error.
 */
export async function resetMatch(token: string){
    const result = await fetch(`${server}/update/reset`,{
        method: 'PATCH',
        headers: {token},
    });
    return await errorHandler(await result.json());
}

/**
 * Sends a request for setting up the next teams object draft match.
 * @param {Encrypted String Token} token
 * @param teams Teams object {team1,team2}
 * @returns Teams object or error.
 */
export async function setNextMatch(token: string, teams: {team1: string | null, team2: string | null}){
    const result = await fetch(`${server}/update/next-match`,{
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' , token},
        body: JSON.stringify(teams)
    });
    return await errorHandler(await result.json());
}

/**
 * Sends an update request for a match winner and loser.
 * @param {Encrypted String Token} token 
 * @param winner Winner object name.
 * @returns Match object or error
 */
export async function setMatchWinner(token: string, winner: {name: string}){
    const result = await fetch(`${server}/update/winner`,{
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' , token},
        body: JSON.stringify(winner)
    });
    return await errorHandler(await result.json());
}

/**
 * Generic error handler. Defined by server error configuration of { Message , Status }.
 * @param {Object: Error/Data } ob 
 * @returns Error oject { error , status } or the data object.
 */
async function errorHandler(ob : any){
    if(ob.Message) return {error: ob.Message , status: ob.status};
    return ob;
}