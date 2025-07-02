
async function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function makeRequest<T>(url: string, init?: RequestInit, body?: T)
{
    await sleep(200);
    if(init === undefined)
    {
        init = {}
    }
    if(body !== undefined)
    {
        return fetch(`http://localhost:5000/${url}`, {
            ...init,
            body: JSON.stringify(body) 
        });
    }
    return fetch(`http://localhost:5000/${url}`, init)
}