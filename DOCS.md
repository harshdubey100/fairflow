# FairFlow AI Documentation

FairFlow integrates a modern, premium AI assistant powered by **Hugging Face Inference API**. This document explains the architecture, setup, and customization of the chatbot functionality.

## 🚀 Features

- **Floating Widget UI**: A non-intrusive, togglable chat interface that lives in the bottom-right corner of the application.
- **Hugging Face Powered**: Uses state-of-the-art LLMs (defaulting to `Mistral-7B-Instruct-v0.2`) for intelligent responses.
- **Context-Aware Styling**: Automatically matches the FairFlow design tokens (colors, typography, and spacing).
- **Markdown Support**: Supports rendering rich text, code blocks, and formatted lists in AI replies.
- **Animated Interactions**: Smooth transitions using `framer-motion` for a premium feel.

## 🛠️ Technical Stack

- **Framework**: React 19
- **AI Library**: `@huggingface/inference`
- **Icons**: `lucide-react`
- **Animations**: `framer-motion`
- **Text Rendering**: `react-markdown`

## ⚙️ Configuration & Setup

### 1. API Token
The chatbot requires a Hugging Face API token. 

1. Generate a token at [hf.co/settings/tokens](https://huggingface.co/settings/tokens).
2. Create a `.env` file in the root directory.
3. Add your token:
   ```env
   REACT_APP_HF_TOKEN=hf_your_token_here
   ```

### 2. Model Customization
The assistant currently uses `mistralai/Mistral-7B-Instruct-v0.2`. You can change this in `src/components/shared/ChatBot.js`:

```javascript
const response = await hf.chatCompletion({
  model: "mistralai/Mistral-7B-Instruct-v0.2", // Replace with your desired HF model
  messages: [ ... ],
  max_tokens: 500,
});
```

## 📂 File Structure

- `src/components/shared/ChatBot.js`: The main component containing the UI logic and API integration.
- `src/App.js`: Integrated the component at the root level for global availability.
- `.env`: (User Created) Stores the sensitive API token.

## 💡 Usage in Development

1. Ensure all dependencies are installed:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```

## 🔒 Security Note
Ensure that your `.env` file is added to `.gitignore` to prevent leaking your Hugging Face API token in version control.
