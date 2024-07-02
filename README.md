# Pussadusmocu

Pussadusmocu is a parcel borrowing project for the Faculty of Science at Chulalongkorn University. It allows users to borrow parcels and provides an admin interface for managing parcel stock and approving borrowing requests. The project is written in TypeScript and follows a monolith architecture using Next.js and tRPC.

![Contribute](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)

## Table of Contents

- [Pussadusmocu](#pussadusmocu)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)
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
pussadusmocu/
├── public/                  # Static files
│   └── ...
├── src/
│   ├── components/          # React components
│   │   └── ...
│   ├── app/               # Next.js pages
│   │   ├── api/             # API routes
│   │   │   └── ...
│   │   ├── page.tsx         # Custom App component
│   │   ├── index.tsx        # Home page
│   │   ├── admin/           # Admin pages
│   │   │   └── ...
│   │   └── user/            # User pages
│   │       └── ...
│   ├── server/              # tRPC server configuration
│   │   └── ...
│   ├── styles/              # Global and component-specific styles
│   │   └── ...
│   ├── utils/               # Utility functions and types
│   │   └── ...
│   └── ...
├── .eslintrc.js             # ESLint configuration
├── .gitignore               # Git ignore file
├── next.config.js           # Next.js configuration
├── package.json             # NPM package configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project README file
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
- [ ] แก้ไขปุ่มกดได้รับพัสดุเรียบร้อยแล้ว

## License

This project is licensed under the MIT License. See the LICENSE file for details.
