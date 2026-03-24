# Complete Reset Password Flow Fix - TODO Steps

**Approved Plan Summary**: Fix 404 error in resetPassword by implementing proper token flow: forgot → verify (store token) → reset (use token).

## Steps to Complete:

- [x] **Step 1**: Check/create proxy route `app/api/auth/resetPassword/route.ts` for PUT proxy with cookies/headers. ✅ Created.
- [x] **Step 2**: Update `app/(auth)/verify-reset-code/page.tsx` to store reset token from API response in localStorage after success. ✅ Added localStorage.setItem('resetToken').
- [x] **Step 3**: Update `features/auth/api/auth.service.ts` - add token param to resetPassword, send as Bearer header. ✅ Added optional token with Bearer.
- [ ] **Step 4**: Update `app/(auth)/reset-password/page.tsx` - add token guard (check localStorage), pass token to service, clear after success.
- [ ] **Step 5**: Update `features/auth/components/ResetPasswordForm.tsx` similarly if used.
- [ ] **Step 6**: Test full flow: npm run dev → /forgot-password → submit email → get code from email → /verify-reset-code → enter code → /reset-password → submit.
- [ ] **Step 7**: Update all TODO-\*.md as complete.
- [ ] **Step 8**: attempt_completion

**Current Progress**: Starting Step 1
**Status**: In Progress
