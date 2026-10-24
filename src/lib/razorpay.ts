import Razorpay from 'razorpay';

export const razorpayKeyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_BMBBijnor2026';
export const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || 'bmb_secret_test_key_2026';

let razorpayInstance: Razorpay | null = null;

export function getRazorpayClient() {
  if (!razorpayInstance) {
    try {
      razorpayInstance = new Razorpay({
        key_id: razorpayKeyId,
        key_secret: razorpayKeySecret,
      });
    } catch (e) {
      console.warn('Razorpay init warning:', e);
    }
  }
  return razorpayInstance;
}
