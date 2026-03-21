# GeoQuest - Next Steps

## Current Status
- React Native / Expo SDK 54 app running in Expo Go
- Core features working: Quiz, Learn, Daily Challenge, Levels, Difficulty, Region Filter
- AsyncStorage persistence for progress
- Duplicate options bug fixed
- Code pushed to GitHub

---

## Phase 1: Polish & UX (Priority: High)

- [ ] Add haptic feedback on correct/wrong answers (expo-haptics already installed)
- [ ] Add animations for answer reveal, level-up, screen transitions (react-native-reanimated already installed)
- [ ] Add sound effects for correct/wrong/level-up
- [ ] Improve loading state with skeleton screens
- [ ] Add "shake to report bug" or feedback mechanism
- [ ] Handle edge cases: empty question pools, network errors gracefully

## Phase 2: Branding & Assets (Priority: High)

- [ ] Design and set custom app icon (1024x1024 PNG)
- [ ] Design splash screen with GeoQuest branding
- [ ] Configure splash screen in app.json (expo-splash-screen installed)
- [ ] Take App Store screenshots (6.7", 6.1", 5.5" for iOS; phone + tablet for Android)
- [ ] Write App Store description and keywords
- [ ] Choose app category (Education > Trivia)

## Phase 3: App Store Requirements (Priority: High)

- [ ] Create Privacy Policy page (hosted URL required by both stores)
- [ ] Set up Apple Developer Account ($99/year)
- [ ] Set up Google Play Developer Account ($25 one-time)
- [ ] Configure app.json with bundle identifiers:
  - iOS: `com.yourname.geoquest`
  - Android: `com.yourname.geoquest`
- [ ] Set app version and build numbers
- [ ] Complete IARC rating questionnaire
- [ ] Fill out App Privacy labels (Apple) and Data Safety form (Google)

## Phase 4: Build & Test (Priority: High)

- [ ] Set up EAS Build (`npx eas-cli build:configure`)
- [ ] Create development build for iOS
- [ ] Create development build for Android
- [ ] Test on multiple device sizes (iPhone SE, iPhone 15 Pro Max, iPad)
- [ ] Test on Android devices (various screen sizes)
- [ ] Test offline functionality
- [ ] Add crash reporting (Sentry or similar)
- [ ] Performance testing and optimization

## Phase 5: Submit & Launch (Priority: Medium)

- [ ] Build production iOS binary via EAS
- [ ] Build production Android AAB via EAS
- [ ] Submit to Apple App Store for review
- [ ] Submit to Google Play Store for review
- [ ] Address any review feedback
- [ ] Plan launch marketing (social media, friends & family)

## Phase 6: Post-Launch (Priority: Low)

- [ ] Add more question categories (oceans, landmarks, languages, currencies)
- [ ] Add multiplayer or leaderboard feature
- [ ] Cloud sync for progress (Firebase / Supabase)
- [ ] Push notifications for daily challenge reminders
- [ ] In-app review prompts
- [ ] Analytics (usage patterns, popular categories)
- [ ] Localization (multiple languages)
- [ ] Accessibility improvements (VoiceOver, TalkBack)

---

## Quick Reference

| Command | Description |
|---|---|
| `npx expo start` | Start dev server |
| `npx expo start --web` | Run in browser |
| `npx eas build --platform ios` | Build for iOS |
| `npx eas build --platform android` | Build for Android |
| `npx eas submit --platform ios` | Submit to App Store |
| `npx eas submit --platform android` | Submit to Play Store |
