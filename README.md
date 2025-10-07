# 🚀 Diwan Malla - Portfolio

A modern, responsive portfolio showcasing my projects and skills as a Full-Stack Developer. Built with Next.js 15, TypeScript, and Tailwind CSS.

![Portfolio Preview](https://via.placeholder.com/1200x600/1a1a1a/ffffff?text=Diwan+Malla+Portfolio)

## ✨ Features

### 🎨 **Modern Design**
- **Responsive Layout** - Works perfectly on all devices
- **Dark/Light Mode** - Smooth theme switching with system preference detection
- **Glassmorphism Effects** - Modern UI with backdrop blur
- **Smooth Animations** - Buttery smooth transitions and hover effects

### 🔥 **Dynamic Content**
- **Live GitHub Integration** - Fetches real repositories from GitHub API
- **Smart Descriptions** - Auto-fetches README content for projects without descriptions
- **Interactive Modals** - Beautiful README viewer with markdown rendering
- **Advanced Sorting** - Sort projects by recent, alphabetical, stars, or creation date

### 📱 **User Experience**
- **Pagination System** - Handle large project lists (6/12/20/30 per page)
- **Search & Filter** - Easy project discovery
- **Loading States** - Skeleton loaders and smooth transitions
- **Error Handling** - Graceful fallbacks for API failures

### ⚡ **Performance**
- **Next.js 15** - Latest features with Turbopack
- **Server Components** - Optimized rendering
- **API Caching** - 1-hour cache for GitHub API calls
- **Image Optimization** - Next.js image optimization for avatars

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** Next.js 15.5.4 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Markdown:** React Markdown + Remark GFM

### **Features**
- **GitHub API Integration**
- **Theme System** (Light/Dark/System)
- **Responsive Design**
- **Server-Side Rendering**

### **Tools & Deployment**
- **Package Manager:** npm
- **Deployment:** Vercel
- **Version Control:** Git

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/DiwanMalla/github-repo.git
cd github-repo

# 2. Install dependencies
npm install

# 3. Set up environment variables (recommended)
cp .env.local.example .env.local
# Edit .env.local and add your GitHub token (see below)

# 4. Run the development server
npm run dev
```

### GitHub API Setup (Recommended)

To avoid API rate limiting, set up a GitHub Personal Access Token:

1. **Create a Token:**
   - Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Select scopes: `public_repo` (for public repositories)
   - Copy the generated token

2. **Configure Environment:**
   ```bash
   # In your .env.local file
   NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
   NEXT_PUBLIC_GITHUB_USERNAME=DiwanMalla  # Optional: change username
   ```

3. **Rate Limits:**
   - **Without token:** 60 requests/hour
   - **With token:** 5,000 requests/hour

> **Note:** The portfolio works without a token using fallback data, but adding one provides live GitHub integration.

### Development

```

## 📁 Project Structure

```
diwan-portfolio/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── globals.css      # Global styles with theme variables
│   │   ├── layout.tsx       # Root layout with theme provider
│   │   └── page.tsx         # Homepage
│   ├── components/          # React components
│   │   ├── ThemeProvider.tsx # Theme context and management
│   │   ├── ThemeToggle.tsx   # Theme switcher component
│   │   ├── Header.tsx        # Navigation header
│   │   ├── Hero.tsx          # Hero section
│   │   ├── Projects.tsx      # Projects grid with pagination
│   │   ├── ProjectCard.tsx   # Individual project card
│   │   ├── ReadmeModal.tsx   # README viewer modal
│   │   └── Footer.tsx        # Footer component
│   └── lib/
│       └── github.ts         # GitHub API service
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind configuration
├── next.config.ts           # Next.js configuration
└── package.json            # Dependencies and scripts
```

## 🎯 Key Components

### **GitHub Service (`lib/github.ts`)**
- Fetches all public repositories
- Smart README content extraction
- Repository sorting and filtering
- Error handling with fallbacks

### **Theme System**
- **ThemeProvider**: Context-based theme management
- **ThemeToggle**: 3-way toggle (Light/Dark/System)
- **Automatic Detection**: Respects OS preferences
- **Persistence**: Saves user choice in localStorage

### **Project Display**
- **Pagination**: Handle large repository lists
- **README Integration**: Auto-fetch missing descriptions
- **Modal Viewer**: Beautiful markdown rendering
- **Responsive Grid**: Adaptive layout for all screens

## 🌐 Live Demo

**Portfolio:** [https://diwanportfolio.vercel.app/](https://diwanportfolio.vercel.app/)

## 📱 Screenshots

### Light Mode
![Light Mode](https://via.placeholder.com/800x500/f8fafc/1e293b?text=Light+Mode+Preview)

### Dark Mode
![Dark Mode](https://via.placeholder.com/800x500/1e293b/f8fafc?text=Dark+Mode+Preview)

### Mobile View
![Mobile View](https://via.placeholder.com/400x700/1a1a1a/ffffff?text=Mobile+Preview)

## 🚦 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Linting & Formatting
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

## 🔧 Configuration

### **Environment Variables**
No environment variables required! The portfolio uses public GitHub API endpoints.

### **Customization**
1. **Update personal info** in `src/components/Hero.tsx`
2. **Modify GitHub username** in `src/lib/github.ts`
3. **Customize theme colors** in `src/app/globals.css`
4. **Add new sections** by creating components

## 🎨 Theme Customization

The theme system uses CSS custom properties for easy customization:

```css
/* Light theme */
:root {
  --background: 255 255 255;
  --foreground: 23 23 23;
  --muted: 248 250 252;
  /* ... */
}

/* Dark theme */
.dark {
  --background: 10 10 10;
  --foreground: 237 237 237;
  --muted: 30 30 30;
  /* ... */
}
```

## 📈 Features Roadmap

- [ ] **Blog Integration** - Add blog posts with MDX
- [ ] **Contact Form** - Working contact form with email
- [ ] **Analytics** - Add visitor analytics
- [ ] **SEO Optimization** - Enhanced meta tags and structured data
- [ ] **PWA Support** - Progressive Web App features
- [ ] **i18n** - Multi-language support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Diwan Malla** - Full-Stack Developer

- **Portfolio:** [https://diwanportfolio.vercel.app/](https://diwanportfolio.vercel.app/)
- **LinkedIn:** [https://www.linkedin.com/in/diwan-malla-b51a79226/](https://www.linkedin.com/in/diwan-malla-b51a79226/)
- **GitHub:** [https://github.com/DiwanMalla](https://github.com/DiwanMalla)

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For the beautiful icons
- **Vercel** - For seamless deployment
- **GitHub** - For the API and hosting

---

⭐ **If you found this portfolio helpful, please give it a star!** ⭐

*Built with ❤️ using Next.js, TypeScript, and Tailwind CSS*
