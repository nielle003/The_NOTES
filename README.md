# The Notes App

A modern note-taking application built with Next.js, TypeScript, and AI-powered features. Create, organize, and enhance your notes with Google Gemini AI integration.

## Features

- 📝 **Create & Manage Notes** - Easily create, edit, and delete notes
- 🤖 **AI-Powered Assistance** - Generate and enhance notes using Google Gemini API
- 🔐 **Authentication** - Secure user login and sign-up with Supabase Auth
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS and Radix UI components
- 🌙 **Dark Mode** - Built-in dark mode toggle for comfortable reading
- 💾 **Database** - Reliable PostgreSQL database via Supabase with Prisma ORM
- ⚡ **Fast Performance** - Next.js 15 with Turbopack for rapid development
- 📱 **Responsive** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 15.4.4, React 19, TypeScript, Tailwind CSS
- **UI Components**: Radix UI, Sonner (toasts), Lucide Icons
- **Database**: PostgreSQL (Supabase) with Prisma ORM
- **Authentication**: Supabase Auth
- **AI**: Google Generative AI (Gemini)
- **Styling**: Tailwind CSS, PostCSS
- **Development**: ESLint, Prettier, Turbopack

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for database and auth)
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nielle003/The_NOTES.git
   cd the_notes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL=your_supabase_database_url
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   GEMINI_API_KEY=your_gemini_api_key
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Set up the database**
   ```bash
   npm run migrate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── login/             # Login page
│   ├── sign-up/           # Sign-up page
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Radix UI components
│   └── AppSidebar.tsx    # Main sidebar
├── db/                   # Database
│   ├── schema.prisma     # Prisma schema
│   └── prisma.ts         # Prisma client
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── providers/            # Context providers
├── auth/                 # Authentication logic
└── styles/               # Global styles
```

## Available Scripts

```bash
# Development
npm run dev                # Start dev server with Turbopack
npm run build              # Build for production
npm start                  # Start production server
npm run lint               # Run ESLint

# Database
npm run migrate            # Generate Prisma client and run migrations
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string from Supabase |
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anonymous API key |
| `GEMINI_API_KEY` | Google Gemini API key for AI features |
| `NEXT_PUBLIC_BASE_URL` | Application base URL |

## Database Schema

### User
- `id` (UUID) - Primary key
- `email` (String) - Unique email address
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Note
- `id` (UUID) - Primary key
- `text` (String) - Note content
- `authorId` (UUID) - Foreign key to User
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in project settings

3. **Environment Variables on Vercel**
   Add the following in Vercel dashboard → Settings → Environment Variables:
   - `DATABASE_URL`
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_BASE_URL` (your production domain)

4. **Deploy**
   Vercel automatically deploys on every push to main branch.

## Key Features in Detail

### Authentication
- Users can sign up and log in via Supabase Auth
- Secure middleware for route protection
- Automatic session management

### Note Management
- Create new notes with rich text support
- View newest note for each user
- Delete notes with confirmation
- Update notes in real-time

### AI Integration
- Ask AI button to generate note suggestions
- Use Google Gemini API for intelligent responses
- Enhance existing notes with AI

### UI/UX
- Dark mode support with next-themes
- Responsive sidebar navigation
- Toast notifications with Sonner
- Beautiful loading skeletons
- Dropdown menus and dialogs

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correct in `.env.local`
- Check Supabase database is active (not paused)
- Ensure connection pooling is enabled in Supabase

### Build Fails on Vercel
- Ensure all environment variables are set in Vercel dashboard
- Check that Prisma migrations have run: `npm run migrate`
- Verify Node.js version is 18+

### Authentication Errors
- Confirm `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct
- Check Supabase Auth providers are enabled
- Clear browser cookies and try again

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues.

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please open a GitHub issue or contact the development team.
