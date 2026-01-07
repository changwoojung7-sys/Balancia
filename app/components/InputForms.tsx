"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Sparkles } from "lucide-react";

export type Category = "IT_GADGET" | "CAREER" | "TRAVEL" | "LIFE";

interface Props {
    category: Category;
    onSubmit: (data: any) => void;
    onBack: () => void;
    isLoading: boolean;
}

export default function InputForms({ category, onSubmit, onBack, isLoading }: Props) {
    const [formData, setFormData] = useState<any>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="w-full max-w-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-xl animate-fade-in relative z-20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-cyan-400">
                    {category === "IT_GADGET" && "가전/IT"}
                    {category === "CAREER" && "진로/이직"}
                    {category === "TRAVEL" && "여행지"}
                    {category === "LIFE" && "인생의 갈림길"}
                </span>
                <span className="text-slate-400 text-base font-normal">상세 정보 입력</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Gadget Form */}
                {category === "IT_GADGET" && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-slate-300">제품군 *</label>
                                <input required name="productType" placeholder="예: 노트북, 스마트폰" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-slate-300">예산 범위 *</label>
                                <input required name="budget" placeholder="예: 100~150만원" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-slate-300">주 용도 *</label>
                            <input required name="usage" placeholder="예: 영상 편집, 고사양 게임, 문서 작업" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-slate-300">필수 조건 *</label>
                            <input required name="requirements" placeholder="예: 가벼운 무게, 긴 배터리, 대화면" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-slate-300">선호 브랜드 (선택)</label>
                            <input name="brand" placeholder="예: Apple, Samsung, LG" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" onChange={handleChange} />
                        </div>
                    </>
                )}

                {/* Career Form */}
                {category === "CAREER" && (
                    <>
                        <div className="space-y-2">
                            <label className="text-sm text-slate-300">현재 상태 *</label>
                            <select required name="status" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" onChange={handleChange}>
                                <option value="">선택해주세요</option>
                                <option value="재직 중">재직 중</option>
                                <option value="구직 중">구직 중</option>
                                <option value="이직 준비 중">이직 준비 중</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <div className="space-y-2">
                                <label className="text-sm text-cyan-300 font-bold">A안 (현재/제안1) *</label>
                                <p className="text-xs text-slate-400">채용공고(사람인 등) 내용을 복사해서 붙여넣으세요.</p>
                                <textarea required name="optionA" placeholder="연봉, 복지, 출퇴근 거리, 업무 강도 등" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-500 outline-none h-48 resize-none" onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-blue-300 font-bold">B안 (제안2) *</label>
                                <p className="text-xs text-slate-400">채용공고(사람인 등) 내용을 복사해서 붙여넣으세요.</p>
                                <textarea required name="optionB" placeholder="연봉, 복지, 출퇴근 거리, 업무 강도 등" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-500 outline-none h-48 resize-none" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-slate-300">우선순위 (가치관) *</label>
                            <input required name="priority" placeholder="예: 당장의 연봉보다 워라밸, 커리어 성장 등" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" onChange={handleChange} />
                        </div>
                    </>
                )}

                {/* Travel Form */}
                {category === "TRAVEL" && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-slate-300">여행 시기/기간 *</label>
                                <input required name="period" placeholder="예: 2월 중순, 3박 4일" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-slate-300">동반인 *</label>
                                <input required name="companions" placeholder="예: 혼자, 연인, 부모님, 아이" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-slate-300">여행 취향/스타일 *</label>
                            <input required name="preference" placeholder="예: 액티비티 위주, 힐링 호캉스, 맛집 탐방" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-slate-300">기대하는 날씨 *</label>
                            <input required name="weather" placeholder="예: 따뜻한 휴양지, 시원한 도시, 눈내리는 곳" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" onChange={handleChange} />
                        </div>
                    </>
                )}

                {/* Life Dilemma Form */}
                {category === "LIFE" && (
                    <>
                        <div className="space-y-4">
                            <label className="text-sm text-slate-300">현재 감정 상태를 선택해주세요 *</label>
                            <div className="flex gap-4 flex-wrap">
                                {["😠 화남", "😔 우울/슬픔", "🤔 혼란스러움", "😨 불안함", "😐 지침"].map((emotion) => (
                                    <button
                                        key={emotion}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, emotion })}
                                        className={`px-4 py-2 rounded-full border transition-all ${formData.emotion === emotion
                                            ? "bg-purple-500/20 border-purple-500 text-purple-300"
                                            : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700"
                                            }`}
                                    >
                                        {emotion}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-slate-300">가장 걱정되는 결과는 무엇인가요? *</label>
                            <input required name="worry" placeholder="예: 관계 단절, 경제적 손실, 아이의 상처" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-slate-300">어떤 고민이 있으신가요? *</label>
                            <p className="text-xs text-slate-400">상황을 자세히 적어주실수록 더 정확한 균형점을 찾아드릴 수 있습니다. (500자 이상 권장)</p>
                            <textarea required name="dilemma" placeholder="예: 배우자와 크게 싸웠는데 먼저 사과해야 할까요? 이혼을 고민 중인데..." className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-white focus:border-cyan-500 outline-none h-64 resize-none leading-relaxed" onChange={handleChange} />
                        </div>
                    </>
                )}

                <div className="flex gap-3 pt-4">
                    <button type="button" onClick={onBack} disabled={isLoading} className="flex-1 px-6 py-3 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors disabled:opacity-50">
                        뒤로가기
                    </button>
                    <button type="submit" disabled={isLoading} className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg shadow-cyan-900/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                분석 중...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                분석 시작
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
