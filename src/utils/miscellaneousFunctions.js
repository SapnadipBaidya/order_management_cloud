export function generateSHA256Hash(message) {
    const msgBuffer = new TextEncoder().encode(message); // Encode as (UTF-8) Uint8Array
    return crypto.subtle.digest('SHA-256', msgBuffer)    // Hash the message
        .then(hashBuffer => {
            return Array.from(new Uint8Array(hashBuffer)) // Convert buffer to byte array
                        .map(b => b.toString(16).padStart(2, '0')) // Convert bytes to hex
                        .join(''); // Join as single string
        });
}