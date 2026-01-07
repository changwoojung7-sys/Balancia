"use client";

import { useState } from "react";
import { Scale, Laptop, User, Palmtree, ArrowLeft, RefreshCw, Home as HomeIcon, Sparkles, HeartHandshake } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import InputForms, { Category } from "./components/InputForms";

export default function Home() {
  const [step, setStep] = useState<"SELECTION" | "INPUT" | "RESULT">("SELECTION");
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [provider, setProvider] = useState<string>("");

  const handleCategorySelect = (selected: Category) => {
    setCategory(selected);
    setStep("INPUT");
    setResult("");
    setProvider("");
  };

  const handleBack = () => {
    if (step === "INPUT") {
      setStep("SELECTION");
      setCategory(null);
    } else if (step === "RESULT") {
      setStep("INPUT");
    }
  };

  const handleAnalyze = async (formData: any) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, formData }),
      });

      const data = await response.json();
      if (data.result) {
        setResult(data.result);
        setProvider(data.provider || "AI Model");
        setStep("RESULT");
      } else {
        alert("분석에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Analysis error:", error);
      alert("오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-screen p-8 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl w-full flex flex-col items-center gap-8 z-10 pb-32">
        {/* Header */}
        <header className="flex flex-col items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Scale className="w-10 h-10 text-cyan-400" />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Balancia
            </h1>
          </div>
          {step === "SELECTION" && (
            <p className="text-slate-400 text-lg max-w-2xl text-center">
              망설임의 순간, Balancia가 데이터와 가치관을 분석하여<br className="md:hidden" /> 최적의 선택지를 제시합니다.
            </p>
          )}
        </header>

        {/* Step 1: Category Selection */}
        {step === "SELECTION" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full animate-fade-in-up">
            {/* Card 1: IT/Gadget */}
            <div
              onClick={() => handleCategorySelect("IT_GADGET")}
              className="group relative bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] cursor-pointer backdrop-blur-sm transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="flex flex-col items-center text-center gap-4 relative z-10">
                <div className="p-4 bg-slate-800/50 rounded-full group-hover:bg-cyan-500/20 transition-colors">
                  <Laptop className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300" />
                </div>
                <h3 className="text-xl font-semibold text-white">가전/IT</h3>
                <p className="text-slate-400 text-sm">나에게 딱 맞는 기기 찾기</p>
              </div>
            </div>

            {/* Card 2: Career */}
            <div
              onClick={() => handleCategorySelect("CAREER")}
              className="group relative bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] cursor-pointer backdrop-blur-sm transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="flex flex-col items-center text-center gap-4 relative z-10">
                <div className="p-4 bg-slate-800/50 rounded-full group-hover:bg-cyan-500/20 transition-colors">
                  <User className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300" />
                </div>
                <h3 className="text-xl font-semibold text-white">진로/이직</h3>
                <p className="text-slate-400 text-sm">연봉 vs 워라밸 가치관 분석</p>
              </div>
            </div>

            {/* Card 3: Travel */}
            <div
              onClick={() => handleCategorySelect("TRAVEL")}
              className="group relative bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] cursor-pointer backdrop-blur-sm transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="flex flex-col items-center text-center gap-4 relative z-10">
                <div className="p-4 bg-slate-800/50 rounded-full group-hover:bg-cyan-500/20 transition-colors">
                  <Palmtree className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300" />
                </div>
                <h3 className="text-xl font-semibold text-white">여행지</h3>
                <p className="text-slate-400 text-sm">날씨와 취향 기반 휴양지 추천</p>
              </div>
            </div>

            {/* Card 4: Life Dilemma */}
            <div
              onClick={() => handleCategorySelect("LIFE")}
              className="group relative bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] cursor-pointer backdrop-blur-sm transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="flex flex-col items-center text-center gap-4 relative z-10">
                <div className="p-4 bg-slate-800/50 rounded-full group-hover:bg-purple-500/20 transition-colors">
                  <HeartHandshake className="w-8 h-8 text-purple-400 group-hover:text-purple-300" />
                </div>
                <h3 className="text-xl font-semibold text-white">인생의 갈림길</h3>
                <p className="text-slate-400 text-sm">자유 고민 상담 & 심층 분석</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Input Forms */}
        {step === "INPUT" && category && (
          <InputForms
            category={category}
            onSubmit={handleAnalyze}
            onBack={handleBack}
            isLoading={isLoading}
          />
        )}

        {/* Step 3: Result */}
        {step === "RESULT" && (
          <div className="w-full max-w-4xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl animate-fade-in relative z-20">
            <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                분석 결과
              </h2>
              <div className="flex gap-2">
                <button onClick={() => setStep("INPUT")} className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors bg-slate-800 rounded-lg">
                  다시 입력하기
                </button>
                <button onClick={() => { setStep("SELECTION"); setCategory(null); }} className="px-4 py-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors bg-slate-800 rounded-lg flex items-center gap-2">
                  <HomeIcon className="w-4 h-4" /> 홈으로
                </button>
              </div>
            </div>

            <div className="prose prose-invert prose-lg max-w-none 
              leading-loose 
              prose-p:leading-loose prose-p:text-slate-200 prose-p:mb-6 
              prose-headings:font-bold prose-headings:mb-4
              prose-h1:text-cyan-400 prose-h1:text-3xl
              prose-h2:text-cyan-300 prose-h2:text-2xl prose-h2:mt-12 prose-h2:border-b prose-h2:border-slate-700 prose-h2:pb-2
              prose-h3:text-cyan-200 prose-h3:text-xl prose-h3:mt-8
              prose-h4:text-slate-200 prose-h4:font-semibold
              prose-li:text-slate-200 prose-li:leading-loose prose-li:mb-2 
              prose-strong:text-cyan-400 prose-em:text-purple-300
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-cyan-500 prose-blockquote:bg-slate-800/50 prose-blockquote:py-2 prose-blockquote:pr-4
              prose-table:w-full prose-table:border-collapse prose-table:my-8
              prose-th:border prose-th:border-slate-600 prose-th:bg-slate-800 prose-th:p-4 prose-th:text-cyan-300 prose-th:whitespace-nowrap
              prose-td:border prose-td:border-slate-700 prose-td:p-4 prose-td:text-slate-300 prose-td:align-top
              prose-tr:hover:bg-slate-800/30">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {result}
              </ReactMarkdown>
            </div>

            {/* AI Provider Badge */}
            <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs text-slate-400">
                <Sparkles className="w-3 h-3" />
                Generated by <span className="text-cyan-400 font-medium">{provider}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-6 flex flex-col items-center gap-3 z-50">
        <a
          href="https://calamus.ai.kr"
          className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 rounded-full transition-all backdrop-blur-md group shadow-lg"
        >
          <HomeIcon className="w-4 h-4 text-cyan-500 group-hover:text-cyan-400" />
          <span className="text-slate-300 group-hover:text-white text-sm font-medium">Calamus 홈으로 이동</span>
        </a>
        <p className="text-slate-700 text-xs shadow-black drop-shadow-md">
          © 2026 Balancia. All rights reserved.
        </p>
      </div>
    </main>
  );
}
