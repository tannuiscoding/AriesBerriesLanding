# AriesBerriesCompany.com - AI App Portfolio Website

> **"Shape your thoughts, and watch the world take form"**

This is the official website for **AriesBerriesCompany**, a product-led AI innovation lab. Built with **Next.js**, the site showcases upcoming AI applications, company values, team profiles, and allows users to sign up for updates.

---

## ✨ Features

- **Homepage** with constellation-style hero animation and vision highlights.
- **Our Apps** teaser with newsletter signup.
- **About Us** page with mission, vision, leadership, and values.
- **Careers** section for future team expansion.
- **Contact** form for inquiries (partnership, press, general).
- Responsive and accessible UI.
- Optimized for SEO and performance.

---

## 📁 Project Structure

```
.
├── components/        # Reusable components (Navbar, Footer, Hero, etc.)
├── pages/             # Route-based pages
│   ├── index.tsx      # Homepage
│   ├── about.tsx
│   ├── apps.tsx
│   ├── careers.tsx
│   └── contact.tsx
├── public/            # Static assets (icons, images, etc.)
├── styles/            # Tailwind and global styles
├── utils/             # Helper functions
├── .env.local         # Environment variables
├── next.config.js     # Next.js configuration
└── tailwind.config.js
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/ariesberries-site.git
cd ariesberries-site
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set environment variables

Create a `.env.local` file in the root and add any necessary variables (like email service keys if integrated):

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EMAIL_SERVICE_ID=your_service_id
EMAIL_TEMPLATE_ID=your_template_id
EMAIL_USER_ID=your_user_id
```

### 4. Start the development server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

## Docker Deployment

Run the following commands to build and deploy the Docker container:

To create a Docker image, ensure you have a `Dockerfile` in the root of your project with the following content:

- To create the Docker image, run:
```bash
docker build -t ariesberries-site .
```


- To run the docker container, use:
```bash
docker run -p 3000:3000 --env-file .env ariesberries-site
```


---

## 🛠️ Customization

You can easily modify the following sections:

- **Hero animation**: Located in `components/Hero.tsx` (SVG or canvas-based animation).
- **About content**: Update in `pages/about.tsx`.
- **Newsletter Signup**: Connected via placeholder form or a service like Mailchimp/Resend – logic in `components/NewsletterSignup.tsx`.
- **Contact Form**: Set up with form handler in `pages/api/contact.ts` (or 3rd-party like Formspree/Resend).

---

## 📦 Production Build

To build the app for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run start
```

---

## ☁️ Deployment

This project is ready to deploy to platforms like **Vercel**, **Netlify**, or **Render**.

To deploy on **Vercel**:

1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com), import your repo.
3. Set environment variables in the dashboard.
4. Click **Deploy**.

---

## 📧 Contact

For inquiries or collaboration:

📩 [hello@ariesberriescompany.com](mailto:hello@ariesberriescompany.com)

---

## 🧠 Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) (for animations)
- [Resend](https://resend.com/) or [Formspree](https://formspree.io/) for email handling
- [Vercel](https://vercel.com/) for deployment

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🪐 Inspired by

The infinite potential of the cosmos, creativity, and human-AI collaboration.