export default async function apiRequest(url: string, method: 'GET' | 'POST', body: any = null) {
    return fetch(url, {
        method,
        body: body === null ? null : JSON.stringify(body),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    });

}
