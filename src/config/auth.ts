export const AUTH_CONFIG = {
  password: {
    hashLength: 64,
    encoding: "hex",
    saltLength: 16,
  },

  signup: {
    maxAttempts: 5,
    windowMinutes: 15,
  },

  emailVerification: {
    cookieMaxAgeMinutes: 60,
    codeExpiryMinutes: 15,
    maxAttempts: 5,
    windowMinutes: 15,
    resend: {
      maxAttempts: 1,
      windowMinutes: 3,
    },
  },

  login: {
    maxAttempts: 5,
    windowMinutes: 15,
  },

  forgotPassword: {
    maxAttempts: 5,
    windowMinutes: 15,
    tokenExpiryMinutes: 15,
  },

  resetPassword: {
    maxAttempts: 3,
    windowMinutes: 15,
  },
} as const;
