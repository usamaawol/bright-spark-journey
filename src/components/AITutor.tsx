import * as React from "react";
import { Send, Bot, User, Sparkles, X, Minimize2, Maximize2, RotateCcw, Mic, MicOff, Volume2, VolumeX, BookOpen, FileText, GraduationCap, ChevronDown, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

type Level = "Beginner" | "Intermediate" | "Advanced";
type Lesson = "Pronunciation" | "Grammar" | "Vocabulary" | "Daily Communication" | "Idioms" | "General";
type Mode = "Chat" | "Exam";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const LESSONS: Lesson[] = ["Pronunciation", "Grammar", "Vocabulary", "Daily Communication", "Idioms"];

// Super friendly AI responses like talking to a friend!
const getAIResponse = (
  message: string,
  level: Level,
  lesson: Lesson,
  mode: Mode,
  history: { role: string; content: string }[],
  questionIndex?: number
): Message & { nextQuestion?: string } => {
  const lowerMsg = message.toLowerCase();
  
  // Exam mode logic but more friendly
  if (mode === "Exam") {
    const questions = {
      Pronunciation: [
        "Let's practice! Can you say this word: 'HELLO'? 😊",
        "Nice! Now try this phrase: 'HOW ARE YOU TODAY?'",
        "Great! One more: 'NICE TO MEET YOU!' 🎉"
      ],
      Grammar: [
        "Let's try! Complete this sentence: I ___ (eat / eats) apples every day.",
        "Perfect! Next one: She ___ (like / likes) pizza.",
        "Excellent! Try this: We ___ (is / are) friends!"
      ],
      Vocabulary: [
        "What's this? 🍎 (A) Apple (B) Banana",
        "Cool! What's the opposite of 'big'? (A) Small (B) Tall",
        "Awesome! What do we drink? (A) Water (B) Bread"
      ],
      "Daily Communication": [
        "What do you say when you wake up? (A) Good morning! (B) Good night!",
        "Nice! What do you say when you're sorry? (A) Thank you! (B) I'm sorry!",
        "Great! What do you say when someone helps you? (A) Please! (B) Thank you!"
      ],
      Idioms: [
        "What does 'Break a leg' mean? It means... (A) Good luck! (B) Ouch, my leg!",
        "Cool! What does 'Piece of cake' mean? (A) Very easy! (B) Yummy cake!",
        "Nice! 'I'm over the moon' means... (A) I'm very happy! (B) I'm on the moon!"
      ]
    };

    const selectedQuestions = questions[lesson as keyof typeof questions] || questions.Grammar;
    
    if (questionIndex === undefined || questionIndex === 0) {
      return {
        role: "assistant",
        content: `Hey! Let's do a quick fun practice for ${lesson}! 🚀\n\n${selectedQuestions[0]}`,
        timestamp: new Date(),
        nextQuestion: selectedQuestions[0]
      };
    }

    const currentQIndex = questionIndex || 0;
    const nextQIndex = currentQIndex + 1;

    if (nextQIndex >= selectedQuestions.length) {
      return {
        role: "assistant",
        content: `Wow, you did AWESOME! 🌟 You're getting so good at ${lesson}! Want to chat more or try another practice?`,
        timestamp: new Date()
      };
    }

    return {
      role: "assistant",
      content: `Perfect! You're doing great! Here's the next one:\n\n${selectedQuestions[nextQIndex]}`,
      timestamp: new Date(),
      nextQuestion: selectedQuestions[nextQIndex]
    };
  }

  // Super friendly, simple chat mode!
  let responseText = "";

  // Lesson specific responses
  if (lesson === "Pronunciation") {
    if (lowerMsg.includes("how") && lowerMsg.includes("pronounce")) {
      responseText = `Ooh, great question! What word do you want to practice saying? I'll say it slowly first! 😊`;
    } else {
      responseText = `Okay, pronunciation practice time! 🎤 Try saying a sentence, and I'll help you say it perfectly! What do you want to say?`;
    }
  } else if (lesson === "Grammar") {
    if (lowerMsg.includes("what is") || lowerMsg.includes("difference between")) {
      responseText = `Let's figure that out together! Can you give me a small example so I can explain it simply?`;
    } else {
      responseText = `Grammar time! 📚 Try making a sentence about your day, and I'll check it gently! What did you do today?`;
    }
  } else if (lesson === "Vocabulary") {
    responseText = `Yay, new words! 📝 What do you want to talk about? Food? Hobbies? School? Let's learn fun words together!`;
  } else if (lesson === "Daily Communication") {
    responseText = `Let's chat like real life! 😃 What do you want to practice? Greeting a friend? Ordering juice? Let's do it!`;
  } else if (lesson === "Idioms") {
    responseText = `Idioms are so fun! 🎉 Want to learn some cool ones, or practice using them in silly sentences?`;
  } else {
    // General chat - super friendly!
    if (lowerMsg.includes("academy") || lowerMsg.includes("bright spark")) {
      responseText = "Bright Spark Academy is such a cool place! We learn English by speaking a lot, making mistakes, and having fun! 😊";
    } else if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("hey")) {
      responseText = level === "Beginner" 
        ? `Hi there! I'm Sparky! I'm so excited to practice English with you! How are you feeling today? Happy? Tired? 😊` 
        : level === "Intermediate" 
          ? `Hey, nice to chat! How's your English going this week? Is anything tricky or easy for you?` 
          : `Hey! Let's have a great English conversation! What's something fun you did lately?`;
    } else if (lowerMsg.includes("how are you")) {
      responseText = "I'm doing great, thanks for asking! How about you? What's your day been like? 😄";
    } else if (lowerMsg.includes("good") || lowerMsg.includes("great") || lowerMsg.includes("nice")) {
      responseText = "That's wonderful to hear! 🌟 Tell me more about what made it good!";
    } else if (lowerMsg.includes("sad") || lowerMsg.includes("bad") || lowerMsg.includes("tired")) {
      responseText = "Aww, I'm sorry you're feeling that way. But you know what? Practicing English can be a fun distraction! Wanna chat about something simple to cheer you up? 💛";
    } else if (lowerMsg.includes("thank")) {
      responseText = "You're very welcome! Anytime! 😊 What should we talk about next?";
    } else {
      responseText = "Wow, that's so interesting! Tell me more! 😃 I love hearing about your life!";
    }
  }

  return {
    role: "assistant",
    content: responseText,
    timestamp: new Date()
  };
};

