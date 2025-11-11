/**
 * Check if a password has been compromised in data breaches using the Pwned Passwords API
 * Uses k-anonymity to protect password privacy - only sends first 5 characters of SHA-1 hash
 * @param password The password to check
 * @returns Object with isCompromised boolean and optional count of breaches
 */
export async function checkPasswordPwned(password: string): Promise<{
  isCompromised: boolean;
  breachCount?: number;
  error?: string;
}> {
  try {
    // Hash the password using SHA-1
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

    // Split hash into prefix (first 5 chars) and suffix
    const prefix = hashHex.substring(0, 5);
    const suffix = hashHex.substring(5);

    // Query HIBP API with k-anonymity (only send first 5 chars)
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      method: 'GET',
      headers: {
        'Add-Padding': 'true', // Extra security measure
      }
    });

    if (!response.ok) {
      throw new Error('Failed to check password');
    }

    const text = await response.text();
    const hashes = text.split('\n');

    // Check if our password's suffix appears in the results
    for (const line of hashes) {
      const [hashSuffix, count] = line.split(':');
      if (hashSuffix.trim() === suffix) {
        return {
          isCompromised: true,
          breachCount: parseInt(count.trim(), 10)
        };
      }
    }

    return { isCompromised: false };
  } catch (error) {
    console.error('Error checking password against HIBP:', error);
    return {
      isCompromised: false,
      error: 'Unable to verify password security. Proceeding with caution.'
    };
  }
}
