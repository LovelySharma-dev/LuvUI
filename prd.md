# LuvUI — Product Requirements Document

**Version:** 1.0 (MVP)

---

## Vision

LuvUI is an AI-powered React UI platform that combines a production-ready component library with AI-generated custom components. Developers can install professionally built React components via NPM and generate new ones using natural language prompts — reducing UI development time without sacrificing code quality.

---

## Problem Statement

| Problem | Description |
|---|---|
| Existing libraries fall short | Rarely contain the exact component a developer needs |
| AI generators are inconsistent | Produce low-quality UI that doesn't match existing design systems |

**LuvUI solves both** by providing a curated React component library, AI-powered component generation, and a unified developer experience.

---

## Product Goals

- Build a reusable React UI library
- Generate React UI using AI
- Monetize AI generation through credits
- Deliver production-ready React components
- Build a complete SaaS product

---

## Target Users

**Frontend Developers** — React developers, freelancers, startup founders, students, indie hackers

---

## Core Value Proposition

> Install production-ready components instantly or generate custom React components with AI.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, React Router, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + HTTP-only Cookies |
| AI | OpenRouter API |
| Payments | Razorpay |
| Deploy (Frontend) | Vercel |
| Deploy (Backend) | Render / Railway |
| Deploy (DB) | MongoDB Atlas |

---

## Product Modules

### 1. Authentication
- Register, Login, Logout
- JWT Authentication + HTTP-only Cookies
- Protected Routes
- _Future: Google Login_

### 2. User Module
- User Profile & Avatar
- Credits Balance
- Last Login tracking

### 3. Component Library
Developers can browse, search, and filter components; view previews; copy code; and install via NPM.

```bash
npm install luvui
```

### 4. AI Studio
Users enter a natural language prompt to generate, preview, copy, download, and save React components.

**Example prompt:**
> Create a glassmorphism pricing section using Tailwind CSS.

### 5. AI History
Each generation stores: prompt, generated code, AI model, credits used, and timestamp.

Users can view, copy, and delete past generations.

### 6. Payments
- Buy credits via Razorpay
- View payment history
- View remaining credits balance

---

## Monetization

| Plan | Credits |
|---|---|
| Free | 5 credits on signup |
| Starter | 100 credits / month |
| Pro | 300 credits / month |
| Power | 1,000 credits / month |

> Credits are deducted only after a successful AI generation.

---

## Database Schema

### User
| Field | Type |
|---|---|
| fullName | String |
| email | String |
| password | String (hashed) |
| avatar | String |
| role | String |
| credits | Number |
| isVerified | Boolean |
| lastLogin | Date |
| createdAt / updatedAt | Date |

### Component
| Field | Type |
|---|---|
| name | String |
| category | String |
| description | String |
| previewImage | String |
| installation | String |
| code | String |
| tags | Array |
| isPublished | Boolean |

### Generation
| Field | Type |
|---|---|
| userId | ObjectId |
| prompt | String |
| generatedCode | String |
| model | String |
| creditsUsed | Number |
| createdAt | Date |

### Payment
| Field | Type |
|---|---|
| userId | ObjectId |
| amount | Number |
| creditsPurchased | Number |
| paymentId | String |
| orderId | String |
| status | String |
| createdAt | Date |

---

## User Journeys

**Registration**
```
Signup → JWT Generated → Dashboard
```

**Component Library**
```
Dashboard → Browse Components → Install → Use in project
```

**AI Generation**
```
Dashboard → Enter Prompt → Generate → Preview → Copy → Paste into project
```

**Payment**
```
Dashboard → Buy Credits → Razorpay → Payment Verification → Credits Added → Continue Generating
```

---

## Backend Architecture

```
src/
├── config/
├── middlewares/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── components/
│   ├── generations/
│   ├── payments/
│   └── ai/
├── app.js
└── server.js
```

---

## API Endpoints

### Authentication
| Method | Route | Description |
|---|---|---|
| POST | `/signup` | Create account |
| POST | `/login` | Issue JWT |
| POST | `/logout` | Clear session |
| GET | `/me` | Current user |

### Users
| Method | Route | Description |
|---|---|---|
| PUT | `/profile` | Update profile |

### Components
| Method | Route | Description |
|---|---|---|
| GET | `/components` | List all components |
| GET | `/components/:id` | Single component |

### AI
| Method | Route | Description |
|---|---|---|
| POST | `/generate` | Generate component (costs credit) |
| GET | `/history` | View generation history |
| DELETE | `/history/:id` | Delete a generation |

### Payments
| Method | Route | Description |
|---|---|---|
| POST | `/create-order` | Create Razorpay order |
| POST | `/verify-payment` | Webhook verification |
| GET | `/payments` | Payment history |

---

## Security

- JWT Authentication
- HTTP-only Cookies
- Password hashing (bcrypt)
- CORS protection
- Environment variables
- Protected routes
- Input validation

---

## Frontend Pages

| Page | Description |
|---|---|
| Landing | Marketing homepage |
| Pricing | Credit plans |
| Component Library | Browse & install components |
| AI Studio | Prompt-to-component generator |
| History | Past AI generations |
| Dashboard | User overview |
| Profile | Account settings |
| Auth | Login / Register |
| 404 | Not found |

---

## MVP Scope

- [x] Authentication
- [x] User system
- [x] React UI library
- [x] AI generation
- [x] Credits system
- [x] Razorpay payments
- [x] Generation history
- [x] Dashboard

---

## Out of Scope (Future Versions)

- GitHub Login
- Component Collections
- Publish user components to NPM
- Team Workspaces
- Favorites & Comments
- Dark/Light Theme Marketplace
- CLI Tool
- VS Code Extension
- Figma Plugin
- AI Design-to-Code

---

## Roadmap

| Phase | Focus | Key Deliverables |
|---|---|---|
| 1 | Backend foundation | Auth, MongoDB, JWT |
| 2 | Component library | Component API, search, categories |
| 3 | AI integration | OpenRouter, credits, generation history |
| 4 | Payments | Razorpay, credit purchase, webhook |
| 5 | Frontend | Dashboard, AI Studio, library UI, profile |
| 6 | Deployment | MongoDB Atlas, backend + frontend deploy |

---

## Success Metrics

- User registrations
- Successful AI generations
- Credits purchased
- Component installs
- Returning users
- AI response time
- Payment success rate

---

## Mission

> Empower React developers to build interfaces faster by combining a curated UI library with AI-generated components in one seamless developer platform.