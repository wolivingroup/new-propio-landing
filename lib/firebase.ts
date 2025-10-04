export const environment = {
  production: process.env.NODE_ENV === 'production',
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain:
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
      'propio-bo.firebaseapp.com',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'propio-bo',
    storageBucket:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
      'propio-bo.firebasestorage.app',
    messagingSenderId:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '237550271849',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  },
  cloudFunctionsUrl: process.env.NEXT_PUBLIC_CLOUD_FUNCTIONS_URL,
}
