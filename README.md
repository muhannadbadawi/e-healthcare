# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
e-healthcare
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ api
│  │  ├─ adminService.ts
│  │  ├─ authService.ts
│  │  ├─ axios.ts
│  │  ├─ clientService.ts
│  │  └─ userService.ts
│  ├─ App.css
│  ├─ App.tsx
│  ├─ assets
│  │  ├─ account.jpg
│  │  ├─ health.png
│  │  ├─ image2.jpg
│  │  ├─ MedicalConsultation.jpg
│  │  ├─ payment.jpg
│  │  ├─ personal.png
│  │  └─ react.svg
│  ├─ components
│  │  ├─ confirm-dialog.tsx
│  │  ├─ layout.tsx
│  │  └─ my-button.tsx
│  ├─ enums
│  │  ├─ medical-specialty-enum.ts
│  │  └─ user-type-enum.ts
│  ├─ hooks
│  │  ├─ use-dialog.ts
│  │  └─ use-socket.ts
│  ├─ index.css
│  ├─ main.tsx
│  ├─ models
│  │  ├─ doctor.ts
│  │  ├─ register-client-data.ts
│  │  └─ register-doctor-data.ts
│  ├─ Rotes
│  │  ├─ ProtectedRoute.tsx
│  │  └─ Routes.tsx
│  ├─ screens
│  │  ├─ admin-screens
│  │  │  ├─ admin-client-management
│  │  │  │  └─ admin-client-management.tsx
│  │  │  ├─ admin-dashboard
│  │  │  │  └─ admin-dashboard.tsx
│  │  │  ├─ admin-doctors-management
│  │  │  │  ├─ add-doctor-dialog
│  │  │  │  │  └─ add-doctor-dialog.tsx
│  │  │  │  └─ admin-doctors-management.tsx
│  │  │  ├─ admin-layout.tsx
│  │  │  └─ admin-settings
│  │  │     └─ admin-settings.tsx
│  │  ├─ client-screens
│  │  │  ├─ client-chat
│  │  │  │  └─ client-chat.tsx
│  │  │  ├─ client-home
│  │  │  │  └─ client-home.tsx
│  │  │  ├─ client-layout.tsx
│  │  │  └─ medical-specialties
│  │  │     ├─ doctor-list
│  │  │     │  └─ doctor-list.tsx
│  │  │     └─ medical-specialties.tsx
│  │  ├─ doctor-screens
│  │  │  ├─ doctor-chat
│  │  │  │  └─ doctor-chat.tsx
│  │  │  ├─ doctor-home
│  │  │  │  └─ doctor-home.tsx
│  │  │  └─ doctor-layout.tsx
│  │  ├─ login-screen
│  │  │  └─ Login.tsx
│  │  └─ register-screen
│  │     ├─ Register.tsx
│  │     └─ steps
│  │        ├─ step-one.tsx
│  │        ├─ step-three.tsx
│  │        ├─ step-two.tsx
│  │        └─ step-zero.tsx
│  └─ vite-env.d.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```