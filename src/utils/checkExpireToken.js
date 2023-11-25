export default function tokenValid(token = {}) {
    const now = Date.now() / 1000;
    const expiry = token?.exp;
    return now < expiry;
}
