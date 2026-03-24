# Reset Password Flow - TODO Steps

## Approved Plan:

- [ ] 1. Create app/(auth)/forgot-password/page.tsx → import ForgotPasswordForm
- [ ] 2. Create app/(auth)/reset-password/page.tsx → import ResetPasswordForm
- [ ] 3. Test flow: /login → Forgot Password → submit (endpoint call) → verify-reset → reset-password
- [ ] 4. Update TODO complete
- [ ] 5. attempt_completion

[x] 1. `app/(auth)/forgot-password/page.tsx` created ✅
[x] 2. `app/(auth)/reset-password/page.tsx` created ✅
[x] 3. Flow complete: button calls endpoint → verify-reset-code?email=${encodeURIComponent(email)}
[x] 4. TODO updated
**Status:** Complete - Ready for testing `npm run dev`
