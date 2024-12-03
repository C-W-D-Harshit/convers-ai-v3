# ConvoMate

ConvoMate is a modern conversational chatbot that combines real-time chat capabilities with AI-powered image generation. Built using **Next.js 15**, **TypeScript**, and **ShadCN**, it leverages the **Vercel AI SDK**, **OpenAI**, and **OpenRouter** to provide an engaging and intuitive user experience.

## Features

- **Real-Time Conversations**: Powered by OpenAI models for responsive and accurate replies.
- **AI Image Generation**: Generate stunning images from simple prompts.
- **User Privacy**: Ensures all interactions and data remain secure.
- **Modern Tech Stack**: Developed with Next.js 15, TypeScript, and ShadCN for scalability and performance.

## Tech Stack

- **Frontend**: Next.js 15, ShadCN, Tailwind CSS
- **Backend**: Vercel AI SDK, OpenAI, OpenRouter
- **Programming Language**: TypeScript

## Installation Instructions

To set up ConvoMate on your local machine, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/c-w-d-harshit/convomate.git
   cd convomate
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:

   - Create a `.env` file in the root directory of the project.
   - Copy the contents of `.env.example` into `.env` and fill in the required values:

   ```plaintext
   OPENAI_API_KEY=your_openai_api_key
   SYSTEM_MESSAGE=your_system_message
   ```

4. **Run the Development Server**:

   ```bash
   npm run dev
   ```

5. **Open Your Browser**:
   - Navigate to `http://localhost:3000` to see the application in action.

You should now have ConvoMate running locally on your machine.
