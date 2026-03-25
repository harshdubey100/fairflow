# FairFlow Premium Dashboard

FairFlow is a sophisticated React-powered dashboard designed for employee fairness, task management, and reward systems. It features a modern, aesthetic UI with built-in AI support.

## ✨ Features

- **Employee & Admin Modes**: Seamlessly switch between different user perspectives.
- **Dynamic Task Tracking**: Comprehensive ticket browsing and creation.
- **Interactive Rewards System**: Engaging gamification elements.
- **AI-Powered Assistant**: A state-of-the-art floating chatbot using Hugging Face Inference API.
- **Premium Aesthetics**: High-quality design with smooth animations, custom icons, and a tailored color palette.

## 🤖 AI Capabilities

The FairFlow AI assistant is built directly into the dashboard, providing real-time support and information using **Mistral-7B-Instruct** (via Hugging Face).

To set up the AI:
1. Create a `.env` file in the root directory.
2. Add your Hugging Face API token: `REACT_APP_HF_TOKEN=hf_your_token_here`

For more detailed AI setup instructions, see [DOCS.md](./DOCS.md).

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Hugging Face API Token (optional but recommended for AI features)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd fairflow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (optional):
   ```bash
   cp .env.example .env
   # Edit .env with your HF token
   ```

4. Run the development server:
   ```bash
   npm start
   ```

### Scripts

- `npm start`: Runs the app in development mode at [http://localhost:3000](http://localhost:3000).
- `npm run build`: Builds the production-ready bundle.
- `npm test`: Executes the test suite.

## 🛠️ Technology Stack

- **Frontend**: React 19, Framer Motion
- **Icons**: Lucide React
- **AI Integration**: Hugging Face Inference API
- **Styling**: Vanilla CSS with custom tokens

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
