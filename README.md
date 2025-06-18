# Cognitarium Frontend

## Description

This is the Nuxt 3 frontend for the [Cognitarium project](https://github.com/Daanisaanwezig/Cogitarium). It provides a user interface for saving, searching, and chatting with ideas using AI. The interface is built using SCSS and follows the BEM (Block Element Modifier) methodology for styling.

Main features:

* Add and view new ideas
* Search existing ideas using vector search
* Chat with your ideas (under development)
* Save chat messages as new ideas (under development)

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v18+)
* A running instance of the [Cognitarium API](https://github.com/Daanisaanwezig/Cogitarium-api)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Daanisaanwezig/Cogitarium
   cd Cognitarium
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

> **Note:** The frontend expects the API to be running locally. The API URL is configured manually in `services/ApiService.ts`.

## Development Notes

* Built with [Nuxt 3](https://nuxt.com/) and SCSS.

* Uses BEM for CSS class naming.

* Follows the [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) methodology for organizing UI components (`atoms`, `molecules`, `organisms`).

* This project is a work in progress. Features like chat and saving ideas from chat are still under development.

## Planned Features

Planned features can be found under issues.

---

## Contributing

Contributions are welcome! Please open issues or pull requests to suggest improvements or fixes.