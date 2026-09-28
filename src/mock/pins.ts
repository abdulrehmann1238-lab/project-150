export interface PinValidationResult {
  status: 'valid' | 'invalid' | 'already_redeemed' | 'insufficient' | 'network_error'
  amount?: number
  message?: string
  currency?: string
}

export interface TestPinInfo {
  pin: string
  formatted: string
  labelEn: string
  labelAr: string
  amount?: number
  expectedResult: string
}

export const TEST_PINS: TestPinInfo[] = [
  {
    pin: 'A7K2M9Q4X1P8L3ZD',
    formatted: 'A7K2-M9Q4-X1P8-L3ZD',
    labelEn: 'Valid RG 10 (Standard 30 Days)',
    labelAr: 'صالح بقيمة 10 RG (اشتراك 30 يوماً)',
    amount: 10,
    expectedResult: 'valid',
  },
  {
    pin: 'B3N8V5C2R6T1Y4HW',
    formatted: 'B3N8-V5C2-R6T1-Y4HW',
    labelEn: 'Valid RG 20 (Overpay credit)',
    labelAr: 'صالح بقيمة 20 RG (رصيد إضافي)',
    amount: 20,
    expectedResult: 'valid',
  },
  {
    pin: 'C1X1X1X1X1X1X1X1',
    formatted: 'C1X1-X1X1-X1X1-X1X1',
    labelEn: 'Already Redeemed Code',
    labelAr: 'رمز مستخدم مسبقاً',
    expectedResult: 'already_redeemed',
  },
  {
    pin: 'D5D5D5D5D5D5D5D5',
    formatted: 'D5D5-D5D5-D5D5-D5D5',
    labelEn: 'Insufficient Value (RG 5.00)',
    labelAr: 'قيمة غير كافية (5.00 RG)',
    amount: 5,
    expectedResult: 'insufficient',
  },
  {
    pin: 'E0E0E0E0E0E0E0E0',
    formatted: 'E0E0-E0E0-E0E0-E0E0',
    labelEn: 'Network Error on 1st Check (Retry passes)',
    labelAr: 'خطأ شبكة في الفحص الأول (إعادة المحاولة تنجح)',
    amount: 10,
    expectedResult: 'network_error',
  },
]

// Track retry attempt for the synthetic network error pin
let networkErrorRetryCount = 0

export function maskPin(raw: string): string {
  const clean = raw.replace(/[^A-Za-z0-9]/g, '').toUpperCase()
  if (clean.length < 8) return '••••••••••••••••'
  return `${clean.slice(0, 4)}••••••••••${clean.slice(-2)}`
}

export function evaluatePin(pinRaw: string): PinValidationResult {
  const clean = pinRaw.replace(/[^A-Za-z0-9]/g, '').toUpperCase()

  if (clean.length !== 16) {
    return { status: 'invalid', message: 'PIN must be exactly 16 characters' }
  }

  if (clean === 'A7K2M9Q4X1P8L3ZD') {
    return { status: 'valid', amount: 10, currency: 'RG' }
  }

  if (clean === 'B3N8V5C2R6T1Y4HW') {
    return { status: 'valid', amount: 20, currency: 'RG' }
  }

  if (clean === 'C1X1X1X1X1X1X1X1') {
    return { status: 'already_redeemed', message: 'This PIN has already been used.' }
  }

  if (clean === 'D5D5D5D5D5D5D5D5') {
    return { status: 'insufficient', amount: 5, currency: 'RG', message: 'Insufficient value' }
  }

  if (clean === 'E0E0E0E0E0E0E0E0') {
    if (networkErrorRetryCount === 0) {
      networkErrorRetryCount++
      return { status: 'network_error', message: 'Connection to gateway timed out' }
    } else {
      networkErrorRetryCount = 0
      return { status: 'valid', amount: 10, currency: 'RG' }
    }
  }

  // Any other random PIN is invalid
  return { status: 'invalid', message: 'Invalid PIN checksum or unregistered code' }
}