export function AITutor({ userLevel = "Beginner", studentName = "Student" }: { userLevel?: string, studentName?: string }) {
  const [level, setLevel] = React.useState<Level>(userLevel as Level);
  const [activeLesson, setActiveLesson] = React.useState<Lesson>("General");
  const [mode, setMode] = React.useState<Mode>("Chat");
  const [questionIndex, setQuestionIndex] = React.useState<number>(0);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: "assistant",
      content: `Hi ${studentName.split(" ")[0]}! I'm Sparky, your Personal English Mentor. Select a lesson below or just chat with me!`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMinimized, setIsMinimized] = React.useState(false);
  const [isListening, setIsListening] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [autoSpeak, setAutoSpeak] = React.useState(true); // Auto-speak on by default for students
  
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const recognitionRef = React.useRef<any>(null);

  // Preload voices for better speech
  React.useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        // Voices are loaded
      };
      // Trigger voice load
      window.speechSynthesis.getVoices();
    }
  }, []);

  React.useEffect(() => {
    // Initialize Web Speech API for STT
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        setTimeout(() => handleSend(transcript), 500);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast.error("Could not hear you. Please try again.");
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9; // Natural, not too fast
    utterance.pitch = 1.1; // Friendly, warm tone
    utterance.volume = 1.0;
    
    // Try to use a native English voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => 
      voice.lang === 'en-US' && 
      voice.name.toLowerCase().includes('female') &&
      voice.name.toLowerCase().includes('google')
    ) || voices.find(voice => voice.lang === 'en-US') || voices[0];
    
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      if (!recognitionRef.current) {
        toast.error("Speech recognition is not supported in your browser.");
        return;
      }
      setInput("");
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || isTyping) return;

    const userMessage: Message = {
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const response = getAIResponse(
        textToSend, 
        level, 
        activeLesson, 
        mode, 
        messages.map(m => ({ role: m.role, content: m.content })),
        questionIndex
      );
      
      setMessages((prev) => [...prev, response]);
      
      if (mode === "Exam") {
        if (response.content.includes("Exam Complete")) {
          setMode("Chat");
          setQuestionIndex(0);
        } else if (questionIndex !== undefined) {
          setQuestionIndex(questionIndex + 1);
        }
      }
      
      if (autoSpeak) {
        speakText(response.content);
      }
    } catch (error) {
      console.error("AI Tutor Error:", error);
      toast.error("Sorry, I couldn't respond. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  const resetChat = () => {
    window.speechSynthesis.cancel();
    setMode("Chat");
    setActiveLesson("General");
    setQuestionIndex(0);
    setMessages([
      {
        role: "assistant",
        content: `Hi ${studentName.split(" ")[0]}! I'm Sparky, your Personal English Mentor. Select a lesson below or just chat with me!`,
        timestamp: new Date(),
      },
    ]);
  };

  const startExam = () => {
    setMode("Exam");
    setQuestionIndex(0);
    const welcomeMsg: Message = {
      role: "assistant",
      content: `🎯 Exam Mode Activated for ${activeLesson}!`,
      timestamp: new Date(),
    };
    setMessages([welcomeMsg]);
    setTimeout(() => handleSend("start exam"), 500);
  };

  const selectLesson = (newLesson: Lesson) => {
    setActiveLesson(newLesson);
    setMode("Chat");
    setQuestionIndex(0);
    const lessonWelcome: Message = {
      role: "assistant",
      content: `📚 ${newLesson} Lesson! Let's focus on ${newLesson.toLowerCase()} today. What would you like to practice?`,
      timestamp: new Date(),
    };
    setMessages([lessonWelcome]);
  };

  if (!isOpen) {
    return (
      <motion.button
        layoutId="ai-tutor"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 size-16 rounded-full bg-gradient-to-tr from-[color:var(--color-navy)] to-[color:var(--color-spark)] text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-50 group border-2 border-white"
      >
        <Sparkles className="size-7 group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-2 -right-2 size-5 bg-[color:var(--color-gold)] rounded-full border-2 border-white animate-bounce flex items-center justify-center text-[color:var(--color-navy)] font-bold text-xs">
          AI
        </div>
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        layoutId="ai-tutor"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed bottom-6 right-6 z-50 w-full max-w-[420px] shadow-2xl transition-all duration-300 ${isMinimized ? 'h-[70px]' : 'h-[700px]'} rounded-2xl overflow-hidden`}
      >
        <Card className="h-full border-none flex flex-col bg-white dark:bg-slate-900">
          <CardHeader className="p-4 bg-gradient-to-r from-[color:var(--color-navy)] to-[color:var(--color-spark)] text-white flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20">
                {isSpeaking ? (
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  >
                    <Volume2 className="size-5 text-[color:var(--color-gold)]" />
                  </motion.div>
                ) : (
                  <Bot className="size-6 text-[color:var(--color-gold)]" />
                )}
              </div>
              <div>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  Sparky AI Tutor
                </CardTitle>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className={`size-1.5 rounded-full ${isListening ? 'bg-red-400 animate-ping' : 'bg-green-400 animate-pulse'}`} />
                    <span className="text-[10px] opacity-80 uppercase tracking-widest font-bold">
                      {isListening ? 'Listening...' : 'Online'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setAutoSpeak(!autoSpeak)} 
                className={`size-8 hover:bg-white/10 text-white ${!autoSpeak ? 'opacity-50' : ''}`}
                title={autoSpeak ? "Mute AI" : "Unmute AI"}
              >
                {autoSpeak ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={resetChat} className="size-8 hover:bg-white/10 text-white">
                <RotateCcw className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsMinimized(!isMinimized)} className="size-8 hover:bg-white/10 text-white">
                {isMinimized ? <Maximize2 className="size-4" /> : <Minimize2 className="size-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="size-8 hover:bg-white/10 text-white">
                <X className="size-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              {/* Lesson and Mode Controls */}
              <div className="px-4 py-3 bg-[color:var(--color-canvas)] dark:bg-slate-800 border-b border-[color:var(--color-navy)]/5 dark:border-slate-700 space-y-2">
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="flex-1 justify-start bg-white dark:bg-slate-900 border border-[color:var(--color-navy)]/10 dark:border-slate-700">
                        <BookOpen className="size-4 mr-2 text-[color:var(--color-spark)]" />
                        {activeLesson}
                        <ChevronDown className="size-3 ml-1 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      {LESSONS.map((lesson) => (
                        <DropdownMenuItem 
                          key={lesson} 
                          onClick={() => selectLesson(lesson)}
                          className="cursor-pointer"
                        >
                          {lesson}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuItem onClick={() => selectLesson("General")} className="cursor-pointer">
                        General Chat
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button 
                    size="sm" 
                    variant={mode === "Exam" ? "default" : "ghost"}
                    className={`flex-1 justify-start ${mode === "Exam" ? "bg-[color:var(--color-spark)]" : "bg-white dark:bg-slate-900 border border-[color:var(--color-navy)]/10 dark:border-slate-700"}`}
                    onClick={mode === "Exam" ? () => { setMode("Chat"); setQuestionIndex(0); } : startExam}
                  >
                    <FileText className="size-4 mr-2" />
                    {mode === "Exam" ? "Exit Exam" : "Take Exam"}
                  </Button>
                </div>
              </div>

              <CardContent className="flex-1 p-0 overflow-hidden flex flex-col bg-[color:var(--color-canvas)] dark:bg-slate-900">
                <div 
                  className="flex-1 p-4 overflow-y-auto" 
                  ref={scrollRef}
                >
                  <div className="space-y-4">
                    {messages.map((msg, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`flex gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                          <div className={`size-8 rounded-full shrink-0 flex items-center justify-center ${
                            msg.role === "user" 
                              ? "bg-[color:var(--color-spark)] text-white shadow-md" 
                              : "bg-[color:var(--color-navy)]/10 dark:bg-slate-700 text-[color:var(--color-navy)] dark:text-white"
                          }`}>
                            {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                          </div>
                          <div className="space-y-1">
                            <div 
                              className={`p-3 rounded-2xl text-sm leading-relaxed cursor-pointer group relative whitespace-pre-line ${
                                msg.role === "user" 
                                  ? "bg-gradient-to-br from-[color:var(--color-spark)] to-[color:var(--color-gold)] text-white rounded-tr-sm shadow-md" 
                                  : "bg-white dark:bg-slate-800 text-[color:var(--color-navy)] dark:text-white rounded-tl-sm border border-[color:var(--color-navy)]/5 dark:border-slate-700 shadow-sm"
                              }`}
                              onClick={() => msg.role === 'assistant' && speakText(msg.content)}
                            >
                              {msg.content}
                              {msg.role === 'assistant' && (
                                <div className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Volume2 className="size-3 text-[color:var(--color-navy)]/40 dark:text-white/40" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="flex gap-2">
                          <div className="size-8 rounded-full bg-[color:var(--color-navy)]/10 dark:bg-slate-700 text-[color:var(--color-navy)] flex items-center justify-center">
                            <Bot size={14} />
                          </div>
                          <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-sm border border-[color:var(--color-navy)]/5 dark:border-slate-700 flex gap-1.5 items-center">
                            <motion.div className="size-2 bg-[color:var(--color-navy)]/30 dark:bg-slate-500 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} />
                            <motion.div className="size-2 bg-[color:var(--color-navy)]/30 dark:bg-slate-500 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} />
                            <motion.div className="size-2 bg-[color:var(--color-navy)]/30 dark:bg-slate-500 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 border-t border-[color:var(--color-navy)]/5 dark:border-slate-700 bg-white dark:bg-slate-900 flex flex-col gap-3">
                <div className="flex w-full items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={toggleListening}
                    className={`size-12 rounded-full shrink-0 transition-all shadow-sm ${
                      isListening 
                        ? "bg-red-500 text-white border-red-500 hover:bg-red-600 scale-90" 
                        : "border-[color:var(--color-navy)]/20 dark:border-slate-600 hover:bg-[color:var(--color-spark)]/10 hover:text-[color:var(--color-spark)]"
                    }`}
                  >
                    {isListening ? <MicOff className="size-5" /> : <Mic className="size-5" />}
                  </Button>
                  
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex-1 flex items-center gap-2"
                  >
                    <Input
                      placeholder={isListening ? "Listening..." : `Ask Sparky about ${activeLesson.toLowerCase()}...`}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={isListening}
                      className="flex-1 h-12 bg-[color:var(--color-canvas)] dark:bg-slate-800 border-[color:var(--color-navy)]/10 dark:border-slate-700 rounded-full focus-visible:ring-2 focus-visible:ring-[color:var(--color-spark)]"
                    />
                    <Button 
                      type="submit" 
                      className="h-12 w-12 rounded-full bg-gradient-to-r from-[color:var(--color-navy)] to-[color:var(--color-spark)] text-white hover:brightness-110 transition-all shadow-md"
                      disabled={!input.trim() || isTyping || isListening}
                    >
                      <Send className="size-4" />
                    </Button>
                  </form>
                </div>
                {isListening && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-2 text-center"
                  >
                    <div className="size-2 bg-red-500 rounded-full animate-ping" />
                    <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
                      Speak now... I am listening
                    </span>
                  </motion.div>
                )}
              </CardFooter>
            </>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
