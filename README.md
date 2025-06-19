# Pussadusmocu

Pussadusmocu is a parcel borrowing project for the Faculty of Science at Chulalongkorn University. It allows users to borrow parcels and provides an admin interface for managing parcel stock and approving borrowing requests. The project is written in TypeScript and follows a monolith architecture using Next.js and tRPC.

![Contribute](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)

## Table of Contents

- [Pussadusmocu](#pussadusmocu)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)
  - [Todo](#todo)
  - [License](#license)

## Features

- **User Interface**: Allows users to browse and borrow parcels.
- **Admin Interface**: Allows admins to approve borrowing requests and manage parcel stock (CRUD operations).
- **TypeScript**: Written entirely in TypeScript for better type safety and developer experience.
- **Monolith Architecture**: Uses a monolithic architecture for simplicity and ease of deployment.
- **Next.js**: Utilizes Next.js for server-side rendering and a seamless development experience.
- **tRPC**: Uses tRPC for typesafe API calls between the client and server.
- **MySQL**: Use mysql for storing all data as a monolith architecture

## Project Structure

```plaintext
pussadusmocu
├── .dockerignore              # Specifies files and directories to be ignored by Docker
├── .env                       # Environment variables for local development
├── .env.example               # Example environment variables file for reference
├── .eslintrc.cjs              # ESLint configuration file (CommonJS)
├── .eslintrc.json             # ESLint configuration file (JSON)
├── .gitignore                 # Specifies files and directories to be ignored by Git
├── .husky                     # Directory for Husky Git hooks
│   ├── _
│   │   ├── .gitignore
│   │   ├── applypatch-msg
│   │   ├── commit-msg
│   │   ├── h
│   │   ├── husky.sh
│   │   ├── post-applypatch
│   │   ├── post-checkout
│   │   ├── post-commit
│   │   ├── post-merge
│   │   ├── post-rewrite
│   │   ├── pre-applypatch
│   │   ├── pre-auto-gc
│   │   ├── pre-commit
│   │   ├── pre-push
│   │   ├── pre-rebase
│   │   └── prepare-commit-msg
│   └── pre-commit
├── Dockerfile                 # Dockerfile for building the Docker image
├── LICENSE                    # License file
├── README.md                  # Project documentation
├── bun.sh                     # Bun runtime configuration script
├── components.json            # Configuration for components
├── db
│   └── init.sql               # Initial SQL script for database setup
├── docker-compose.yml         # Docker Compose configuration
├── next-env.d.ts              # TypeScript environment configuration for Next.js
├── next.config.js             # Next.js configuration file
├── package.json               # NPM package configuration
├── pnpm-lock.yaml             # Lock file for PNPM package manager
├── postcss.config.cjs         # PostCSS configuration file (CommonJS)
├── prettier.config.js         # Prettier configuration file
├── prisma
│   └── schema.prisma          # Prisma schema definition
├── project_structure.text     # Description of the project structure
├── public                     # Public assets directory
│   ├── favicon.ico            # Favicon for the website
│   └── picture
│       ├── logoSmo.svg        # Logo image in SVG format
│       └── yellowBox.svg      # Yellow box image in SVG format
├── src                        # Source code directory
│   ├── __tests__              # Directory for test files
│   │   ├── function.test.ts
│   │   └── login.test.tsx
│   ├── app                    # Application-specific code
│   │   ├── ReduxProvider.tsx  # Redux provider setup
│   │   │   ├── ProjectsBlog.tsx
│   │   │   ├── parcels
│   │   │   │   ├── Parcel.admin.tsx
│   │   │   │   ├── Parcel.user.tsx
│   │   │   │   ├── Shipping.tsx
│   │   │   │   └── create-parcel.tsx
│   │   │   ├── popCard.tsx
│   │   │   ├── shared
│   │   │   │   ├── AgreementDialog.tsx
│   │   │   │   ├── Datepicker.tsx
│   │   │   │   ├── combobox
│   │   │   │   │   ├── department.tsx
│   │   │   │   │   ├── group.tsx
│   │   │   │   │   ├── project.tsx
│   │   │   │   │   └── type.tsx
│   │   │   │   ├── dropdown
│   │   │   │   │   ├── GroupDropdown.tsx
│   │   │   │   │   ├── ProjectDropdown.tsx
│   │   │   │   │   ├── StatusDropdown.tsx
│   │   │   │   │   └── TypeDropdown.tsx
│   │   │   │   ├── nav
│   │   │   │   │   ├── NavbarAdmin.tsx
│   │   │   │   │   └── NavbarUser.tsx
│   │   │   │   └── statusbox.tsx
│   │   ├── admin              # Admin-specific pages
│   │   │   ├── home
│   │   │   │   ├── page.tsx
│   │   │   │   └── parcels.tsx
│   │   │   ├── status
│   │   │   │   ├── bokking_status.tsx
│   │   │   │   └── page.tsx
│   │   ├── api                # API routes
│   │   │   ├── auth
│   │   │   │   └── route.ts
│   │   │   ├── logout
│   │   │   │   └── route.ts
│   │   │   └── trpc
│   │   │       └── [trpc]
│   │   │           └── route.ts
│   │   ├── layout.tsx         # Main layout component
│   │   ├── login
│   │   │   └── page.tsx
│   │   ├── page.tsx           # Main page component
│   │   ├── users              # User-specific pages
│   │   │   ├── cart
│   │   │   │   └── page.tsx
│   │   │   ├── home
│   │   │   │   └── page.tsx
│   │   │   ├── profile
│   │   │   │   └── page.tsx
│   │   │   └── shipping
│   │   │       └── [id]
│   │   │           └── page.tsx
│   ├── components             # Reusable UI components
│   │   └── ui
│   │       ├── alert-dialog.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── command.tsx
│   │       ├── dialog.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── popover.tsx
│   │       ├── table.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       └── use-toast.ts
│   ├── env.js                 # Environment variables handling
│   ├── lib
│   │   └── utils.ts           # Utility functions
│   |   ├── constant.ts        # Constant values
│   |   └── function.ts        # Helper functions
│   ├── middleware.ts          # Middleware setup
│   ├── server
│   │   ├── api
│   │   │   ├── root.ts
│   │   │   └── routers
│   │   │       ├── auth.ts
│   │   │       ├── parcel.ts
│   │   │       ├── parcel_Project.ts
│   │   │       └── project.ts
│   │   ├── db.ts              # Database connection setup
│   ├── stores                 # Redux store setup
│   │   ├── slices
│   │   │   ├── datepicker.ts
│   │   │   ├── department.ts
│   │   │   ├── group.ts
│   │   │   ├── project.ts
│   │   │   ├── search.ts
│   │   │   └── type.ts
│   │   └── store.ts
│   ├── styles
│   │   └── globals.css        # Global CSS styles
│   ├── trpc
│   │   ├── react.tsx
│   │   └── server.ts
├── start-database.sh          # Script to start the database
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── vitest.config.ts           # Vitest configuration file
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature-name).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/your-feature-name).
5. Create a new Pull Request.

## Todo

- [x] ~~เพิ่มชื่อรายการเวลาชี้ไปที่ไอคอนต่าง ๆ บนแถบด้านบนของเว็บไซต์~~
- [x] ~~ลบไอคอนรูปคนในแถบบนของเว็บไซต์ที่ยังไม่ได้ใส่ข้อมูลออกก่อน เนื่องจากป้องกันการสับสน แล้วค่อยใส่ไอคอนกลับเข้าไปในกรณีที่สามารถวางระบบได้แล้ว~~
- [x] ~~เพิ่มระบบการกดออกจากระบบ~~
- [x] ~~เพิ่มคำอธิบายไอคอนต่าง ๆ~~
- [x] ~~แก้ไขไอคอนรูปกล่องพัสดุตรงแถบบนซ้ายของเว็บไซต์ เนื่องจากบางครั้งสามารถกดได้ บางครั้งไม่สามารถกดได้~~
- [ ] อยากให้เพิ่มกรณีคนที่ไม่ได้ทำโครงสามารถกดเข้ามาดูพัสดุได้
- [x] ~~ในกรณีที่พัสดุรายการนั้น ๆ ถูกยืมไปแล้วจำนวนเหลือ 0 อยากให้พัสดุรายการนั้น ๆ ยังปรากฎอยู่ในหน้าหลัก (แต่ให้ขึ้นจำนวนว่าเหลือ 0) เผื่อคนอื่น ๆ สามารถวางแผนการใช้งานต่อ~~
- [x] ~~แก้การกดแก้ไขวันที่ในการยืม-คืน สำหรับคนที่ใช้งานระบบ IOS~~
- [ ] เพิ่มไอคอนระเบียบการยืม-คืนพัสดุ ที่แถบดานบนของเว็บไซต์ (ค่อยเพิ่มในกรณีที่โอ๊ตทำเอกสารประกาศระเบียบการยืม-คืนเสร็จแล้ว)
- [x] ~~หลังจากกดยืมแล้ว อยากให้ขึ้นคำว่าเสร็จสิ้นหรือเป็นการเด้งออกจากรายการพพัสดุนั้น ๆ เผื่อไม่ให้เกิดความเข้าใจผิด~~
- [ ] เพิ่มการกดยกเลิกพัสดุได้ เพราะในกรณีที่ผู้ยืมกดยืมผิดหรืออยากมีการเปลี่ยนแปลงจำนวน จะได้สามารถเปลี่ยนแปลงได้
- [x] ~~ขึ้นเวลาในการกรอกพัสดุ~~
- [ ] แก้ไขวันสุดท้ายของการยืมพัสดุ
- [ ] แก้ไขปุ่มกดได้รับพัสดุเรียบร้อยแล้ว **ให้แค่กดรับได้เฉพาะวันที่กำหนด**

## License

This project is licensed under the MIT License. See the LICENSE file for details.
