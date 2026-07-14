/* =========================================================
   MOMENTUM — Service Explorer data
   Single source of truth for services.html. The explorer
   (js/service-explorer.js) renders everything from this
   structure — adding a new package later mainly means
   adding data here, not rebuilding the interface.

   Shape (adapted from the TS spec to plain JS):

   ServiceCategory = {
     id, name, description,
     solutions: ServiceSolution[],
     faqs?: [{ question, answer }]   // omit → FAQ section hides
   }

   ServiceSolution = {
     id, name,
     availability: "complete" | "quotation",
     // The fields below are required when availability
     // is "complete" and ignored for "quotation":
     packageName, startingPrice, description, bestFor[],
     highlights: [{ label, value }],  // at-a-glance summary strip
     included: [{ title, items[] }],  // deliverables, grouped for scanning
     timeline, timelineNote, paymentTerms[],
     exclusions[], addOns: [{ name, price }]
   }

   Note: the five category descriptions also appear as static
   copy in the homepage services overview (index.html).
   ========================================================= */

const MOMENTUM_SERVICES = [
  {
    id: "website-development",
    name: "Website Development",
    description:
      "Professional websites and digital platforms designed to present your business clearly, build trust, and turn visitors into customers.",
    solutions: [
      {
        id: "landing-page",
        name: "Landing Page",
        availability: "complete",
        packageName: "Momentum Launch Page",
        startingPrice: "Starting from TZS 550,000",
        description:
          "A focused one-page website built to introduce your business, communicate your value, and encourage visitors to contact, enquire, register, or make a booking.",
        bestFor: [
          "Startups",
          "Small businesses",
          "Consultants",
          "Personal brands",
          "Events",
          "Restaurants",
          "Salons",
          "Single products",
          "Campaigns",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 550,000" },
          { label: "Timeline", value: "5–7 business days" },
          { label: "Revisions", value: "2 rounds included" },
          { label: "Support", value: "14 days post-launch" },
        ],
        included: [
          {
            title: "Design & structure",
            items: [
              "One professionally designed scrolling page",
              "Up to seven page sections",
              "Responsive design for mobile, tablet, and desktop",
              "Hero section with a clear call to action",
              "About section",
              "Services or product section",
              "Testimonials or credibility section",
              "Contact section",
            ],
          },
          {
            title: "Features & integrations",
            items: [
              "Contact form",
              "WhatsApp integration",
              "Social media links",
              "Google Maps integration where required",
            ],
          },
          {
            title: "Launch & visibility",
            items: [
              "Basic on-page SEO",
              "Website analytics setup",
              "SSL and deployment configuration",
              "Domain connection",
            ],
          },
          {
            title: "Care & support",
            items: [
              "Two revision rounds",
              "Fourteen days of post-launch technical support",
            ],
          },
        ],
        timeline: "5–7 business days",
        timelineNote:
          "The timeline begins after the deposit, content, brand materials, and project requirements have been received.",
        paymentTerms: [
          "60% deposit before work begins",
          "40% before launch or final handover",
        ],
        exclusions: [
          "Domain and hosting fees",
          "E-commerce functionality",
          "Customer accounts",
          "Custom dashboards",
          "Custom databases",
          "Payment gateway integration",
          "Professional photography",
          "Large copywriting assignments",
          "Paid advertising",
          "Advanced SEO campaigns",
          "Unlimited revisions",
        ],
        addOns: [
          { name: "Additional page section", price: "TZS 50,000" },
          { name: "Website copywriting", price: "From TZS 150,000" },
          { name: "Additional revision round", price: "TZS 75,000" },
          { name: "Basic logo design", price: "From TZS 200,000" },
          { name: "English and Swahili version", price: "From TZS 200,000" },
          { name: "Booking integration", price: "From TZS 150,000" },
          { name: "Newsletter setup", price: "TZS 100,000" },
          { name: "Urgent 2–3 day delivery", price: "Additional 30%" },
          { name: "Monthly maintenance", price: "From TZS 100,000 per month" },
        ],
      },
      {
        id: "business-website",
        name: "Business Website",
        availability: "complete",
        packageName: "Momentum Business Website",
        startingPrice: "Starting from TZS 1,500,000",
        description:
          "A professional multi-page website designed for organizations that need a complete online presence, build credibility, communicate their services, and generate enquiries.",
        bestFor: [
          "Companies",
          "NGOs",
          "Schools",
          "Hospitals & clinics",
          "Hotels",
          "Professional firms",
          "Government projects",
          "Manufacturing businesses",
          "Construction companies",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 1,500,000" },
          { label: "Timeline", value: "10–15 business days" },
          { label: "Revisions", value: "2 rounds included" },
          { label: "Support", value: "30 days post-launch" },
        ],
        included: [
          {
            title: "Planning & strategy",
            items: [
              "Discovery session",
              "Information architecture",
              "Sitemap planning",
            ],
          },
          {
            title: "Design & structure",
            items: [
              "Custom responsive design for mobile, tablet, and desktop",
              "Up to ten pages",
              "Homepage",
              "About page",
              "Services pages",
              "Contact page",
              "Additional pages as agreed in the sitemap",
            ],
          },
          {
            title: "Features & integrations",
            items: [
              "Contact forms",
              "WhatsApp integration",
              "Google Maps integration",
              "Team section",
              "Testimonials section",
              "Gallery",
              "Blog capability",
              "Downloadable documents",
            ],
          },
          {
            title: "Launch & visibility",
            items: [
              "On-page SEO setup",
              "Website analytics setup",
              "SSL and deployment configuration",
              "Performance optimization",
              "Domain connection",
            ],
          },
          {
            title: "Care & support",
            items: [
              "Two revision rounds",
              "Thirty days of post-launch technical support",
            ],
          },
        ],
        timeline: "10–15 business days",
        timelineNote:
          "The timeline begins after all required content and project materials have been received.",
        paymentTerms: [
          "60% deposit before work begins",
          "40% before launch or final handover",
        ],
        exclusions: [
          "E-commerce functionality",
          "Customer accounts",
          "Payment gateway integration",
          "Custom dashboards",
          "Advanced third-party integrations",
          "Custom portals",
          "Third-party subscription fees",
        ],
        addOns: [
          { name: "Additional pages", price: "Quoted on request" },
          { name: "Website copywriting", price: "Quoted on request" },
          { name: "Booking system integration", price: "Quoted on request" },
          { name: "Multilingual support", price: "Quoted on request" },
          { name: "Additional revision round", price: "Quoted on request" },
        ],
      },
      {
        id: "ecommerce-website",
        name: "E-commerce Website",
        availability: "complete",
        packageName: "Momentum Online Store",
        startingPrice: "Starting from TZS 3,500,000",
        description:
          "A complete online store that allows businesses to showcase products, manage orders, and sell online through an intuitive shopping experience.",
        bestFor: [
          "Retail stores",
          "Fashion brands",
          "Cosmetic businesses",
          "Electronics",
          "Furniture",
          "Food businesses",
          "Wholesale suppliers",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 3,500,000" },
          { label: "Timeline", value: "15–25 business days" },
          { label: "Payment", value: "60% / 40% split" },
          { label: "Support", value: "30 days post-launch" },
        ],
        included: [
          {
            title: "Planning & strategy",
            items: [
              "Store structure planning",
              "Category planning",
              "Product catalogue planning",
            ],
          },
          {
            title: "Design & structure",
            items: [
              "Responsive storefront design",
              "Product page design",
              "Shopping experience design",
              "Checkout flow",
            ],
          },
          {
            title: "Store features",
            items: [
              "Shopping cart",
              "Product management",
              "Product search",
              "Product filtering",
              "Wishlist",
              "Inventory support",
              "Customer accounts",
              "Order tracking",
              "Discount coupons",
            ],
          },
          {
            title: "Launch & visibility",
            items: [
              "On-page SEO setup",
              "Website analytics setup",
              "SSL and deployment configuration",
              "Performance optimization",
            ],
          },
          {
            title: "Care & support",
            items: ["Thirty days of post-launch technical support"],
          },
        ],
        timeline: "15–25 business days",
        timelineNote:
          "The timeline begins after all required content, product information, and project materials have been received.",
        paymentTerms: [
          "60% deposit before work begins",
          "40% before launch or final handover",
        ],
        exclusions: [
          "ERP integration",
          "Warehouse software integration",
          "Advanced logistics systems",
          "Marketplace integrations",
          "Custom inventory systems",
        ],
        addOns: [
          { name: "Payment gateway integration", price: "Quoted on request" },
          { name: "SMS notifications", price: "Quoted on request" },
          { name: "Email automation", price: "Quoted on request" },
          { name: "Product upload assistance", price: "Quoted on request" },
          { name: "Advanced reporting", price: "Quoted on request" },
        ],
      },
      {
        id: "custom-web-application",
        name: "Custom Web Application",
        availability: "complete",
        packageName: "Momentum Custom Application",
        startingPrice: "Starting from TZS 6,000,000",
        description:
          "Custom software built specifically around your organization's workflow and operational needs.",
        bestFor: [
          "Internal systems",
          "Booking platforms",
          "School systems",
          "Hospital systems",
          "Inventory systems",
          "Customer portals",
          "Dashboards",
          "Enterprise workflows",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 6,000,000" },
          { label: "Timeline", value: "Quoted after discovery" },
          { label: "Payment", value: "Milestone based" },
          { label: "Support", value: "Included" },
        ],
        included: [
          {
            title: "Discovery & planning",
            items: [
              "Business analysis",
              "Requirements gathering",
              "UI/UX planning",
              "System architecture",
            ],
          },
          {
            title: "Build & delivery",
            items: ["Development", "Testing", "Deployment", "Documentation"],
          },
          {
            title: "Handover & support",
            items: ["Training session", "Technical support"],
          },
        ],
        timeline: "Quoted after discovery",
        timelineNote:
          "A detailed delivery timeline is provided in the project proposal after the discovery phase.",
        paymentTerms: [
          "Payments are structured around agreed project milestones",
          "A detailed payment schedule is included in the project proposal",
        ],
        exclusions: [
          "Work outside the agreed project scope",
          "Additional modules beyond the proposal",
          "Third-party licensing fees",
          "Infrastructure and hosting costs",
        ],
        addOns: [
          { name: "Additional modules", price: "Quoted on request" },
          { name: "Ongoing maintenance", price: "Quoted on request" },
          { name: "Cloud deployment", price: "Quoted on request" },
          { name: "API integrations", price: "Quoted on request" },
          { name: "Extended training", price: "Quoted on request" },
        ],
      },
      {
        id: "website-redesign",
        name: "Website Redesign",
        availability: "complete",
        packageName: "Momentum Website Redesign",
        startingPrice: "Starting from TZS 900,000",
        description:
          "Modernize your existing website with improved design, performance, usability, and user experience while preserving your business identity.",
        bestFor: [
          "Businesses with outdated websites",
          "Websites that are difficult to use on mobile",
          "Slow or underperforming websites",
          "Brands refreshing their identity",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 900,000" },
          { label: "Timeline", value: "7–14 business days" },
          { label: "Payment", value: "60% / 40% split" },
          { label: "Support", value: "Included" },
        ],
        included: [
          {
            title: "Review & planning",
            items: ["Website review", "UX improvement plan"],
          },
          {
            title: "Design & rebuild",
            items: [
              "Modern interface design",
              "Responsive redesign for mobile, tablet, and desktop",
              "Performance improvements",
            ],
          },
          {
            title: "Launch & visibility",
            items: ["SEO review", "Migration assistance", "Deployment"],
          },
          {
            title: "Care & support",
            items: ["Post-launch technical support"],
          },
        ],
        timeline: "7–14 business days",
        timelineNote:
          "The timeline begins after access to the existing website and all required materials have been received.",
        paymentTerms: [
          "60% deposit before work begins",
          "40% before launch or final handover",
        ],
        exclusions: [
          "Major new feature development",
          "Custom software development",
          "New backend systems",
          "Content rewriting",
        ],
        addOns: [
          { name: "Content migration", price: "Quoted on request" },
          { name: "Photography", price: "Quoted on request" },
          { name: "Copywriting", price: "Quoted on request" },
          { name: "SEO improvements", price: "Quoted on request" },
        ],
      },
      {
        id: "website-maintenance",
        name: "Website Maintenance",
        availability: "complete",
        packageName: "Momentum Website Maintenance",
        startingPrice: "Starting from TZS 150,000 / month",
        description:
          "Ongoing maintenance to keep your website secure, updated, and performing reliably.",
        bestFor: [
          "Any business with an existing website",
          "Organizations without an in-house technical team",
          "Websites built by Momentum",
          "Websites built elsewhere",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 150,000 / month" },
          { label: "Timeline", value: "Monthly subscription" },
          { label: "Payment", value: "Billed monthly" },
          { label: "Reporting", value: "Monthly report" },
        ],
        included: [
          {
            title: "Updates & fixes",
            items: ["Monthly updates", "Bug fixes", "Content updates"],
          },
          {
            title: "Monitoring & security",
            items: [
              "Security monitoring",
              "Regular backups",
              "Performance monitoring",
            ],
          },
          {
            title: "Support & reporting",
            items: ["Technical support", "Monthly report"],
          },
        ],
        timeline: "Monthly subscription",
        timelineNote:
          "Maintenance begins once website access has been provided and the first monthly payment is received.",
        paymentTerms: ["Billed monthly in advance"],
        exclusions: [
          "Major redesigns",
          "Large feature development",
          "Complete rebuilds",
          "Third-party software costs",
        ],
        addOns: [
          { name: "Emergency support", price: "Quoted on request" },
          { name: "Additional development hours", price: "Quoted on request" },
          { name: "Content management", price: "Quoted on request" },
          { name: "SEO optimization", price: "Quoted on request" },
          { name: "Hosting management", price: "Quoted on request" },
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need to provide the website content?",
        answer:
          "Yes. Clients normally provide their business information, service details, images, logo, and contact information. Momentum can provide copywriting and content support as an additional service.",
      },
      {
        question: "Are domain and hosting included?",
        answer:
          "Domain and hosting costs are quoted separately unless they are explicitly included in the approved proposal.",
      },
      {
        question: "Can I request changes?",
        answer:
          "Yes. Each package includes a defined number of revision rounds. Additional revisions may be charged separately.",
      },
      {
        question: "Will the website work on mobile phones?",
        answer:
          "Yes. All Momentum websites are designed to work across mobile phones, tablets, and desktop devices.",
      },
      {
        question: "Can Momentum maintain the website after launch?",
        answer:
          "Yes. The Website Maintenance package keeps your website secure, updated, and performing reliably for a monthly fee starting from TZS 150,000 per month.",
      },
      {
        question: "Can I start small and upgrade later?",
        answer:
          "Yes. Many clients begin with a Landing Page and later upgrade to a Business Website or E-commerce Website as the business grows. Earlier work is reused wherever possible.",
      },
      {
        question: "Can you redesign my current website?",
        answer:
          "Yes. The Website Redesign package modernizes an existing website with improved design, performance, and usability while preserving your business identity.",
      },
      {
        question: "Can I sell products online?",
        answer:
          "Yes. The E-commerce Website package includes a complete online store with a shopping cart, product management, customer accounts, and order tracking. Payment gateway integration is available as an add-on.",
      },
      {
        question: "Can I request extra pages?",
        answer:
          "Yes. Every website package supports additional pages as an add-on, quoted based on the content and design work required.",
      },
      {
        question: "What if I need something fully custom?",
        answer:
          "The Custom Web Application package covers systems built around your workflow, such as portals, dashboards, and booking platforms. Pricing and timelines are quoted after a discovery phase.",
      },
    ],
  },
  {
    id: "brand-identity",
    name: "Brand Identity",
    description:
      "Strategic visual identities that help businesses look consistent, recognizable, and credible.",
    solutions: [
      {
        id: "logo-design",
        name: "Logo Design",
        availability: "complete",
        packageName: "Momentum Logo Design",
        startingPrice: "Starting from TZS 350,000",
        description:
          "A distinctive, professionally crafted logo that gives your business a clear and memorable visual identity, delivered in every format you need for print and digital use.",
        bestFor: [
          "Startups",
          "Small businesses",
          "Personal brands",
          "New organizations",
          "Product launches",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 350,000" },
          { label: "Timeline", value: "5–7 business days" },
          { label: "Concepts", value: "3 initial directions" },
          { label: "Revisions", value: "2 rounds included" },
        ],
        included: [
          {
            title: "Discovery & concepts",
            items: [
              "Discovery session covering your business, audience, and competitors",
              "Three initial logo concepts",
              "Concept presentation with design rationale",
              "Two refinement rounds on the chosen concept",
            ],
          },
          {
            title: "Final logo package",
            items: [
              "Primary logo",
              "Horizontal and stacked variations",
              "Full-color, monochrome, and reversed versions",
              "Vector source files (AI, EPS, SVG)",
              "High-resolution PNG files with transparent backgrounds",
              "Print-ready PDF",
            ],
          },
          {
            title: "Usage guidance",
            items: [
              "One-page usage sheet covering clear space, minimum size, and color values",
              "File naming and format guide so you always know which file to use where",
            ],
          },
        ],
        timeline: "5–7 business days",
        timelineNote:
          "The timeline begins after the deposit has been received and the discovery session is complete.",
        paymentTerms: [
          "60% deposit before work begins",
          "40% before final files are delivered",
        ],
        exclusions: [
          "Full brand guidelines document",
          "Stationery and business card design",
          "Social media templates",
          "Trademark registration and legal searches",
          "Unlimited concepts or revisions",
        ],
        addOns: [
          { name: "Additional logo concept", price: "TZS 100,000" },
          { name: "Additional revision round", price: "TZS 75,000" },
          { name: "Business card design", price: "TZS 100,000" },
          { name: "Social profile assets", price: "TZS 100,000" },
          { name: "Animated logo for video and social", price: "From TZS 250,000" },
          { name: "Urgent 3-day delivery", price: "Additional 30%" },
        ],
      },
      {
        id: "brand-starter-kit",
        name: "Brand Starter Kit",
        availability: "complete",
        packageName: "Momentum Brand Starter Kit",
        startingPrice: "Starting from TZS 850,000",
        description:
          "The essential identity package for a professional launch — a logo, core visual system, and the everyday assets your business needs to look consistent from day one.",
        bestFor: [
          "Small companies",
          "NGOs",
          "Restaurants",
          "Retail businesses",
          "Professional services",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 850,000" },
          { label: "Timeline", value: "7–10 business days" },
          { label: "Revisions", value: "2 rounds included" },
          { label: "Formats", value: "Print & digital files" },
        ],
        included: [
          {
            title: "Logo & core identity",
            items: [
              "Discovery session covering your business, audience, and competitors",
              "Logo design with three initial concepts",
              "Full-color, monochrome, and reversed logo versions",
              "Vector source files (AI, EPS, SVG) and high-resolution PNG files",
              "Typography selection with primary and secondary typefaces",
              "Color palette with print and digital color values",
            ],
          },
          {
            title: "Brand rules",
            items: [
              "Concise brand sheet covering logo usage, clear space, colors, and typography",
              "Do-and-don't examples for everyday use",
            ],
          },
          {
            title: "Business essentials",
            items: [
              "Business card design (print-ready)",
              "Letterhead design",
              "Email signature design",
              "Social media profile assets (profile image and cover for your key platforms)",
            ],
          },
        ],
        timeline: "7–10 business days",
        timelineNote:
          "The timeline begins after the deposit has been received and the discovery session is complete.",
        paymentTerms: [
          "60% deposit before work begins",
          "40% before final files are delivered",
        ],
        exclusions: [
          "Full brand strategy and positioning work",
          "Comprehensive brand guidelines document",
          "Social media content templates",
          "Packaging and signage design",
          "Printing costs",
          "Trademark registration",
        ],
        addOns: [
          { name: "Additional stationery items", price: "From TZS 75,000 per item" },
          { name: "Social media post templates", price: "From TZS 200,000" },
          { name: "Company profile design", price: "From TZS 300,000" },
          { name: "Additional revision round", price: "TZS 100,000" },
          { name: "Print management", price: "Quoted on request" },
        ],
      },
      {
        id: "complete-brand-identity",
        name: "Complete Brand Identity",
        availability: "complete",
        packageName: "Momentum Complete Brand Identity",
        startingPrice: "Starting from TZS 2,000,000",
        description:
          "Our flagship branding package — a complete identity built on strategy, from positioning and personality through to a full visual system, templates, and a professional brand guideline document.",
        bestFor: [
          "Growing companies",
          "Organizations",
          "Government projects",
          "Technology companies",
          "Professional firms",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 2,000,000" },
          { label: "Timeline", value: "15–25 business days" },
          { label: "Revisions", value: "3 rounds included" },
          { label: "Guidelines", value: "Full document included" },
        ],
        included: [
          {
            title: "Brand strategy",
            items: [
              "Discovery workshop with your team",
              "Mission and vision refinement",
              "Brand personality and tone of voice definition",
              "Audience and competitor review",
              "Positioning statement",
            ],
          },
          {
            title: "Visual identity system",
            items: [
              "Logo system with primary logo, secondary marks, and icon",
              "Full-color, monochrome, and reversed versions in all formats",
              "Typography system with primary and secondary typefaces",
              "Color system with primary, secondary, and functional palettes",
              "Iconography style and starter icon set",
              "Photography and imagery direction",
            ],
          },
          {
            title: "Brand applications",
            items: [
              "Business card, letterhead, and email signature",
              "Social media profile assets",
              "Social media post template set",
              "Presentation template",
              "Two additional applications relevant to your business (e.g. ID card, folder, invoice, signage concept)",
            ],
          },
          {
            title: "Brand guidelines",
            items: [
              "Comprehensive brand guideline document covering strategy, logo usage, typography, color, imagery, and applications",
              "Organized file library with all assets in print and digital formats",
              "Handover session walking your team through the identity",
            ],
          },
        ],
        timeline: "15–25 business days",
        timelineNote:
          "The timeline begins after the deposit has been received and the discovery workshop is complete.",
        paymentTerms: [
          "50% deposit before work begins",
          "30% on approval of the visual identity",
          "20% before final files are delivered",
        ],
        exclusions: [
          "Website design and development",
          "Ongoing social media content production",
          "Commissioned photography and video",
          "Printing and production costs",
          "Trademark registration and legal searches",
          "Advertising campaigns",
        ],
        addOns: [
          { name: "Additional brand applications", price: "From TZS 100,000 per item" },
          { name: "Brand naming and tagline development", price: "From TZS 500,000" },
          { name: "Animated logo and motion assets", price: "From TZS 350,000" },
          { name: "Website design and development", price: "From TZS 1,500,000" },
          { name: "Brand photography direction on set", price: "Quoted on request" },
        ],
      },
      {
        id: "rebranding",
        name: "Rebranding",
        availability: "complete",
        packageName: "Momentum Rebranding",
        startingPrice: "Starting from TZS 1,500,000",
        description:
          "A structured evolution of your existing brand — modernizing how you look and communicate while protecting the recognition and trust you have already built.",
        bestFor: [
          "Businesses changing direction",
          "Growing companies",
          "Organizations with outdated branding",
          "Businesses after a merger or restructure",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 1,500,000" },
          { label: "Timeline", value: "15–20 business days" },
          { label: "Revisions", value: "3 rounds included" },
          { label: "Includes", value: "Audit & migration plan" },
        ],
        included: [
          {
            title: "Audit & direction",
            items: [
              "Brand audit of your current identity, materials, and touchpoints",
              "Competitive review of how you compare in your market",
              "Rebrand direction recommendation — refresh or full redesign",
              "Definition of which brand equity to preserve",
            ],
          },
          {
            title: "Identity evolution",
            items: [
              "Evolved logo system with three directions",
              "Updated typography and color system",
              "Full-color, monochrome, and reversed versions in all formats",
              "Refreshed imagery and visual style direction",
            ],
          },
          {
            title: "Updated applications",
            items: [
              "Business card, letterhead, and email signature",
              "Social media profile assets",
              "Updated brand sheet covering the evolved identity",
            ],
          },
          {
            title: "Migration & launch",
            items: [
              "Migration checklist covering where and in what order to update your brand",
              "Side-by-side comparison of old and new identity for internal alignment",
              "Launch recommendations for announcing the rebrand to your audience",
            ],
          },
        ],
        timeline: "15–20 business days",
        timelineNote:
          "The timeline begins after the deposit has been received and access to your existing brand materials has been provided.",
        paymentTerms: [
          "50% deposit before work begins",
          "30% on approval of the evolved identity",
          "20% before final files are delivered",
        ],
        exclusions: [
          "Full brand strategy and repositioning work",
          "Comprehensive brand guidelines document",
          "Website redesign",
          "Reprinting and production costs",
          "Signage fabrication",
          "Trademark registration",
        ],
        addOns: [
          { name: "Comprehensive brand guidelines document", price: "From TZS 500,000" },
          { name: "Website redesign", price: "From TZS 900,000" },
          { name: "Additional application updates", price: "From TZS 100,000 per item" },
          { name: "Rebrand announcement content", price: "Quoted on request" },
          { name: "Print management", price: "Quoted on request" },
        ],
      },
      {
        id: "brand-guidelines",
        name: "Brand Guidelines",
        availability: "complete",
        packageName: "Momentum Brand Guidelines",
        startingPrice: "Starting from TZS 500,000",
        description:
          "A clear, professional guideline document that defines exactly how your brand should be used, so every designer, printer, and team member applies it consistently.",
        bestFor: [
          "Businesses with an existing logo",
          "Growing teams",
          "Organizations working with multiple vendors",
          "Franchises and branches",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 500,000" },
          { label: "Timeline", value: "7–10 business days" },
          { label: "Revisions", value: "2 rounds included" },
          { label: "Format", value: "Print & digital PDF" },
        ],
        included: [
          {
            title: "Logo standards",
            items: [
              "Logo versions and when to use each",
              "Clear space and minimum size rules",
              "Placement guidance",
              "Incorrect usage examples",
            ],
          },
          {
            title: "Visual system",
            items: [
              "Typography rules with typefaces, weights, and hierarchy",
              "Color specifications with print and digital values (CMYK, RGB, HEX)",
              "Imagery and photography guidance",
            ],
          },
          {
            title: "Applications",
            items: [
              "Digital usage guidance for web, social media, and presentations",
              "Print usage guidance for stationery and marketing materials",
              "Real application examples using your existing materials",
            ],
          },
          {
            title: "Delivery",
            items: [
              "Professionally designed guideline document as a digital and print-ready PDF",
              "Organized logo and asset files referenced by the document",
            ],
          },
        ],
        timeline: "7–10 business days",
        timelineNote:
          "The timeline begins after the deposit has been received along with your existing logo files and brand materials.",
        paymentTerms: [
          "60% deposit before work begins",
          "40% before the final document is delivered",
        ],
        exclusions: [
          "Logo design or redesign",
          "New brand applications (stationery, templates)",
          "Brand strategy and positioning work",
          "Copywriting beyond the guideline content",
          "Printing costs",
        ],
        addOns: [
          { name: "Logo refinement before documentation", price: "From TZS 150,000" },
          { name: "Tone of voice section", price: "From TZS 150,000" },
          { name: "Stationery design added to the document", price: "From TZS 200,000" },
          { name: "Editable working files", price: "Quoted on request" },
          { name: "Annual guideline update", price: "Quoted on request" },
        ],
      },
    ],
    faqs: [
      {
        question: "Will I own the logo?",
        answer:
          "Yes. Once the project is fully paid, full ownership of the final logo and brand assets transfers to you. Momentum retains the right to display the work in its portfolio unless agreed otherwise.",
      },
      {
        question: "Which file formats are delivered?",
        answer:
          "Every logo package includes vector source files (AI, EPS, SVG) for professional printing and signage, high-resolution PNG files with transparent backgrounds for everyday digital use, and a print-ready PDF.",
      },
      {
        question: "How many revisions are included?",
        answer:
          "Each package includes a defined number of revision rounds — two for Logo Design, Brand Starter Kit, and Brand Guidelines, and three for Complete Brand Identity and Rebranding. Additional rounds are available as an add-on.",
      },
      {
        question: "Can you redesign my existing logo?",
        answer:
          "Yes. The Rebranding package evolves an existing identity while preserving the recognition you have built. If you only need the logo modernized without the wider brand work, contact Momentum for a tailored quotation.",
      },
      {
        question: "Why do I need brand guidelines?",
        answer:
          "Guidelines keep your brand consistent as more people work with it. When designers, printers, and staff all follow the same rules for logo usage, colors, and typography, your business looks professional everywhere it appears — and you avoid costly reprints caused by inconsistent files.",
      },
      {
        question: "Can you design business cards and stationery?",
        answer:
          "Yes. Business cards, letterheads, and email signatures are included in the Brand Starter Kit, Complete Brand Identity, and Rebranding packages, and are available as an add-on to Logo Design.",
      },
      {
        question: "Can you create social media templates?",
        answer:
          "Yes. Social media post templates are included in the Complete Brand Identity package and available as an add-on to the Brand Starter Kit. All packages include social profile assets sized for your key platforms.",
      },
      {
        question: "Do you handle printing?",
        answer:
          "All designs are delivered print-ready. Printing itself is not included, but Momentum can manage the printing process with trusted vendors as an add-on service.",
      },
      {
        question: "What do you need from me to start?",
        answer:
          "Your business information, any existing brand materials, examples of identities you like, and the deposit. Every branding project starts with a discovery session where we gather everything else we need.",
      },
      {
        question: "Can I start with a logo and expand later?",
        answer:
          "Yes. Many clients begin with Logo Design and later add stationery, templates, or full guidelines. The visual foundation carries forward, so earlier work is never wasted.",
      },
    ],
  },
  {
    id: "ai-business-automation",
    name: "AI & Business Automation",
    description:
      "Practical AI and automation solutions that reduce repetitive work, improve efficiency, and support better customer experiences.",
    solutions: [
      {
        id: "workflow-automation",
        name: "Workflow Automation",
        availability: "complete",
        packageName: "Momentum Workflow Automation",
        startingPrice: "Starting from TZS 1,500,000",
        description:
          "We identify the repetitive tasks that consume your team's time — data entry, follow-ups, reporting, approvals — and automate them, so your people spend less time on manual work and more time on work that grows the business.",
        bestFor: [
          "SMEs",
          "NGOs",
          "Professional firms",
          "Service businesses",
          "Growing companies",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 1,500,000" },
          { label: "Timeline", value: "10–15 business days" },
          { label: "Outcome", value: "Less manual work" },
          { label: "Support", value: "30 days post-launch" },
        ],
        included: [
          {
            title: "Understanding your business",
            items: [
              "Workflow analysis session with your team",
              "Process mapping of how work currently flows",
              "Identification of the tasks where automation saves the most time",
            ],
          },
          {
            title: "Automation design & build",
            items: [
              "Automation design explained in plain business language before anything is built",
              "Implementation of the agreed automations",
              "Testing against your real, everyday scenarios",
            ],
          },
          {
            title: "Handover & support",
            items: [
              "Plain-language documentation of every automation",
              "Staff walkthrough so your team knows exactly what changed",
              "Launch support during the first days of live use",
              "Thirty days of post-launch support",
            ],
          },
        ],
        timeline: "10–15 business days",
        timelineNote:
          "The timeline begins after the deposit has been received and the workflow analysis session is complete.",
        paymentTerms: [
          "60% deposit before work begins",
          "40% before final handover",
        ],
        exclusions: [
          "Development of new software or custom applications",
          "Changes to your existing software systems beyond the agreed automations",
          "Third-party software subscription fees",
          "Automation of processes outside the agreed scope",
          "Ongoing management after the support period",
        ],
        addOns: [
          { name: "Additional workflows", price: "Quoted on request" },
          { name: "Monthly monitoring and support", price: "From TZS 200,000 / month" },
          { name: "Extended staff training session", price: "From TZS 150,000" },
          { name: "Process documentation pack", price: "From TZS 150,000" },
          { name: "Quarterly automation review", price: "From TZS 250,000" },
        ],
      },
      {
        id: "customer-support-ai",
        name: "Customer Support AI",
        availability: "complete",
        packageName: "Momentum Customer Support AI",
        startingPrice: "Starting from TZS 2,000,000",
        description:
          "An AI-powered assistant that answers your customers' common questions instantly on your website or messaging platforms — so customers get consistent help right away, and your team handles fewer repetitive enquiries.",
        bestFor: [
          "Retail",
          "Hotels",
          "Schools",
          "NGOs",
          "Healthcare",
          "Professional services",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 2,000,000" },
          { label: "Timeline", value: "10–15 business days" },
          { label: "Availability", value: "Answers any time of day" },
          { label: "Support", value: "30 days post-launch" },
        ],
        included: [
          {
            title: "Discovery & knowledge",
            items: [
              "Discovery session covering your customers and their most common questions",
              "Knowledge gathering — your services, prices, policies, and procedures",
              "Review of past enquiries to understand how customers actually ask",
            ],
          },
          {
            title: "Assistant design & setup",
            items: [
              "Conversation design that matches your brand's tone",
              "AI assistant setup on your website or one messaging platform",
              "Clear handover to your team for questions the assistant should not answer alone",
            ],
          },
          {
            title: "Testing & launch",
            items: [
              "Testing against real customer questions before going live",
              "Deployment on the agreed channel",
              "Training for your team on reviewing conversations and updating answers",
            ],
          },
          {
            title: "Care & support",
            items: ["Thirty days of post-launch support"],
          },
        ],
        timeline: "10–15 business days",
        timelineNote:
          "The timeline begins after the deposit has been received and your business information and knowledge materials have been provided.",
        paymentTerms: [
          "60% deposit before work begins",
          "40% before the assistant goes live",
        ],
        exclusions: [
          "Messaging platform and AI service subscription fees",
          "Additional channels beyond the agreed platform",
          "Phone and voice support",
          "Staffing of live human support",
          "CRM and booking system integration",
          "Ongoing knowledge updates after the support period",
        ],
        addOns: [
          { name: "Additional channel (e.g. WhatsApp or Instagram)", price: "From TZS 400,000" },
          { name: "English and Swahili support", price: "From TZS 300,000" },
          { name: "CRM or booking system integration", price: "Quoted on request" },
          { name: "Monthly knowledge updates and monitoring", price: "From TZS 200,000 / month" },
          { name: "Extended team training", price: "From TZS 150,000" },
        ],
      },
      {
        id: "internal-ai-assistant",
        name: "Internal AI Assistant",
        availability: "complete",
        packageName: "Momentum Internal AI Assistant",
        startingPrice: "Starting from TZS 2,500,000",
        description:
          "A private assistant for your team that answers questions about your company's documents, procedures, and policies in seconds — so employees find what they need without digging through folders or interrupting colleagues.",
        bestFor: [
          "Organizations with growing teams",
          "Companies with extensive documentation",
          "NGOs and programme teams",
          "Professional firms",
          "Organizations onboarding staff regularly",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 2,500,000" },
          { label: "Timeline", value: "15–20 business days" },
          { label: "Access", value: "Private to your team" },
          { label: "Support", value: "30 days post-launch" },
        ],
        included: [
          {
            title: "Requirements & knowledge",
            items: [
              "Requirements gathering with your team",
              "Knowledge organization — collecting and structuring your documents, procedures, and policies",
              "Agreement on what the assistant should and should not answer",
            ],
          },
          {
            title: "Assistant setup",
            items: [
              "AI assistant setup, private to your organization",
              "Testing with the real questions your team asks every day",
              "Refinement based on your team's feedback",
            ],
          },
          {
            title: "Handover & support",
            items: [
              "Plain-language documentation",
              "Staff training on using and getting the most from the assistant",
              "Deployment to your team",
              "Thirty days of post-launch support",
            ],
          },
        ],
        timeline: "15–20 business days",
        timelineNote:
          "The timeline begins after the deposit has been received and your company documents and knowledge materials have been provided.",
        paymentTerms: [
          "60% deposit before work begins",
          "40% before final handover",
        ],
        exclusions: [
          "Writing or rewriting company documents and procedures",
          "Third-party software subscription fees",
          "Integration with internal systems beyond the agreed scope",
          "Company-wide change management",
          "Ongoing knowledge updates after the support period",
        ],
        addOns: [
          { name: "Additional departments or knowledge areas", price: "Quoted on request" },
          { name: "Integration with internal tools", price: "Quoted on request" },
          { name: "Monthly knowledge updates", price: "From TZS 250,000 / month" },
          { name: "Extended staff training", price: "From TZS 150,000" },
          { name: "English and Swahili support", price: "From TZS 300,000" },
        ],
      },
      {
        id: "ai-integration",
        name: "AI Integration",
        availability: "complete",
        packageName: "Momentum AI Integration",
        startingPrice: "Starting from TZS 3,000,000",
        description:
          "We add AI capabilities to the systems, website, or digital platform your business already uses — improving customer experience, efficiency, and decision support without replacing what already works.",
        bestFor: [
          "Companies with existing software platforms",
          "E-commerce businesses",
          "Technology companies",
          "Organizations with customer portals",
          "Established digital products",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 3,000,000" },
          { label: "Timeline", value: "Quoted after discovery" },
          { label: "Payment", value: "Milestone based" },
          { label: "Support", value: "Included" },
        ],
        included: [
          {
            title: "Discovery & planning",
            items: [
              "Discovery session covering your systems and business goals",
              "Assessment of where AI creates measurable value in your platform",
              "Integration plan explained in business terms, not technical ones",
            ],
          },
          {
            title: "Build & delivery",
            items: [
              "Implementation of the agreed AI capabilities",
              "Testing alongside your existing features",
              "Deployment with minimal disruption to your operations",
            ],
          },
          {
            title: "Handover & support",
            items: [
              "Documentation",
              "Team walkthrough of the new capabilities",
              "Post-launch technical support",
            ],
          },
        ],
        timeline: "Quoted after discovery",
        timelineNote:
          "A detailed delivery timeline is provided in the project proposal after the discovery phase.",
        paymentTerms: [
          "Payments are structured around agreed project milestones",
          "A detailed payment schedule is included in the project proposal",
        ],
        exclusions: [
          "Rebuilding or redesigning your existing systems",
          "Fixing unrelated issues in your existing platform",
          "Third-party AI service subscription fees",
          "Work outside the agreed project scope",
          "Infrastructure and hosting costs",
        ],
        addOns: [
          { name: "Additional AI capabilities", price: "Quoted on request" },
          { name: "Ongoing monitoring and tuning", price: "From TZS 300,000 / month" },
          { name: "Staff training", price: "From TZS 150,000" },
          { name: "Performance reporting", price: "Quoted on request" },
          { name: "Extended support", price: "Quoted on request" },
        ],
      },
      {
        id: "custom-ai-solution",
        name: "Custom AI Solution",
        availability: "complete",
        packageName: "Momentum Custom AI Solution",
        startingPrice: "Starting from TZS 5,000,000",
        description:
          "A tailored AI solution designed around your organization's specific operations — from document processing and internal copilots to business intelligence assistants — for organizations whose needs go beyond off-the-shelf tools.",
        bestFor: [
          "Document processing",
          "Internal copilots",
          "Business intelligence assistants",
          "Industry-specific AI systems",
          "Custom automation",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 5,000,000" },
          { label: "Timeline", value: "Quoted after discovery" },
          { label: "Payment", value: "Milestone based" },
          { label: "Support", value: "Included" },
        ],
        included: [
          {
            title: "Discovery & requirements",
            items: [
              "Discovery workshops with your team",
              "Requirements gathering around your operations and goals",
              "Honest assessment of where AI creates value — and where it does not",
            ],
          },
          {
            title: "Design & development",
            items: [
              "Solution architecture",
              "Design built around how your organization actually works",
              "Development",
              "Testing against your real operational scenarios",
            ],
          },
          {
            title: "Launch & handover",
            items: [
              "Deployment",
              "Staff training",
              "Documentation",
              "Technical support",
            ],
          },
        ],
        timeline: "Quoted after discovery",
        timelineNote:
          "A detailed delivery timeline is provided in the project proposal after the discovery workshops.",
        paymentTerms: [
          "Payments are structured around agreed project milestones",
          "A detailed payment schedule is included in the project proposal",
        ],
        exclusions: [
          "Work outside the agreed project scope",
          "Additional modules beyond the proposal",
          "Third-party licensing and AI service fees",
          "Infrastructure and hosting costs",
          "Ongoing operational staffing",
        ],
        addOns: [
          { name: "Additional modules", price: "Quoted on request" },
          { name: "Ongoing maintenance and improvement", price: "Quoted on request" },
          { name: "Extended training programme", price: "Quoted on request" },
          { name: "Monitoring and reporting", price: "Quoted on request" },
          { name: "Cloud deployment management", price: "Quoted on request" },
        ],
      },
    ],
    faqs: [
      {
        question: "Do we need technical knowledge to use these solutions?",
        answer:
          "No. Every solution is designed for everyday business users. Momentum handles the technical work, and your team receives plain-language documentation and training — if you can use WhatsApp or email, you can use what we build.",
      },
      {
        question: "Can AI work with our existing systems?",
        answer:
          "In most cases, yes. Solutions are designed to work alongside the tools your business already uses rather than replacing them. Where an integration is not practical, we say so during discovery — before you commit to anything.",
      },
      {
        question: "Will AI replace our employees?",
        answer:
          "No. These solutions take over repetitive tasks — answering the same questions, moving data between systems, searching for documents — so your team spends more time on judgment, relationships, and growth. The goal is a more productive team, not a smaller one.",
      },
      {
        question: "How long does implementation take?",
        answer:
          "Workflow Automation and Customer Support AI typically take 10–15 business days, and an Internal AI Assistant 15–20. AI Integration and Custom AI Solution projects are quoted after discovery, since the timeline depends on the scope agreed in the proposal.",
      },
      {
        question: "Is our business information kept private?",
        answer:
          "Yes. Your documents and business knowledge are used only to build your solution, internal assistants are private to your organization, and confidentiality can be covered by a signed agreement. How your data is stored and accessed is explained clearly before work begins.",
      },
      {
        question: "Can the solution be customized to our business?",
        answer:
          "Yes — that is the core of the service. Every solution is built around your processes, your knowledge, and your tone. Nothing is delivered as a generic, one-size-fits-all tool.",
      },
      {
        question: "What happens after deployment?",
        answer:
          "Fixed-scope packages include thirty days of post-launch support, and larger projects include support as defined in the proposal. After that, monthly monitoring, knowledge updates, and improvement plans are available as add-ons.",
      },
      {
        question: "Do you provide staff training?",
        answer:
          "Yes. Every package includes a walkthrough or training session so your team understands what was built and how to use it day to day. Extended training is available as an add-on for larger teams.",
      },
      {
        question: "Can we expand the solution later?",
        answer:
          "Yes. Many clients start with one workflow or one channel and expand once the value is proven. Solutions are built so that later additions extend the earlier work rather than replacing it.",
      },
      {
        question: "How do we know if AI is right for our business?",
        answer:
          "Every engagement starts with a discovery session where we look at your actual processes and identify where automation creates measurable value. If AI is not the right answer for a task, we tell you — we focus on practical automation rather than unnecessary complexity.",
      },
    ],
  },
  {
    id: "paid-advertising",
    name: "Paid Advertising",
    description:
      "Targeted advertising campaigns designed to reach the right audience and generate measurable business results.",
    solutions: [
      {
        id: "campaign-setup",
        name: "Campaign Setup",
        availability: "complete",
        packageName: "Momentum Campaign Setup",
        startingPrice: "Starting from TZS 450,000",
        description:
          "A professionally configured advertising campaign on Meta or Google for businesses starting with paid advertising — researched, structured, tracked, and launched correctly from day one.",
        bestFor: [
          "Small businesses",
          "Startups",
          "Restaurants",
          "Hotels",
          "NGOs",
          "Professional firms",
          "Local businesses",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 450,000" },
          { label: "Timeline", value: "5–7 business days" },
          { label: "Platform", value: "Meta or Google" },
          { label: "Support", value: "7 days post-launch" },
        ],
        included: [
          {
            title: "Research & planning",
            items: [
              "Discovery session covering your goals, offer, and budget",
              "Audience research for your market",
              "Campaign plan with objective, targeting, and budget structure",
            ],
          },
          {
            title: "Account & tracking setup",
            items: [
              "Ad account review and configuration",
              "Pixel or tracking tag setup where applicable",
              "Campaign, ad set, and ad configuration on one platform",
            ],
          },
          {
            title: "Launch & handover",
            items: [
              "Campaign launch support",
              "Basic performance report after the first week",
              "Walkthrough of how the campaign is structured",
              "Seven days of post-launch support",
            ],
          },
        ],
        timeline: "5–7 business days",
        timelineNote:
          "The timeline begins after the deposit, ad account access, and campaign materials have been received.",
        paymentTerms: [
          "60% deposit before work begins",
          "40% before the campaign launches",
        ],
        exclusions: [
          "The advertising budget paid to Meta or Google",
          "Ongoing campaign management after launch",
          "Ad creative design and video production",
          "Landing page design and development",
          "Multiple platforms in one setup",
          "Copywriting beyond the ad text",
        ],
        addOns: [
          { name: "Second platform setup", price: "From TZS 300,000" },
          { name: "Ad creative design", price: "From TZS 150,000" },
          { name: "Campaign landing page", price: "From TZS 550,000" },
          { name: "One month of campaign management", price: "From TZS 800,000" },
          { name: "Urgent 2–3 day setup", price: "Additional 30%" },
        ],
      },
      {
        id: "social-media-advertising",
        name: "Social Media Advertising",
        availability: "complete",
        packageName: "Momentum Social Media Advertising",
        startingPrice: "Starting from TZS 800,000 / month",
        description:
          "Professional monthly management of paid advertising across Meta platforms, including Facebook and Instagram — planned, monitored, and optimized so your budget works harder every month.",
        bestFor: [
          "Retail businesses",
          "Restaurants",
          "Hotels",
          "Personal brands",
          "E-commerce",
          "NGOs",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 800,000 / month" },
          { label: "Timeline", value: "Monthly service" },
          { label: "Platforms", value: "Facebook & Instagram" },
          { label: "Reporting", value: "Monthly report" },
        ],
        included: [
          {
            title: "Campaign management",
            items: [
              "Monthly campaign planning aligned to your goals and promotions",
              "Campaign and ad set management across Facebook and Instagram",
              "Budget management and pacing throughout the month",
            ],
          },
          {
            title: "Optimization",
            items: [
              "Audience testing and optimization",
              "Ad creative recommendations based on performance",
              "Continuous optimization of targeting, placements, and bids",
            ],
          },
          {
            title: "Monitoring & reporting",
            items: [
              "Ongoing performance monitoring",
              "Monthly performance report in plain language",
              "Monthly review call to plan the next cycle",
            ],
          },
        ],
        timeline: "Monthly service",
        timelineNote:
          "Management begins once the first monthly payment has been received and ad account access has been provided. Existing campaigns are reviewed in the first week.",
        paymentTerms: [
          "Billed monthly in advance",
          "The advertising budget is paid directly to Meta and agreed separately",
        ],
        exclusions: [
          "The advertising budget paid to Meta",
          "Ad creative design and video production",
          "Organic content creation and posting",
          "Community management and comment replies",
          "Landing page design and development",
          "Platforms outside Meta",
        ],
        addOns: [
          { name: "Ad creative design", price: "From TZS 150,000 / month" },
          { name: "Short video ads", price: "From TZS 100,000 per video" },
          { name: "Google Ads management", price: "From TZS 900,000 / month" },
          { name: "Campaign landing page", price: "From TZS 550,000" },
          { name: "Monthly social media content", price: "From TZS 600,000 / month" },
        ],
      },
      {
        id: "google-ads-management",
        name: "Google Ads Management",
        availability: "complete",
        packageName: "Momentum Google Ads Management",
        startingPrice: "Starting from TZS 900,000 / month",
        description:
          "Professional Google Ads management focused on reaching customers at the moment they are actively searching for your products and services.",
        bestFor: [
          "Service businesses",
          "Professional firms",
          "Local businesses",
          "Healthcare",
          "Education",
          "Technology companies",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 900,000 / month" },
          { label: "Timeline", value: "Monthly service" },
          { label: "Focus", value: "Search campaigns" },
          { label: "Reporting", value: "Monthly report" },
        ],
        included: [
          {
            title: "Setup & structure",
            items: [
              "Keyword research for your services and market",
              "Campaign setup with structured ad groups",
              "Search campaigns targeting high-intent queries",
              "Conversion tracking setup",
            ],
          },
          {
            title: "Ongoing management",
            items: [
              "Bid and budget management throughout the month",
              "Negative keyword management to cut wasted spend",
              "Ad copy testing and refinement",
              "Continuous optimization based on performance data",
            ],
          },
          {
            title: "Reporting & guidance",
            items: [
              "Monthly performance report in plain language",
              "Budget recommendations based on results",
              "Monthly review call to plan the next cycle",
            ],
          },
        ],
        timeline: "Monthly service",
        timelineNote:
          "Management begins once the first monthly payment has been received and ad account access has been provided. New accounts are typically live within the first week.",
        paymentTerms: [
          "Billed monthly in advance",
          "The advertising budget is paid directly to Google and agreed separately",
        ],
        exclusions: [
          "The advertising budget paid to Google",
          "Landing page design and development",
          "Display banner and video ad production",
          "SEO and organic search work",
          "Google Business Profile management",
          "Platforms outside Google Ads",
        ],
        addOns: [
          { name: "Display or YouTube campaigns", price: "Quoted on request" },
          { name: "Campaign landing page", price: "From TZS 550,000" },
          { name: "Display banner design", price: "From TZS 150,000" },
          { name: "Social media advertising", price: "From TZS 800,000 / month" },
          { name: "Additional conversion tracking setup", price: "Quoted on request" },
        ],
      },
      {
        id: "lead-generation-campaigns",
        name: "Lead Generation Campaigns",
        availability: "complete",
        packageName: "Momentum Lead Generation Campaign",
        startingPrice: "Starting from TZS 1,200,000",
        description:
          "An advertising campaign built specifically to generate qualified enquiries, bookings, or customer leads — planned, launched, and managed through a full campaign cycle.",
        bestFor: [
          "Real estate",
          "Education",
          "Healthcare",
          "Consulting",
          "NGOs",
          "Financial services",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 1,200,000" },
          { label: "Launch", value: "7–10 business days" },
          { label: "Management", value: "30-day campaign cycle" },
          { label: "Reporting", value: "Weekly lead summary" },
        ],
        included: [
          {
            title: "Planning & targeting",
            items: [
              "Campaign planning session covering your offer and lead goals",
              "Audience targeting built around your ideal customer",
              "Landing page recommendations, or lead forms built on the ad platform",
            ],
          },
          {
            title: "Launch & management",
            items: [
              "Lead form setup and testing before launch",
              "Campaign launch on the agreed platform",
              "Optimization of targeting, creative, and budget across the 30-day cycle",
            ],
          },
          {
            title: "Leads & reporting",
            items: [
              "Weekly lead delivery and performance summary",
              "Lead quality review midway through the campaign",
              "End-of-campaign review with results and recommendations",
            ],
          },
        ],
        timeline: "7–10 business days to launch, then a 30-day campaign cycle",
        timelineNote:
          "The timeline begins after the deposit, ad account access, and campaign materials have been received.",
        paymentTerms: [
          "60% deposit before work begins",
          "40% before the campaign launches",
          "The advertising budget is paid directly to the platform and agreed separately",
        ],
        exclusions: [
          "The advertising budget paid to the platform",
          "Landing page design and development",
          "Ad creative design and video production",
          "CRM setup and lead follow-up on your behalf",
          "A guaranteed number or cost of leads",
          "Management beyond the 30-day cycle",
        ],
        addOns: [
          { name: "Campaign landing page", price: "From TZS 550,000" },
          { name: "Ad creative design", price: "From TZS 150,000" },
          { name: "Additional 30-day campaign cycle", price: "From TZS 800,000" },
          { name: "Second platform", price: "Quoted on request" },
          { name: "Lead handover automation (email or sheet)", price: "Quoted on request" },
        ],
      },
      {
        id: "marketing-strategy-consulting",
        name: "Marketing Strategy & Consulting",
        availability: "complete",
        packageName: "Momentum Marketing Strategy",
        startingPrice: "Starting from TZS 700,000",
        description:
          "Strategic consulting that gives you a clear, practical plan — where to advertise, how to allocate your budget, and how to improve marketing performance before you spend more.",
        bestFor: [
          "Growing businesses",
          "Organizations",
          "Companies launching products",
          "Businesses entering new markets",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 700,000" },
          { label: "Timeline", value: "7–10 business days" },
          { label: "Deliverable", value: "Strategy document" },
          { label: "Handover", value: "Presentation session" },
        ],
        included: [
          {
            title: "Discovery & review",
            items: [
              "Discovery workshop with your team",
              "Review of your current marketing channels and results",
              "Competitor analysis for your market",
            ],
          },
          {
            title: "Strategy",
            items: [
              "Target audience definition",
              "Channel recommendations with reasoning for each",
              "Campaign roadmap for the next three to six months",
              "Budget recommendations by channel",
            ],
          },
          {
            title: "Delivery",
            items: [
              "Written strategy document you keep and act on",
              "Strategy presentation session with your team",
              "Two weeks of follow-up questions by email or WhatsApp",
            ],
          },
        ],
        timeline: "7–10 business days",
        timelineNote:
          "The timeline begins after the deposit has been received and the discovery workshop is complete.",
        paymentTerms: [
          "60% deposit before work begins",
          "40% before the strategy is delivered",
        ],
        exclusions: [
          "Campaign setup and execution",
          "Ongoing campaign management",
          "The advertising budget itself",
          "Ad creative and content production",
          "Brand strategy and identity work",
          "Implementation beyond the strategy document",
        ],
        addOns: [
          { name: "Campaign setup based on the strategy", price: "From TZS 450,000" },
          { name: "Monthly campaign management", price: "From TZS 800,000 / month" },
          { name: "Quarterly strategy review", price: "From TZS 300,000" },
          { name: "Extended implementation support", price: "Quoted on request" },
        ],
      },
    ],
    faqs: [
      {
        question: "Do advertising costs include the ad budget?",
        answer:
          "No. Momentum's fees cover strategy, setup, management, and reporting. The advertising budget — the money spent on ads — is paid by you directly to Meta or Google, so you always control and see exactly what is spent.",
      },
      {
        question: "How much should I spend on ads?",
        answer:
          "It depends on your goals, market, and competition. Most small businesses start with TZS 300,000 to 1,000,000 per month in ad budget and adjust based on results. Every engagement starts with a budget recommendation matched to your objectives, and you never spend more than you approve.",
      },
      {
        question: "Which platforms do you advertise on?",
        answer:
          "Meta platforms (Facebook and Instagram) and Google Ads, including search campaigns. Social Media Advertising covers Meta, Google Ads Management covers Google, and Campaign Setup or Lead Generation Campaigns can run on whichever platform fits your audience best.",
      },
      {
        question: "Can you use my existing ad account?",
        answer:
          "Yes, and it is usually the better option — your account keeps its history, data, and billing. Momentum works through secure partner or manager access, so you retain full ownership. If you do not have an account yet, one is created in your name during setup.",
      },
      {
        question: "How quickly can campaigns launch?",
        answer:
          "A Campaign Setup typically launches within 5–7 business days, and lead generation campaigns within 7–10, counted from when the deposit, account access, and materials are in place. Monthly management engagements usually have campaigns live within the first week.",
      },
      {
        question: "How often will I receive reports?",
        answer:
          "Monthly management packages include a monthly performance report and a review call. Lead generation campaigns include a weekly lead summary. Reports are written in plain language — what was spent, what it achieved, and what happens next.",
      },
      {
        question: "Can I pause campaigns?",
        answer:
          "Yes. Campaigns can be paused at any time — for stock issues, seasonality, or budget planning — and platforms stop charging while ads are paused. For monthly packages, we simply agree on the pause and restart dates during your review call.",
      },
      {
        question: "Do you guarantee results?",
        answer:
          "No honest agency can guarantee a specific number of sales or leads, because performance depends on your offer, market, and budget. What Momentum guarantees is professional setup, transparent reporting, and continuous optimization based on real data.",
      },
      {
        question: "Do you create the ad images and videos?",
        answer:
          "Management packages include creative recommendations and ad copy, while the design and production of images and videos is available as an add-on or through the Content Production packages. Existing brand materials can also be used where they fit the campaign.",
      },
      {
        question: "What do you need from me to start?",
        answer:
          "Your business goals, access to your ad account (or permission to create one), your brand materials, an agreed ad budget, and the deposit. Every engagement starts with a discovery session where the rest is covered.",
      },
    ],
  },
  {
    id: "content-production",
    name: "Content Production",
    description:
      "Professional visual and digital content created to help brands communicate, promote, and stay visible.",
    solutions: [
      {
        id: "social-media-content",
        name: "Social Media Content",
        availability: "complete",
        packageName: "Momentum Social Media Content",
        startingPrice: "Starting from TZS 600,000 / month",
        description:
          "A monthly content service that keeps your social media presence consistent and professional — planned, designed, written, and delivered ready to publish every month.",
        bestFor: [
          "Small businesses",
          "Startups",
          "Restaurants",
          "Hotels",
          "NGOs",
          "Personal brands",
          "Professional firms",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 600,000 / month" },
          { label: "Timeline", value: "Monthly cycle" },
          { label: "Content", value: "12 posts per month" },
          { label: "Revisions", value: "2 rounds per batch" },
        ],
        included: [
          {
            title: "Planning & strategy",
            items: [
              "Monthly content planning session",
              "Content calendar covering the month ahead",
              "Content themes aligned to your goals, promotions, and seasons",
            ],
          },
          {
            title: "Content creation",
            items: [
              "Twelve professionally designed posts per month",
              "Caption writing for every post",
              "Two basic motion graphic posts per month",
              "Consistent application of your brand colors, typography, and logo",
            ],
          },
          {
            title: "Optimization & delivery",
            items: [
              "Exports sized and formatted for each of your platforms",
              "Hashtag recommendations for every post",
              "Organized monthly delivery folder, ready to publish",
            ],
          },
          {
            title: "Review & support",
            items: [
              "Two revision rounds on each monthly batch",
              "Monthly review call to plan the next cycle",
            ],
          },
        ],
        timeline: "Monthly cycle",
        timelineNote:
          "Each month's content is planned and delivered before the publishing month begins. The first cycle starts once the first monthly payment and your brand materials have been received.",
        paymentTerms: ["Billed monthly in advance"],
        exclusions: [
          "Posting and account management",
          "Community management and comment replies",
          "Paid advertising and boosting",
          "Photography and video shoots",
          "Influencer coordination",
          "Unlimited revisions",
        ],
        addOns: [
          { name: "Additional posts", price: "From TZS 40,000 per post" },
          { name: "Short video reels", price: "From TZS 100,000 per reel" },
          { name: "Posting and scheduling management", price: "From TZS 150,000 / month" },
          { name: "Monthly photography session", price: "From TZS 300,000" },
          { name: "English and Swahili captions", price: "From TZS 100,000 / month" },
          { name: "Additional revision round", price: "TZS 75,000" },
        ],
      },
      {
        id: "photography",
        name: "Photography",
        availability: "complete",
        packageName: "Momentum Photography",
        startingPrice: "Starting from TZS 500,000",
        description:
          "A professional photography session that shows your products, people, spaces, or events at their best — planned in advance, shot with professional equipment, and delivered edited and ready to use.",
        bestFor: [
          "Businesses",
          "Hotels",
          "Restaurants",
          "Retail",
          "NGOs",
          "Corporate organizations",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 500,000" },
          { label: "Delivery", value: "5–7 business days" },
          { label: "Images", value: "25 edited images" },
          { label: "Usage", value: "Commercial license" },
        ],
        included: [
          {
            title: "Planning",
            items: [
              "Pre-shoot planning session",
              "Shot list built around how the images will be used",
              "Scheduling and location coordination",
            ],
          },
          {
            title: "The shoot",
            items: [
              "Half-day session (up to four hours) at one location",
              "Professional camera and lighting equipment",
              "Direction and staging support during the shoot",
            ],
          },
          {
            title: "Editing & delivery",
            items: [
              "Twenty-five professionally edited images",
              "Color correction and standard retouching",
              "High-resolution exports for print",
              "Web-optimized versions for your website and social media",
              "Organized digital delivery",
            ],
          },
          {
            title: "Usage",
            items: ["Full commercial usage rights on all final images"],
          },
        ],
        timeline: "5–7 business days after the shoot",
        timelineNote:
          "The shoot date is scheduled once the deposit has been received. Edited images are delivered within 5–7 business days of the shoot.",
        paymentTerms: [
          "60% deposit before the shoot",
          "40% before final images are delivered",
        ],
        exclusions: [
          "Additional locations",
          "Model and talent fees",
          "Studio hire",
          "Props, styling, and wardrobe",
          "Raw unedited files",
          "Advanced photo manipulation",
          "Printing costs",
        ],
        addOns: [
          { name: "Additional hour of shooting", price: "TZS 100,000" },
          { name: "Additional edited images", price: "From TZS 15,000 per image" },
          { name: "Additional location", price: "From TZS 150,000" },
          { name: "Drone photography", price: "From TZS 250,000" },
          { name: "Model sourcing and coordination", price: "Quoted on request" },
          { name: "Urgent 48-hour delivery", price: "Additional 30%" },
        ],
      },
      {
        id: "videography",
        name: "Videography",
        availability: "complete",
        packageName: "Momentum Promotional Video",
        startingPrice: "Starting from TZS 1,500,000",
        description:
          "A professionally produced promotional video that presents your business, product, or campaign — from concept and storyboard through filming, editing, and platform-ready delivery.",
        bestFor: [
          "Businesses",
          "Organizations",
          "Product launches",
          "Marketing campaigns",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 1,500,000" },
          { label: "Timeline", value: "10–15 business days" },
          { label: "Length", value: "Up to 90 seconds" },
          { label: "Revisions", value: "2 rounds included" },
        ],
        included: [
          {
            title: "Planning & concept",
            items: [
              "Planning session covering goals, audience, and message",
              "Concept development",
              "Storyboard and shot plan",
              "Filming schedule",
            ],
          },
          {
            title: "Production",
            items: [
              "One filming day (up to six hours) at one location",
              "Professional camera, lighting, and audio equipment",
              "Direction on set",
            ],
          },
          {
            title: "Post-production",
            items: [
              "Professional editing",
              "Color correction and grading",
              "Audio enhancement and licensed background music",
              "Motion graphics and text overlays where appropriate",
              "Your logo and brand elements applied throughout",
            ],
          },
          {
            title: "Delivery",
            items: [
              "Final video up to 90 seconds",
              "Platform-optimized exports for web and social media",
              "Two revision rounds on the edit",
            ],
          },
        ],
        timeline: "10–15 business days",
        timelineNote:
          "The timeline runs from the filming day to final delivery and begins once the deposit has been received and the planning session is complete.",
        paymentTerms: [
          "60% deposit before work begins",
          "40% before final delivery",
        ],
        exclusions: [
          "Additional filming days",
          "Actor and talent fees",
          "Drone footage",
          "Voice-over recording",
          "Raw unedited footage",
          "Paid distribution and advertising",
        ],
        addOns: [
          { name: "Additional filming day", price: "From TZS 500,000" },
          { name: "Drone footage", price: "From TZS 300,000" },
          { name: "Professional voice-over", price: "From TZS 200,000" },
          { name: "Vertical cuts for social media", price: "From TZS 150,000" },
          { name: "Extended video length", price: "Quoted on request" },
          { name: "Additional revision round", price: "TZS 150,000" },
        ],
      },
      {
        id: "corporate-video",
        name: "Corporate Video",
        availability: "complete",
        packageName: "Momentum Corporate Video",
        startingPrice: "Starting from TZS 2,500,000",
        description:
          "A professionally produced corporate video that tells your organization's story — your work, your people, and your impact — through interviews, on-location footage, and polished editing.",
        bestFor: [
          "NGOs",
          "Companies",
          "Government organizations",
          "Educational institutions",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 2,500,000" },
          { label: "Timeline", value: "15–20 business days" },
          { label: "Length", value: "Up to 4 minutes" },
          { label: "Filming", value: "Up to 2 days" },
        ],
        included: [
          {
            title: "Creative planning",
            items: [
              "Discovery session with your team",
              "Creative treatment outlining the story and structure",
              "Interview question preparation",
              "Production schedule",
            ],
          },
          {
            title: "Production",
            items: [
              "Up to two filming days",
              "Interview filming with professional lighting and audio",
              "B-roll of your facilities, operations, and team",
              "Drone footage where the location and regulations allow",
            ],
          },
          {
            title: "Post-production",
            items: [
              "Professional editing",
              "Color grading",
              "Audio mixing and licensed music",
              "Branded graphics, titles, and lower thirds",
            ],
          },
          {
            title: "Delivery",
            items: [
              "Main corporate video up to four minutes",
              "One 60-second cut for social media",
              "Export formats for web, presentations, and social media",
              "Two revision rounds on the edit",
            ],
          },
        ],
        timeline: "15–20 business days",
        timelineNote:
          "The timeline runs from the first filming day to final delivery and begins once the deposit has been received and the discovery session is complete.",
        paymentTerms: [
          "50% deposit before work begins",
          "30% on approval of the first edit",
          "20% before final delivery",
        ],
        exclusions: [
          "Additional filming days beyond two",
          "Actor and talent fees",
          "Travel costs for filming outside Dar es Salaam",
          "Voice-over narration",
          "Subtitles in additional languages",
          "Raw unedited footage",
        ],
        addOns: [
          { name: "Additional filming day", price: "From TZS 500,000" },
          { name: "Professional voice-over narration", price: "From TZS 200,000" },
          { name: "English and Swahili subtitles", price: "From TZS 150,000" },
          { name: "Additional social media cuts", price: "From TZS 150,000 per cut" },
          { name: "Filming outside Dar es Salaam", price: "Travel costs quoted on request" },
          { name: "Raw footage handover", price: "Quoted on request" },
        ],
      },
      {
        id: "campaign-content",
        name: "Campaign Content",
        availability: "complete",
        packageName: "Momentum Campaign Content",
        startingPrice: "Starting from TZS 1,200,000",
        description:
          "A complete content set produced for a single campaign, launch, or promotion — photography, short video, and designed graphics, all built around one message and delivered ready for every channel.",
        bestFor: [
          "Product launches",
          "Events",
          "Marketing campaigns",
          "Promotions",
          "Seasonal marketing",
        ],
        highlights: [
          { label: "Starting from", value: "TZS 1,200,000" },
          { label: "Timeline", value: "10–15 business days" },
          { label: "Assets", value: "20+ campaign assets" },
          { label: "Revisions", value: "2 rounds included" },
        ],
        included: [
          {
            title: "Campaign planning",
            items: [
              "Planning session around your campaign goals and audience",
              "Content plan mapping every asset to its channel",
              "Visual direction consistent with your brand",
            ],
          },
          {
            title: "Production",
            items: [
              "Half-day photography session",
              "Short-form video filming",
              "Campaign graphic design",
            ],
          },
          {
            title: "Campaign assets",
            items: [
              "Fifteen edited campaign photographs",
              "Up to three short videos (15–30 seconds) in reel and story formats",
              "Six designed campaign graphics",
              "Advertising creatives sized for your ad platforms",
            ],
          },
          {
            title: "Delivery",
            items: [
              "Platform-optimized exports organized by channel",
              "Two revision rounds across the asset set",
              "Organized handover before your campaign launch",
            ],
          },
        ],
        timeline: "10–15 business days",
        timelineNote:
          "The timeline begins once the deposit has been received and the planning session is complete. We recommend booking three to four weeks before your campaign launch date.",
        paymentTerms: [
          "60% deposit before work begins",
          "40% before final delivery",
        ],
        exclusions: [
          "Paid advertising and media buying",
          "Campaign strategy and media planning",
          "Model, talent, and influencer fees",
          "Landing page design and development",
          "Printing costs",
          "Raw unedited files",
        ],
        addOns: [
          { name: "Additional photographs", price: "From TZS 15,000 per image" },
          { name: "Additional short videos", price: "From TZS 150,000 per video" },
          { name: "Campaign landing page", price: "From TZS 550,000" },
          { name: "Paid campaign management", price: "Quoted on request" },
          { name: "Additional revision round", price: "TZS 100,000" },
        ],
      },
    ],
    faqs: [
      {
        question: "How many revisions are included?",
        answer:
          "Every Content Production package includes two revision rounds — on the monthly batch for Social Media Content, on the edit for video projects, and across the asset set for Campaign Content. Additional rounds are available as an add-on.",
      },
      {
        question: "Who owns the final content?",
        answer:
          "You do. Once the project is fully paid, full commercial usage rights to all final content transfer to you. Momentum retains the right to display the work in its portfolio unless agreed otherwise.",
      },
      {
        question: "Can you film outside Dar es Salaam?",
        answer:
          "Yes. Shoots anywhere in Tanzania can be arranged. Travel, accommodation, and any location fees are quoted separately and agreed before the shoot is scheduled.",
      },
      {
        question: "Do you provide models?",
        answer:
          "Model sourcing and coordination is available as an add-on. Momentum handles the casting and scheduling, while model and talent fees are paid separately based on the agreed talent. Many clients feature their own team and customers, which often feels more authentic.",
      },
      {
        question: "Can you write captions?",
        answer:
          "Yes. Caption writing is included in every Social Media Content month. For photography, video, and campaign projects, captions and supporting copy can be added to the project scope on request.",
      },
      {
        question: "Do you provide raw footage?",
        answer:
          "Projects are delivered as edited, finished content — that is where the production value lies. Raw footage and unedited image handover is available as an add-on, quoted based on the volume of material.",
      },
      {
        question: "Can we request additional content?",
        answer:
          "Yes. Every package supports add-ons such as extra images, additional short videos, more monthly posts, or extended video length. Anything beyond the listed add-ons is quoted on request.",
      },
      {
        question: "Do you also post the content for us?",
        answer:
          "The packages cover content creation and ready-to-publish delivery. Posting and scheduling management is available as a monthly add-on if you would rather not handle publishing in-house.",
      },
      {
        question: "What do you need from us before a shoot?",
        answer:
          "Your brand materials, access to the location, any products or people being featured, and a confirmed shoot date. The planning session covers everything else, including the shot list and schedule.",
      },
      {
        question: "How far in advance should we book?",
        answer:
          "Photography sessions can usually be scheduled within one to two weeks. Video productions need two to three weeks of lead time for planning, and campaign content is best booked three to four weeks before your launch date.",
      },
    ],
  },
];
