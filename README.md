# Modern Portfolio Website

A sleek, responsive portfolio website built with Next.js, Tailwind CSS, and shadcn/ui, enhanced with AI features.

## Features

- 🚀 **Next.js 14** with App Router
- 💅 **Tailwind CSS** for styling
- 🧩 **shadcn/ui** components
- 🤖 **AI-powered features** using OpenAI
- 📱 Fully responsive design
- 🌓 Light and dark mode support
- ⚡ Fast performance
- 🔍 SEO optimized

## AI Features

- 💬 **AI Assistant Chatbot** - A floating chat interface for answering visitor questions
- ✨ **Smart Input Assistant** - AI-powered form suggestions in the contact form
- 💡 **Project Idea Generator** - Generate creative project ideas with detailed specifications

See [AI Features Documentation](src/app/ai-features.md) for more details and configuration.

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- OpenAI API key (for AI features)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/modern-portfolio.git
cd modern-portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

Create a `.env.local` file in the root directory and add your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
├── public/             # Static assets
├── src/
│   ├── app/            # App router pages
│   │   ├── api/        # API routes including AI endpoints
│   │   └── ...         # Page components
│   ├── components/     # React components
│   │   ├── ui/         # shadcn/ui components
│   │   └── ...         # Custom components
│   └── lib/            # Utility functions
├── tailwind.config.ts  # Tailwind configuration
└── next.config.ts      # Next.js configuration
```

## Customization

### Personal Information

Edit the content in the pages to add your own information:

- Update the hero section in `src/app/page.tsx`
- Add your projects in `src/app/portfolio/page.tsx`
- Customize the header links in `src/components/header.tsx`
- Update social links in `src/components/footer.tsx`

### AI Features

Customize AI behaviors by modifying:
- The system prompt in `src/app/api/ai-assistant/route.ts`
- Input suggestion logic in `src/components/smart-input.tsx`
- Project idea generation prompt in `src/components/ai-project-generator.tsx`

### Styling

This project uses Tailwind CSS for styling. You can customize the theme in `tailwind.config.ts` and the global styles in `src/app/globals.css`.

## Deployment

This portfolio can be easily deployed to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyoursername%2Fmodern-portfolio)

Remember to add your `OPENAI_API_KEY` to your Vercel environment variables.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [OpenAI](https://openai.com/)
