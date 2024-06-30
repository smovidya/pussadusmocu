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

## License

This project is licensed under the MIT License. See the LICENSE file for details.
