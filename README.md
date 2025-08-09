# Internet Speed Test with Internationalization

A modern, responsive internet speed test application built with Next.js 15, featuring internationalization support for English and Arabic languages.

## Features

- 🌐 **Internationalization**: Full support for English and Arabic languages
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- ⚡ **Real-time Testing**: Live ping, download, and upload speed measurements
- 🎨 **Modern UI**: Gradient backgrounds, animations, and smooth transitions
- 🔄 **Language Switching**: Easy toggle between languages with persistent routing

## Language Support

- **English (en)**: Default language
- **Arabic (ar)**: Full RTL support with proper translations

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd speet-test
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Usage

### Language Switching

- Use the language switcher in the top-right corner to toggle between English and Arabic
- URLs automatically update to reflect the selected language:
  - English: `/` or `/en`
  - Arabic: `/ar`

### Speed Testing

1. Click "Start Test" to begin the speed test
2. The app will sequentially test:
   - **Ping**: Round-trip time to servers
   - **Download**: Speed of downloading data
   - **Upload**: Speed of uploading data
3. View real-time progress and results
4. Click "Reset" to start over

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Locale-specific routes
│   │   ├── layout.tsx     # Locale layout with NextIntl provider
│   │   └── page.tsx       # Main speed test page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Root redirect
├── components/
│   └── LanguageSwitcher.tsx  # Language toggle component
├── hooks/
│   └── useSpeedTest.ts    # Speed test logic
├── messages/               # Translation files
│   ├── en.json            # English translations
│   └── ar.json            # Arabic translations
└── middleware.ts          # Locale routing middleware
```

## Internationalization Setup

This project uses `next-intl` for internationalization:

### Configuration Files

- `i18n.ts`: Main internationalization configuration
- `src/middleware.ts`: Locale routing middleware
- `src/messages/`: Translation JSON files

### Adding New Languages

1. Add the locale to `i18n.ts`:

```typescript
export const locales = ["en", "ar", "fr"] as const;
```

2. Create a new translation file in `src/messages/`:

```json
// src/messages/fr.json
{
  "speedTest": {
    "title": "Test de Vitesse Internet"
    // ... other translations
  }
}
```

3. Update the language switcher component to include the new language

### Adding New Translation Keys

1. Add the key to all language files in `src/messages/`
2. Use the translation in your component:

```typescript
import { useTranslations } from "next-intl";

const t = useTranslations("speedTest");
return <h1>{t("newKey")}</h1>;
```

## Technologies Used

- **Next.js 15**: React framework with App Router
- **next-intl**: Internationalization library
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: Custom hooks for speed testing logic

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent naming conventions
- Add proper JSDoc comments for complex functions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
