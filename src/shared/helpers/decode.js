export function decode(jwt) {
    const [headerB64, payloadB64] = jwt.split('.');
    const headerStr = atob(headerB64);
    const payloadStr = atob(payloadB64);
    return {
        header: JSON.parse(headerStr),
        payload: JSON.parse(payloadStr)
    };
}