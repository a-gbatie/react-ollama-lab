import { useState } from "react";
import Ollama from "ollama";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function OllamaChat() {
  // TODO: Add state for input, messages, loading, and error.
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAsk = async () => {
    // TODO: Prevent empty submissions and duplicate submissions while loading.
    // TODO: Create a user message object.
    // TODO: Add the user message to the message thread.
    // TODO: Clear the input, reset errors, and turn loading on.
    // TODO: Call Ollama.chat with model "llama3.2" and the updated message history.
    // TODO: Add the assistant response to the message thread.
    // TODO: Show a helpful error if the request fails.
    // TODO: Turn loading off after success or failure.

    const prompt = input.trim();

    if (!prompt || loading) {
      return;
    }

    const userMessage = { role: "user", content: prompt };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const response = await Ollama.chat({
        model: "llama3.2",
        messages: updatedMessages,
      });

      setMessages((prevMessages) => [...prevMessages, response.message]);
    } catch (err) {
      setError("Failed to get response from Ollama. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const clearChat = () => {
    // TODO: Clear messages, input, and error.
    setMessages([]);
    setInput("");
    setError(null);
  };
    
  return (
    <section className="chat-shell">
      <div className="chat-card">
        <header className="chat-header">
          <h1>HR Help Assistant</h1>
          <p>
            Build a local AI chatbot prototype that helps employees ask general
            HR questions.
          </p>
        </header>

        <p className="chat-guidance">
          Ask about general HR topics such as benefits, time off, policies, or
          workplace procedures. Do not enter private, sensitive, or personal
          information.
        </p>

        <div className="chat-input-area">
          <label htmlFor="chat-prompt" className="sr-only">
            Ask the HR assistant
          </label>
          {/* TODO: Set up textarea */}
          <textarea
            id="chat-prompt"
            rows="5"
            className="chat-textarea"
            placeholder="Ask about benefits, PTO, or workplace policies..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* TODO: Configure buttons */}
        <div className="chat-actions">
          <button
            className="chat-button"
            disabled={!input.trim() || loading}
            onClick={handleAsk}
          >
            Send
          </button>
          <button
            className="chat-button chat-button-secondary"
            onClick={clearChat}
            disabled={messages.length === 0 || loading}
          >
            Clear thread
          </button>
        </div>

        <div className="message-list" aria-label="Conversation thread">
          {messages.map((message, idx) => (
            <article key={idx} className="chat-message">
              <strong>{message.role === "user" ? "You" : "Assistant"}</strong>
              <div className="message-content">
                {message.role === "assistant" ? (
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                ) : (
                  <p>{message.content}</p>
                )}
              </div>
            </article>
          ))}
          {/* TODO: Render a temporary Assistant / Thinking... message while loading. */}
          {loading && <p>Assistant: Thinking...</p>}
        </div>
        {error && (
          <p role="alert" className="chat-error">
            {error}
          </p>
        )}
      </div>
    </section>
  );
};
