# 💼💼 Job Board App

## 📌 About
A job posting application built with **Next.js**, **Prisma**, and **PostgreSQL**.  
Created while following a Prisma crash course, it focuses on **schema modeling, CRUD operations, relational data handling**, and **GitHub OAuth authentication with NextAuth**, resulting in a fully functional job board where users can **browse, post, apply to, and track jobs**.

---

## ⚙️ Tech Stack
- **Frontend:** Next.js (React)
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Authentication:** NextAuth (GitHub OAuth)

---

## 🧩 Features
- 🔐 GitHub OAuth user authentication  
- 📝 Post, browse, and view jobs  
- 📥 Apply to jobs and track applications  
- 📂 Relational schema (users, jobs, applications)  
- ⚡ CRUD operations with Prisma Client  
- 💾 Data seeding for development/testing  
- 📈 Prisma migrations and type-safe queries  

---

## 🛠 Setup & Installation
```bash
# 1. Clone the repository
git clone <repo-url>
cd <repo-folder>

# 2. Install dependencies
npm install

# 3. Configure environment variables
# Create a .env file in the root folder
# and add the following:

# .env
DATABASE_URL="your_postgres_connection_string"
GITHUB_ID="your_github_client_id"
GITHUB_SECRET="your_github_client_secret"
NEXTAUTH_SECRET="your_nextauth_secret"

# 4. Run Prisma migrations and seed
npx prisma migrate dev
npx prisma db seed

# 5. Start the development server
npm run dev
