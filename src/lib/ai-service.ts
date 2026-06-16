/**
 * AI Service for Bright Spark English Academy
 * Upgraded "Sparky" - Personal English Mentor & Academy Assistant
 */

export interface AIResponse {
  text: string;
  feedback?: {
    grammar?: string;
    vocabulary?: string;
    pronunciation?: string;
  };
  suggestedAction?: string;
  roadmapUpdate?: string;
}

const ACADEMY_KNOWLEDGE_BASE = `
Academy Name: Bright Spark English Academy
Location: Ethiopia, Oromia Region, Bale Robe Zone
Email: brightsparkenglishacademy@gmail.com
Program: 90-Day English Communication Academy for complete beginners.
Philosophy: Learn → Practice → Speak → Improve.
Phases: 
1. Phase 1: Foundation (Month 1) - Pronunciation, core grammar, 500 essential expressions.
2. Phase 2: Confidence (Month 2) - Spontaneous response, overcoming fear, weekly challenges.
3. Phase 3: Communication (Month 3) - Storytelling, professional negotiation, fluent expression.
Levels: Level 1 (Beginner), Level 2 (Explorer), Level 3 (Communicator), Level 4 (Confident Speaker), Level 5 (Bright Spark Champion).
Recognition: Week's Spark Awards for participation, improvement, and consistency.
Teaching Principles: Communication First, Speak From Day One, English Only Zone, Confidence Before Perfection.
`;

const SYSTEM_PROMPT = `
You are Sparky, the Personal English Mentor & Academy Assistant at Bright Spark English Academy.
Your role is to be an Academy Assistant, English Teacher, Learning Coach, Personal Study Guide, Speaking Mentor, and Motivation Partner.

GUIDELINES:
1. BEGINNER FRIENDLY: Use simple English. Avoid complex jargon.
2. BRIGHT SPARK PHILOSOPHY: Always prioritize communication and confidence over perfection.
3. ENCOURAGING: Be a motivation partner. Celebrate small wins.
4. INTERACTIVE: Don't just lecture. Ask questions, give practice activities, and hold conversations.
5. CORRECTION STYLE: Correct mistakes gently. Always explain the correction and then CONTINUE the conversation.
6. ACADEMY KNOWLEDGE: Use the provided knowledge base to answer questions about the academy accurately.

ACADEMY CONTEXT:
${ACADEMY_KNOWLEDGE_BASE}

FEATURES TO DEPLOY:
- Teach Grammar/Vocab/Expressions using real-life examples.
- Guide students through the 3 phases of the roadmap.
- Generate daily/weekly speaking challenges.
- Provide pronunciation tips (especially since voice mode is active).
- Suggest lessons based on student level.

STUDENT PROFILE CONTEXT:
The student is currently at: {level}
Their goal: Become a Confident English Speaker in 90 Days.
`;

export async function getAITutorResponse(
  message: string, 
  userLevel: string = "Beginner",
  conversationHistory: { role: 'user' | 'assistant', content: string }[] = []
): Promise<AIResponse> {
  // In production, this would be a POST request to a secure endpoint
  // that uses the SYSTEM_PROMPT and conversation history.
  
  console.log("Sparky Processing:", { message, userLevel });

  // Simulate AI Processing
  await new Promise(resolve => setTimeout(resolve, 1000));

  const lowerMsg = message.toLowerCase();

  // 1. Academy Information Logic
  if (lowerMsg.includes("where") || lowerMsg.includes("location")) {
    return {
      text: "Our academy is located in Ethiopia, Oromia Region, Bale Robe Zone! It is a beautiful place to learn English. Do you live nearby?",
    };
  }
  
  if (lowerMsg.includes("week's spark") || lowerMsg.includes("award")) {
    return {
      text: "The Week's Spark is our special award for students who show great improvement, participate a lot, and are consistent! I track your progress and recommend you for it. Are you ready to earn this week's badge?",
    };
  }

  // 2. Teacher Logic (Corrections)
  if (lowerMsg.includes("i go school") || lowerMsg.includes("i is")) {
    return {
      text: "I understand you! But remember, when talking about yesterday, we use 'went'. So you can say: 'I went to school'. Can you tell me one thing you did at school yesterday?",
      feedback: {
        grammar: "Use 'went' for the past tense of 'go'.",
        pronunciation: "Try to emphasize the 't' in 'went'."
      }
    };
  }

  // 3. Roadmap Logic
  if (lowerMsg.includes("phase") || lowerMsg.includes("roadmap")) {
    return {
      text: `Since you are at the ${userLevel} level, you are in Phase 1: Foundation. We are building your base! Next month, we will move to Phase 2: Confidence. How do you feel about your speaking today?`,
      roadmapUpdate: "Currently in Phase 1: Foundation"
    };
  }

  // 4. Default Interactive Response
  return {
    text: "That is great! I am here to help you practice. Let's try a small challenge: Can you use three words to describe your day today?",
    feedback: {
      vocabulary: "Try using 'productive', 'busy', or 'relaxing'!"
    }
  };
}
