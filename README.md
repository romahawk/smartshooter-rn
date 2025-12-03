# SmartShooter RN – Cross Assignment 6 (Context API + Redux + Custom API)

SmartShooter RN is a React Native (Expo + TypeScript) application that helps players track their basketball shooting performance.

This repository now includes the implementation for:

- **Cross Assignment 4** – Navigation (Expo Router)
- **Cross Assignment 5** – Basic API integration & list rendering
- **Cross Assignment 6** – **Context API (theme)** + **Redux** + **custom backend API with full CRUD**

---

## 🎯 What Was Implemented in Cross Assignment 6

### 1. Context API – Light / Dark Theme

The app uses a custom **ThemeContext** to manage light/dark theme:

- `ThemeProvider` wraps the entire app.
- Screens consume `useTheme()` to adjust colors:
  - Background: `background` / `darkBackground`
  - Text: `textPrimary/textSecondary` vs `darkTextPrimary/darkTextSecondary`
  - Cards: `surface/border` vs `darkSurface/darkBorder`
- Implemented on:
  - `Home` (`app/(tabs)/index.tsx`)
  - `New Training` (`app/(tabs)/new-training.tsx`)
  - `History` (`app/(tabs)/history.tsx`)
  - `Training Details` (`app/training/[id].tsx`)

Dark theme readability has been improved using dedicated dark color tokens in `colors.ts`.

---

## 2. Redux – Global State for Training Sessions

Redux Toolkit is used for managing global state:

- Slice: `trainingSessionsSlice.ts`
- Reducers:
  - `setSessions` – initialize list from backend
  - `addSession` – add new session
  - `updateSession` – edit session
  - `deleteSession` – remove session

Redux is consumed on New Training, History, and Training Details screens.

---

## 3. Custom Backend API (Express)

Backend folder: `backend/`

Endpoints:

- `GET /sessions`
- `POST /sessions`
- `PUT /sessions/:id`
- `DELETE /sessions/:id`

This API replaces the earlier JSONPlaceholder test API.

---

## 4. Frontend API Layer

`app/api/api.ts` encapsulates backend calls:

```ts
fetchSessions();
createSession();
updateSessionApi();
deleteSessionApi();
```

Used throughout the app for CRUD operations.

---

## 5. UI / UX Flow

### New Training:
- Training types: *Catch & Shoot, Spot Shooting, Half Court Sprints, Off the Dribble*
- Stepper inputs + manual editing
- Automatic accuracy calculation
- Creates session → updates Redux → redirects to History

### History:
- FlatList + TrainingCard
- Loads from backend on first mount
- Reacts to Redux updates

### Training Details:
- Edit session
- Delete session
- Notes, title, accuracy, date

---

## ▶️ How to Run the Backend

```
cd backend
npm install
npm run dev
```

Backend runs at:

```
http://localhost:4000
```

---

## ▶️ How to Run the Frontend (Expo)

```
npm install
npx expo start
```

Run on:

- **Web** (press `w`)
- **Android emulator** (press `a`)
- **iOS simulator** (press `i`, macOS only)
- **Expo Go on phone**

If using a phone: set backend URL in `api.ts` to your local IP.

---

## 📂 Project Structure (Updated)

```
smartshooter-rn
 ├─ app
 │   ├─ api/api.ts
 │   ├─ (tabs)/
 │   │   ├─ index.tsx
 │   │   ├─ new-training.tsx
 │   │   ├─ history.tsx
 │   │   ├─ stats.tsx
 │   │   └─ profile.tsx
 │   ├─ training/[id].tsx
 │   ├─ components/
 │   ├─ constants/colors.ts
 │   └─ store/
 │       ├─ trainingSessionsSlice.ts
 │       └─ store.ts
 ├─ backend/
 │   ├─ server.js
 │   └─ package.json
 ├─ README.md
 └─ package.json
```

---

## ✔️ Submission Checklist

- Context API implemented  
- Redux with CRUD  
- Custom backend API added  
- FlatList rendering  
- Error & loading states  
- Navigation integrated  
- Dark theme fully supported  
- README with run instructions  

---

## 👤 Author

Roman Mazuryk – SmartShooter RN  
Neoversity – React Native Module  
2025
