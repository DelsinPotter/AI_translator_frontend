import { useState } from "react";

const API_URL = "https://ai-translator-production.up.railway.app";
const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "tr", name: "Turkish" },
];

export default function TranslatorApp() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [inputLang, setInputLang] = useState("en");
  const [outputLang, setOutputLang] = useState("es");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("text", text);
      formData.append("input_lang_code", inputLang);
      formData.append("output_lang_code", outputLang);

      const response = await fetch(`${API_URL}/translate/`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setTranslatedText(data.translated_text);
      setAudioFile(data.audio_file);
    } catch (error) {
      console.error("Translation error:", error);
    }
    setLoading(false);
  };

  const handleSpeak = () => {
    if (audioFile) {
        const audioUrl = `${API_URL}/audio/${audioFile}`;
        const audio = new Audio(audioUrl);
        audio.play().catch(error => console.error("Error playing audio:", error));
    } else {
        console.error("No audio file available.");
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        console.error("Speech recognition is not supported in this browser.");
        alert("Your browser does not support Speech Recognition. Please try Chrome.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log("Recognized speech:", transcript);
        setText(transcript);
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
    };

    recognition.start();
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4 max-w-md mx-auto w-full">
      <h1 className="text-2xl font-bold">AI Translator</h1>
      <textarea
        placeholder="Speak or type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded-lg h-48"
      />
      <button onClick={startListening} className="w-full p-2 bg-blue-500 text-white rounded-lg">
        {isListening ? "Listening..." : "Start Speech Recognition"}
      </button>
      <div className="flex w-full justify-between space-x-2">
        <select onChange={(e) => setInputLang(e.target.value)} value={inputLang} className="p-2 border rounded-lg w-1/2">
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>{lang.name}</option>
          ))}
        </select>
        <select onChange={(e) => setOutputLang(e.target.value)} value={outputLang} className="p-2 border rounded-lg w-1/2">
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>{lang.name}</option>
          ))}
        </select>
      </div>
      <button onClick={handleTranslate} disabled={loading} className="w-full p-2 bg-green-500 text-white rounded-lg">
        {loading ? "Translating..." : "Translate"}
      </button>
      {translatedText && (
        <div className="w-full p-4 border rounded-lg bg-gray-100">
          <p className="text-lg">{translatedText}</p>
        </div>
      )}
      {audioFile && (
        <button onClick={handleSpeak} className="w-full p-2 bg-purple-500 text-white rounded-lg">Play Translation</button>
      )}
    </div>
  );
}
