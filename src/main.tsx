import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { initI18n } from './i18n';
import App from './App'

// Never block the whole site if locale files fail to load (e.g. network hiccup):
// render with whatever translations are available and retry in the background.
try {
  await initI18n();
} catch (error) {
  console.warn('Failed to load translations, retrying in background', error);
  setTimeout(() => {
    initI18n().catch((retryError) => console.warn('Translation retry failed', retryError));
  }, 2000);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
