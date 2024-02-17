export function getFirebaseErrorMessage(error: { code: string }) {
    switch (error.code) {
        case 'auth/wrong-password':
        case 'auth/invalid-email':
            return 'auth.login.errors.invalid-email-or-password';
        case 'auth/user-disabled':
            return 'auth.login.errors.disabled';
        case 'auth/user-not-found':
            return 'auth.login.errors.not-found';
        default:
            console.log(error)
            return 'auth.login.errors.unknown';
    }
}
