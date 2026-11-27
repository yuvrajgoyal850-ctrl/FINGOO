import type { Language, TopicId } from "./types";
import { Wrench, Landmark, Building2, TrendingUp, ShieldCheck, Receipt, BarChart3, Newspaper, GraduationCap, type LucideIcon } from "lucide-react";

export const TOPICS: { id: TopicId; label: string; icon: LucideIcon; prompts: string[] }[] = [
  { id: "tools", label: "Finance Tools", icon: Wrench, prompts: ["How do I calculate EMI for a ₹20 lakh loan?", "Help me plan a monthly budget"] },
  { id: "schemes", label: "Government Schemes", icon: Landmark, prompts: ["Which government savings schemes suit a salaried person?", "Explain PPF vs Sukanya Samriddhi"] },
  { id: "banking", label: "Banking", icon: Building2, prompts: ["Savings account vs fixed deposit: which is better?", "How does UPI work?"] },
  { id: "investments", label: "Investments", icon: TrendingUp, prompts: ["How should a beginner start investing?", "Explain asset allocation simply"] },
  { id: "insurance", label: "Insurance", icon: ShieldCheck, prompts: ["How much term insurance cover do I need?", "Health insurance: what should I check?"] },
  { id: "tax", label: "Taxation", icon: Receipt, prompts: ["Old vs new tax regime: how do I choose?", "What are the main deductions under Section 80C?"] },
  { id: "stocks", label: "Stock Analysis", icon: BarChart3, prompts: ["How do I read a company's balance sheet?", "What do P/E and ROE tell me?"] },
  { id: "news", label: "News", icon: Newspaper, prompts: ["What moves the Indian stock market?", "Explain what an RBI rate change means"] },
  { id: "education", label: "Education", icon: GraduationCap, prompts: ["Explain compound interest with an example", "What is inflation and why does it matter?"] },
];

export const HOME_PROMPTS: Record<Language, string[]> = {
  en: [
    "How does a SIP work, and how much should I start with?",
    "Help me understand income tax slabs",
    "Which government schemes can I benefit from?",
    "Explain mutual funds in simple terms",
    "How do I choose between a home loan and a personal loan?",
    "What drives the financial markets?",
  ],
  hinglish: [
    "SIP kaise kaam karta hai aur kitne se shuru karein?",
    "Income tax slabs simple language mein samjhao",
    "Mere liye kaun si sarkari yojanayein useful hain?",
    "Mutual funds ko aasan bhasha mein samjhao",
    "Home loan aur personal loan mein se kya chunu?",
    "Financial markets ko kya chalata hai?",
  ],
};

export const UI: Record<Language, Record<string, string>> = {
  en: { title: "How can I help with your finances today?", sub: "Ask about investing, tax, loans, schemes and more.", placeholder: "Ask FINGO anything about money…", newChat: "New chat", history: "Chat history", empty: "No chats yet. Start one above.", disclaimer: "FINGO shares general information, not personal financial advice." },
  hinglish: { title: "Aaj aapke paison mein main kaise madad karu?", sub: "Investing, tax, loan, schemes — kuch bhi poochiye.", placeholder: "FINGO se paison ke baare mein poochiye…", newChat: "Naya chat", history: "Chat history", empty: "Abhi koi chat nahi. Upar se shuru karein.", disclaimer: "FINGO general jaankari deta hai, personal financial advice nahi." },
};
