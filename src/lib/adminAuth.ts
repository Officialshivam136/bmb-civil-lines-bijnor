// Cryptographically secure Admin Session Token handling
// Works across Edge Runtime (Next.js middleware) and Node.js backend

const SECRET_KEY =
  process.env.ADMIN_SESSION_SECRET ||
  process.env.NEXTAUTH_SECRET ||
  'bmb_civil_lines_secure_admin_hmac_secret_2026';

function toBase64Url(str: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'utf-8').toString('base64url');
  }
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function fromBase64Url(b64: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(b64, 'base64url').toString('utf-8');
  }
  let clean = b64.replace(/-/g, '+').replace(/_/g, '/');
  while (clean.length % 4 !== 0) {
    clean += '=';
  }
  return decodeURIComponent(escape(atob(clean)));
}

async function getCryptoKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(SECRET_KEY),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

function bufferToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let hex = '';
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, '0');
  }
  return hex;
}

function hexToUint8Array(hex: string): Uint8Array {
  const pairs = hex.match(/.{1,2}/g) || [];
  return new Uint8Array(pairs.map((byte) => parseInt(byte, 16)));
}

export interface AdminSessionPayload {
  adminId: string;
  role: string;
  exp: number;
}

/**
 * Creates a tamper-proof cryptographically signed HMAC token for the admin session
 */
export async function createAdminToken(
  adminId: string,
  role = 'ADMIN'
): Promise<string> {
  const payload: AdminSessionPayload = {
    adminId,
    role,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days expiration
  };

  const payloadStr = toBase64Url(JSON.stringify(payload));
  const key = await getCryptoKey();
  const enc = new TextEncoder();
  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    enc.encode(payloadStr)
  );
  const signatureHex = bufferToHex(signatureBuffer);

  return `${payloadStr}.${signatureHex}`;
}

/**
 * Verifies the admin token's cryptographic signature and expiration
 */
export async function verifyAdminToken(
  token?: string | null
): Promise<{ valid: boolean; adminId?: string; role?: string }> {
  if (!token || typeof token !== 'string') return { valid: false };

  const parts = token.split('.');
  if (parts.length !== 2) return { valid: false };

  const [payloadStr, signatureHex] = parts;

  try {
    const key = await getCryptoKey();
    const enc = new TextEncoder();
    const signatureBytes = hexToUint8Array(signatureHex);

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes as any,
      enc.encode(payloadStr)
    );

    if (!isValid) {
      return { valid: false };
    }

    const payload: AdminSessionPayload = JSON.parse(fromBase64Url(payloadStr));

    if (!payload.exp || payload.exp < Date.now()) {
      return { valid: false };
    }

    return {
      valid: true,
      adminId: payload.adminId,
      role: payload.role
    };
  } catch (err) {
    return { valid: false };
  }
}
