/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import img from "./ai-human.avif";

const App = () => {
  const [transcript, setTarnscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [information, setInformation] = useState("");
  const [voices, setvoice] = useState([]);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  const loadVoice = () => {
    const allVoice = window.speechSynthesis.getVoices();
    setvoice(allVoice);
  };

  useEffect(() => {
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoice;
    } else {
      loadVoice();
    }
  }, []);

  const startListening = () => {
    recognition.start();
    setIsListening(true);
  };

  recognition.onresult = (event) => {
    const spokenText = event.results[0][0].transcript.toLowerCase();
    setTarnscript(spokenText);
    handleVoiceCommand(spokenText);
  };

  recognition.onend = () => setIsListening(false);

  const speakText = (text) => {
    if (voices.length === 0) {
      console.warn("No voice available yet.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    const maleEnglishVoice =
      voices.find(
        (voice) =>
          voice.lang.startsWith("en-") &&
          voice.name.toLowerCase().includes("male"),
      ) ||
      voices.find((voice) => voice.lang.startsWith("en-")) ||
      voices[0];

    utterance.voice = maleEnglishVoice;
    utterance.lang = maleEnglishVoice.lang || "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceCommand = async (command) => {
    if (command.startsWith("open ")) {
      const site = command.split("open ")[1].trim();

      const sitesMap = {
        youtube: "https://www.youtube.com",
        facebook: "https://www.facebook.com",
        google: "https://www.google.com",
        twitter: "https://www.twitter.com",
        instagram: "https://www.instagram.com",
        linkedin: "https://www.linkedin.com",
        github: "https://github.com",
        chatgpt: "https://chatgpt.com",
        whatsapp: "https://web.whatsapp.com",
        gmail: "https://mail.google.com",
      };

      if (sitesMap[site]) {
        speakText(`Opening ${site}`);
        window.open(sitesMap[site], "_blank");
        setInformation(`Opened ${site}`);
      } else {
        speakText(`I don't know how to open ${site}`);
        setInformation(`Could not find the website for  ${site}`);
      }
      return;
    }

    if (command.includes("how are you")) {
      speakText("I am doing great. Thank you for asking.");
      return;
    }

    if (command.includes("thank you")) {
      speakText("You're welcome Sakshi.");
      return;
    }

    if (command.includes("motivate me")) {
      const quotes = [
        "Believe in yourself and keep moving forward.",
        "Success comes from consistency.",
        "Every expert was once a beginner.",
        "Never stop learning.",
        "Small progress is still progress.",
      ];

      const quote = quotes[Math.floor(Math.random() * quotes.length)];

      speakText(quote);
      setInformation(quote);
      return;
    }

    if (command.includes("tell me a joke")) {
      const jokes = [
        "Why do programmers hate nature? It has too many bugs.",
        "Why did the computer go to the doctor? Because it had a virus.",
        "Why do Java developers wear glasses? Because they don't C sharp.",
      ];

      const joke = jokes[Math.floor(Math.random() * jokes.length)];

      speakText(joke);
      setInformation(joke);
      return;
    }

    if (command.includes("what can you do")) {
      const response =
        "I can open websites, answer questions, search Google, tell jokes, give quotes and provide information.";
      speakText(response);
      setInformation(response);
      return;
    }

    if (command.includes("what day is today")) {
      const day = new Date().toLocaleDateString("en-US", {
        weekday: "long",
      });
      speakText(`Today is ${day}`);
      setInformation(`Today is ${day}`);
      return;
    }

    if (
      command.includes("today's date") ||
      command.includes("what is the date")
    ) {
      const date = new Date().toLocaleDateString();
      speakText(`Today's date is ${date}`);
      setInformation(`Today's date is ${date}`);
      return;
    }

    if (command.includes("what time is it")) {
      const time = new Date().toLocaleTimeString();
      speakText(`Current time is ${time}`);
      setInformation(`Current time is ${time}`);
      return;
    }

    if (command.includes("good night")) {
      speakText("Good night Sakshi. Sweet dreams.");
      return;
    }

    if (command.startsWith("calculate")) {
      const expression = command
        .replace("calculate", "")
        .replace(/plus/g, "+")
        .replace(/minus/g, "-")
        .replace(/times/g, "*")
        .replace(/multiplied by/g, "*")
        .replace(/divided by/g, "/");

      try {
        const result = eval(expression);
        speakText(`The answer is ${result}`);
        setInformation(`Result: ${result}`);
      } catch {
        speakText("Sorry, I could not calculate that.");
      }
      return;
    }

    if (command.includes("tell me a fact")) {
      const facts = [
        "The human brain contains around eighty six billion neurons.",
        "Honey never spoils.",
        "Octopuses have three hearts.",
        "The Eiffel Tower can grow taller in summer.",
        "Bananas are berries but strawberries are not.",
      ];

      const fact = facts[Math.floor(Math.random() * facts.length)];

      speakText(fact);
      setInformation(fact);
      return;
    }

    if (
      command.includes("what are you doing") ||
      command.includes("what are you doing friday")
    ) {
      const response =
        "I am listening to you Sakshi and waiting for your next command.";

      speakText(response);
      setInformation(response);
      return;
    }

    if (command.includes("who created you")) {
      const response = "I was created by Sakshi using React and JavaScript.";

      speakText(response);
      setInformation(response);
      return;
    }

    if (command.includes("do you love me")) {
      const response = "Of course Sakshi, I am always here to help you.";

      speakText(response);
      setInformation(response);
      return;
    }

    if (command.includes("are you real")) {
      const response = "I am a virtual voice assistant, not a real person.";

      speakText(response);
      setInformation(response);
      return;
    }

    if (command.includes("who is your boss")) {
      const response = "My boss is Sakshi, the person who created me.";

      speakText(response);
      setInformation(response);
      return;
    }

    if (command.includes("what is your name")) {
      const response =
        "Hello Sakshi I'm Friday, Your voice assistant created by Web Dev Mastery";
      speakText(response);
      setInformation(response);
      return;
    } else if (command.includes("hello friday")) {
      const response = "Hello Sakshi I'm Friday, How can i help you";
      speakText(response);
      setInformation(response);
      return;
    } else if (command.includes("what is your age")) {
      const response = "Hello Sakshi I'm Friday, I'm 2 day old";
      speakText(response);
      setInformation(response);
      return;
    }

    if (command.includes("tell me a joke")) {
      const joke =
        "Why do programmers prefer dark mode? Because light attracts bugs.";
      speakText(joke);
      setInformation(joke);
      return;
    }

    if (command.includes("motivate me")) {
      const quotes = [
        "Success comes to those who never give up.",
        "Believe in yourself and keep moving forward.",
        "Every day is a new opportunity.",
      ];

      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      speakText(quote);
      setInformation(quote);
      return;
    }

    if (command.includes("calculate")) {
      const expression = command.replace("calculate", "").trim();

      try {
        const result = eval(expression);
        speakText(`The answer is ${result}`);
        setInformation(`Result: ${result}`);
      } catch {
        speakText("Sorry, I could not calculate that.");
      }
      return;
    }

    if (command.includes("good morning")) {
      speakText("Good Morning Sakshi, have a wonderful day.");
      return;
    }

    if (command.includes("good night")) {
      speakText("Good Night Sakshi, sweet dreams.");
      return;
    }

    if (command.includes("what time is it")) {
      const time = new Date().toLocaleTimeString();
      speakText(`Current time is ${time}`);
      setInformation(`Current time is ${time}`);
      return;
    }

    if (command.includes("what is today's date")) {
      const date = new Date().toLocaleDateString();
      speakText(`Today's date is ${date}`);
      setInformation(`Today's date is ${date}`);
      return;
    }

    // List of famous people
    const famousPeople = [
      "bill gates",
      "mark zuckerberg",
      "elon musk",
      "steve jobs",
      "warren buffet",
      "barack obama",
      "jeff bezos",
      "sundar pichai",
      "mukesh ambani",
      "virat kohli",
      "sachin tendulkar",
      "brian lara",
    ];

    if (famousPeople.some((person) => command.includes(person))) {
      const person = famousPeople.find((person) => command.includes(person));
      const personData = await fetchPersonData(person);

      if (personData) {
        const infoText = `${personData.name}, ${personData.extract}`;
        setInformation(infoText);
        speakText(infoText);

        performGoogleSeach(command);
      } else {
        const fallbackMessage = "I couldn't find detailed information";

        speakText(fallbackMessage);
        performGoogleSeach(command);
      }
    } else {
      const fallbackMessage = `Here is the information about ${command}`;

      speakText(fallbackMessage);
      performGoogleSeach(command);
    }
  };

  const fetchPersonData = async (person) => {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      person,
    )}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.title && data.extract) {
        return {
          name: data.title,
          extract: data.extract.split(".")[0],
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error("error");
      return null;
    }
  };

  const performGoogleSeach = (query) => {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    window.open(searchUrl, "_blank");
  };

  return (
    <div>
      <div className="voice-assistant">
        <img src={img} alt="AI" className="ai-image" />
        <h2>Voice Assistant (Friday)</h2>

        <button className="btn" onClick={startListening} disabled={isListening}>
          <i className="fas fa-microphone"></i>
          {isListening ? "Listening..." : "Start Listening"}
        </button>
        <p className="tarnscript">{transcript}</p>
        <p className="information">{information}</p>
      </div>
    </div>
  );
};

export default App;
