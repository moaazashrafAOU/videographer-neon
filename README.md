# Neon Videographer Portfolio

A cutting-edge videographer portfolio website featuring a futuristic neon theme with cyberpunk aesthetics, Google Drive video integration, and advanced interactive effects.

## 🎨 Design Features

- **Neon Cyberpunk Theme**: Dark background with glowing neon colors (cyan, pink, purple, green)
- **Interactive Animations**: Particle effects, mouse trails, and dynamic glows
- **Diamond Stats Layout**: Unique diamond-shaped statistics counters
- **Loading Screen**: Animated neon loading experience
- **Responsive Design**: Optimized for all devices and screen sizes
- **Performance Optimized**: Lazy loading, reduced motion support, and device optimization

## 🚀 Key Features

### Visual Effects
- **Neon Glow Effects**: Text and elements with authentic neon lighting
- **Particle Animation**: Floating particles in hero section
- **Mouse Trail**: Interactive cursor trail effect
- **Parallax Scrolling**: Smooth parallax effects on scroll
- **Hover Animations**: Dynamic hover states with glow effects
- **Ripple Effects**: Click animations on interactive elements

### Functionality
- **Google Drive Integration**: Automatic conversion of Drive links to embedded videos
- **Animated Counters**: Statistics that count up when in view
- **Smooth Scrolling**: Seamless navigation between sections
- **AOS Animations**: Scroll-triggered animations throughout the site
- **Performance Monitoring**: Optimized for low-end devices

## 📁 Project Structure

```
videographer-neon/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css       # Neon theme styles
│   ├── js/
│   │   └── script.js       # Interactive functionality
│   ├── img/                # Image assets
│   └── data/
│       └── config.json     # Site configuration
└── README.md
```

## ⚙️ Configuration

### Site Settings
Edit `assets/data/config.json` to customize:

```json
{
  "project": "Videographer Portfolio",
  "theme": {
    "mode": "dark",
    "background": "#0A0A0F",
    "typography": "Poppins, sans-serif",
    "colors": {
      "primary": "#00F0FF",    // Cyan
      "secondary": "#C400FF",  // Purple
      "accent": "#FF2FD5",     // Pink
      "glow": "#39FF14",       // Green
      "text": "#E0E0E0"        // Light gray
    }
  },
  "profile": {
    "name": "Your Name",
    "role": "Professional Videographer",
    "email": "your@email.com",
    "instagram": "https://instagram.com/yourprofile",
    "whatsapp": "https://wa.me/yourphone"
  },
  "stats": {
    "happy_clients": 1068,
    "completed_projects": 230,
    "active_clients": 230,
    "years_experience": 5
  },
  "videos": [
    {
      "id": 1,
      "title": "Video Title",
      "source": "drive",
      "url": "https://drive.google.com/file/d/FILE_ID/view?usp=sharing",
      "orientation": "landscape", // or "portrait"
      "featured": true
    }
  ]
}
```

## 🎬 Video Setup

### Google Drive Integration
1. Upload video to Google Drive
2. Right-click → Share → "Anyone with the link can view"
3. Copy the sharing link
4. Add to `config.json` videos array

The system automatically converts:
```
https://drive.google.com/file/d/FILE_ID/view?usp=sharing
```
To:
```
https://drive.google.com/file/d/FILE_ID/preview
```

### Video Orientations
- **Landscape**: 16:9 aspect ratio for standard videos
- **Portrait**: 9:16 aspect ratio for mobile/social media content

## 🎨 Color Customization

### CSS Variables
Modify colors in `style.css`:

```css
:root {
  --bg-primary: #0A0A0F;        /* Main background */
  --color-primary: #00F0FF;     /* Cyan neon */
  --color-secondary: #C400FF;   /* Purple neon */
  --color-accent: #FF2FD5;      /* Pink neon */
  --color-glow: #39FF14;        /* Green glow */
  --color-text: #E0E0E0;        /* Text color */
}
```

### Neon Effects
- `.neon-blue-glow`: Cyan glow with pulse animation
- `.neon-pink-glow`: Pink glow with pulse animation
- `.neon-purple`: Purple glow (static)
- `.neon-green`: Green glow (static)

## 🔧 Development

### Local Development
```bash
cd videographer-neon
python3 -m http.server 8080
```

### Dependencies
- **AOS Library**: Animate On Scroll effects
- **Google Fonts**: Poppins typography
- **Modern Browsers**: ES6+ JavaScript features

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

### Mobile Optimizations
- Simplified animations for performance
- Touch-friendly interface elements
- Optimized image loading
- Reduced particle effects on low-end devices

## ⚡ Performance Features

### Optimization Techniques
- **Lazy Loading**: Images and videos load when needed
- **Device Detection**: Reduced animations on low-end devices
- **Intersection Observer**: Efficient scroll-based animations
- **CSS Transforms**: Hardware-accelerated animations
- **Reduced Motion**: Respects user accessibility preferences

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🎯 Interactive Elements

### Mouse Effects
- **Trail Effect**: Glowing particles follow cursor
- **Hover States**: Elements glow on hover
- **Click Ripples**: Ripple animations on button clicks

### Scroll Effects
- **Parallax**: Background elements move at different speeds
- **Counter Animation**: Statistics count up when visible
- **AOS Animations**: Elements fade/slide in on scroll

### Loading Experience
- **Animated Logo**: Neon text with loading bar
- **Progress Indicator**: Visual loading progress
- **Smooth Transition**: Fade to main content

## 🚀 Deployment

### Static Hosting
Deploy to any static hosting service:
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **GitHub Pages**: Free hosting for public repos
- **AWS S3**: Scalable cloud hosting

### CDN Optimization
For better performance:
- Use image CDN for assets
- Enable gzip compression
- Set proper cache headers
- Optimize video delivery

## 🔍 SEO & Accessibility

### SEO Features
- Semantic HTML structure
- Meta tags and Open Graph
- Descriptive alt text
- Clean URL structure

### Accessibility
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios
- Reduced motion support
- Focus indicators

## 🛠️ Customization Guide

### Adding New Sections
1. Add HTML structure to `index.html`
2. Style with neon theme in `style.css`
3. Add animations in `script.js`
4. Update navigation if needed

### Modifying Animations
- Edit CSS keyframes for custom animations
- Adjust AOS settings in JavaScript
- Modify particle effects in `script.js`
- Customize hover states in CSS

### Color Schemes
Create new color schemes by:
1. Updating CSS variables
2. Modifying neon glow classes
3. Adjusting gradient backgrounds
4. Testing contrast ratios

## 🐛 Troubleshooting

### Common Issues

**Videos not loading:**
- Verify Google Drive links are public
- Check file ID extraction in JavaScript
- Ensure proper iframe permissions

**Animations not working:**
- Check AOS library loading
- Verify JavaScript console for errors
- Test on different browsers

**Performance issues:**
- Reduce particle count
- Disable mouse trail on mobile
- Optimize image sizes

### Browser Console
Monitor console for:
- JavaScript errors
- Network request failures
- Performance warnings

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Support

For questions or issues:
1. Check browser console for errors
2. Verify all file paths are correct
3. Test on different devices/browsers
4. Review configuration settings

---

**Built with modern web technologies and cyberpunk aesthetics for the future of videography portfolios.**

