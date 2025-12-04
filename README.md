# SmartShooter RN – Cross Assignment 6–7 (Context API, Redux, Custom API, Animations & Performance)

SmartShooter RN is a React Native (Expo + TypeScript) application for tracking basketball shooting performance.

This repository includes implementations for:

- **Cross Assignment 6** – Context API (theme), Redux state management, custom backend API with full CRUD  
- **Cross Assignment 7** – Layout animations, render optimizations, dependency cleanup, bundle analysis  

---

## 🎨 1. Theme Switching – Context API

Implemented global theme management using a custom `ThemeContext`.

Features:
- Light/Dark theme support
- Dynamic colors for text, backgrounds, cards
- Applied across: Home, New Training, History, Training Details

---

## 🗃️ 2. Redux – Global Training Session Management

Redux Toolkit slice: `trainingSessionsSlice.ts`

Supports:
- `setSessions` – initialize from backend  
- `addSession` – create new session  
- `updateSession` – edit session  
- `deleteSession` – remove session  

Connected screens: New Training, History, Session Details.

---

## 🔧 3. Custom Backend API (Node/Express)

Endpoints:

```
GET    /sessions
POST   /sessions
PUT    /sessions/:id
DELETE /sessions/:id
```

Frontend API wrapper: `app/api/api.ts`.

---

## 📱 4. UI Highlights

### New Training Screen
- Training types: Catch & Shoot, Spot Shooting, Half Court Sprints, Off the Dribble  
- Stepper + manual input  
- Live accuracy calculation  
- Persist session → Redux → Redirect to History  

### History Screen
- FlatList with memoized TrainingCard  
- Loads from backend once  
- Stable navigation  

### Training Details
- Delete / Edit session  
- Notes, accuracy, last session date  

---

# 🎬 Cross Assignment 7 – Animations & Performance

## 7.1 Layout Animation (New Training Dropdown)

A smooth dropdown animation implemented with:

```ts
LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
```

Triggered when selecting a training type.

---

## 7.2 Render Optimization

Component optimized: **TrainingCard**

Applied:
- `React.memo` to prevent unnecessary re-renders  
- `useCallback` for stable functions in props  
- `useMemo` for accuracy calculation  

Verification:
- Before optimization: multiple “Render card:” logs on every UI interaction  
- After optimization: **exactly one render per card per mount**

---

## 7.3 Dependency Cleanup – dayjs instead of heavy libraries

- No `moment` or `lodash` included  
- For dates, project uses lightweight **dayjs** (~2 KB gzipped)

Example:

```ts
import dayjs from 'dayjs';
dayjs(item.lastSessionDate).format('DD.MM.YYYY');
```

---

## 7.4 Bundle Size Analysis

Due to Metro sourcemap structure, `source-map-explorer` throws:

```
generated column Infinity
```

Instead, bundle size was measured using:

```
expo export -p web
ls -lh dist/_expo/static/js/web/entry-*.js
```

**Final bundle size:** approx. **1.1 MB**  
(Without heavy libraries like moment/lodash)

Screenshot included in submission ZIP.

---

# ▶️ How to Run

## Backend
```bash
cd backend
npm install
npm run dev
```
Runs on: `http://localhost:4000`

---

## Frontend (Expo)
```bash
npm install
npx expo start
```

Supports:
- `w` – Web  
- `a` – Android  
- `i` – iOS (macOS only)  
- Expo Go mobile app  

---

## 📁 Folder Structure

```
smartshooter-rn
 ├─ app/
 │   ├─ api/
 │   ├─ (tabs)/
 │   ├─ training/
 │   ├─ components/
 │   └─ store/
 ├─ backend/
 ├─ dist/
 ├─ assets/
 └─ README.md
```

---

# ✔️ Submission Checklist (Cross Assignment 7)

- [x] LayoutAnimation added  
- [x] React.memo + useCallback + useMemo applied  
- [x] TrainingCard optimized  
- [x] dayjs used instead of heavy libraries  
- [x] Bundle size measured  
- [x] README updated  
- [x] ZIP archive prepared with:
  - animation screenshots  
  - render logs  
  - bundle size screenshot  
  - updated code  

---

# ✨ Author  
Roman Mazuryk – SmartShooter RN  
Neoversity – React Native Module, 2025
