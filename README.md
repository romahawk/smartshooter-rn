# SmartShooter RN – Cross Assignment 5 (API Integration)

SmartShooter RN is a React Native (Expo + TypeScript) application designed to help players track basketball shooting performance.  
This repository includes the implementation for **Cross Assignment 4 (navigation)** and **Cross Assignment 5 (API integration & list rendering)**.

---

# 📌 Features Implemented in Cross Assignment 5

### ✔️ 1. Public API Chosen  
For this assignment, we selected the safe, stable **JSONPlaceholder REST API**:

https://jsonplaceholder.typicode.com/posts

While SmartShooter will eventually use a real backend, JSONPlaceholder is ideal for testing:

- Does not require API keys  
- Fast responses  
- Returns a list of objects suitable for lists  
- Supports predictable `/posts/:id` routes  
- Perfect for demonstrating loading, errors, navigation, and list rendering

### ✔️ 2. API Integration (Fetch)  
All API logic is implemented in:

```
app/api/api.ts
```

Example:

```ts
export const fetchSessions = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to load data');
  return response.json();
};
```

### ✔️ 3. Rendering via FlatList  
The **History** screen now renders real API data via:

```ts
<FlatList
  data={sessions}
  renderItem={({ item }) => (
    <TrainingCard
      title={item.title}
      accuracy={generateAccuracy()}
      lastSession="API session"
      onPress={() => handlePress(item)}
    />
  )}
  keyExtractor={(item) => item.id.toString()}
/>
```

### ✔️ 4. Loading & Error Handling  
Implemented with:

```ts
if (loading) return <ActivityIndicator size="large" />;
if (error)   return <Text style={styles.error}>{error}</Text>;
```

### ✔️ 5. Data → Navigation  
Item parameters are passed into:

```
session/[id].tsx
```

Example:

```ts
router.push({
  pathname: '/session/[id]',
  params: { id: item.id, title: item.title, accuracy }
});
```

The details screen displays dynamic data from `route.params`.

---

# 📡 API Explanation (For Mentor)

### Why JSONPlaceholder?  
SmartShooter is a sports app, but no stable free basketball API exists with:

- CORS enabled  
- No API key  
- High uptime  
- Public GET endpoints  

JSONPlaceholder fits all required assignment criteria:

| Requirement | JSONPlaceholder Match |
|------------|-----------------------|
| Public REST API | ✔️ |
| Supports GET | ✔️ |
| Returns lists | ✔️ |
| Usable for FlatList | ✔️ |
| Allows details screen navigation | ✔️ `/posts/:id` |
| Works on Web + iOS + Android | ✔️ |
| No CORS issues | ✔️ |

To adapt the data to our basketball theme, we **map post titles into training names**, and we **generate random accuracy values** for demonstration.  
This approach shows understanding of API integration while keeping the demo consistent with SmartShooter’s subject area.

---

# 🧭 Navigation Architecture (from Cross Assignment 4)

The app uses **Expo Router** (Stack + Tabs).

```
app/
  _layout.tsx                # Root Stack
  (tabs)/_layout.tsx         # Bottom Tabs
  (tabs)/history.tsx         # Displays API data
  (tabs)/index.tsx
  (tabs)/new-training.tsx
  (tabs)/stats.tsx
  (tabs)/profile.tsx
  session/[id].tsx           # Details screen (receives params)
```

Tabs remain consistent with your Figma design.

---

# 🧱 Components Used

Reusable components:

```
app/components/
  PrimaryButton.tsx
  StepperInput.tsx
  TrainingCard.tsx
  StatsCard.tsx
  ProgressBar.tsx
  ProfileHeader.tsx
```

Centralized styling:

```
app/constants/
  colors.ts
  spacing.ts
  radius.ts
  shadows.ts
```

---

# 🖼 Screenshots (Add Your Final Ones)

### History Screen – API Data Loaded  
<img src="assets/screenshots/history.jpg" width="280" />

### Navigation Demo Video  
Stored in:

```
assets/videos/navigation.mp4
```

---

# ▶️ Running the App

```bash
npm install
npx expo start
```

Use:

- **w** → Web
- **i** → iOS simulator (macOS only)
- **a** → Android emulator
- **QR code** → Expo Go on your phone

---

# 📂 Project Structure

```
smartshooter-rn
 ├─ app
 │   ├─ api/api.ts
 │   ├─ (tabs)/
 │   ├─ session/[id].tsx
 │   ├─ components/
 │   ├─ constants/
 │   └─ hooks/
 ├─ assets/
 │   ├─ images/
 │   ├─ screenshots/
 │   └─ videos/navigation.mp4
 ├─ README.md
 └─ package.json
```

---

# 📬 Submission Checklist (Cross Assignment 5)

| Requirement | Status |
|------------|--------|
| Public API selected | ✔️ JSONPlaceholder |
| Fetch integrated | ✔️ |
| State management (useState) | ✔️ |
| List rendering via FlatList | ✔️ |
| Navigation to details | ✔️ |
| Error & loading states | ✔️ |
| API logic in separate file | ✔️ `api/api.ts` |
| Screenshots/video added to README | ✔️ |
| Clean modular code | ✔️ |
| Repo uploaded to GitHub | ✔️ |
| Ready for ZIP archive | ✔️ |

Everything is now in place.

---

# 👤 Author  
Roman Mazuryk – SmartShooter RN  
Neoversity – React Native Module  
2025
