import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import * as Haptics from 'expo-haptics';

import { LEVELS } from './src/data/levels';
import type { DifficultyKey } from './src/data/levels';
import { getLevel, getNextLevel, getLevelIndex, getDailySeed, seededRandom, clamp } from './src/utils/helpers';
import { buildQuiz, LESSON_IDS } from './src/utils/questions';
import type { Question, LessonId } from './src/utils/questions';
import { buildLearnCards } from './src/utils/learn';
import type { LearnCard } from './src/utils/learn';
import { loadGameState, saveValue } from './src/hooks/useStorage';
import { useSounds } from './src/hooks/useSounds';

import { ErrorBoundary } from './src/components/ErrorBoundary';
import { LevelUpModal } from './src/components/shared';
import { LoadingScreen } from './src/screens/LoadingScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { QuizScreen } from './src/screens/QuizScreen';
import { LearnScreen } from './src/screens/LearnScreen';
import { LevelsScreen } from './src/screens/LevelsScreen';
import { ResultsScreen } from './src/screens/ResultsScreen';

const QUIZ_LENGTH = 10;
const MAX_HEARTS = 5;

type Screen = 'home' | 'quiz' | 'learn' | 'results' | 'levels';
type ActiveLesson = LessonId | 'daily';

function GeoQuestApp() {
  // ── Navigation ────────────────────────────────────────────────────────────
  const [screen, setScreen] = useState<Screen>('home');
  const [isLoading, setIsLoading] = useState(true);

  // ── Persistent player stats ───────────────────────────────────────────────
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [learnedItems, setLearnedItems] = useState<string[]>([]);
  const [dailyCompleted, setDailyCompleted] = useState(false);
  const [difficulty, setDifficulty] = useState<DifficultyKey>('easy');
  const [selectedContinent, setSelectedContinent] = useState('All');

  // ── Quiz session ──────────────────────────────────────────────────────────
  const [activeLesson, setActiveLesson] = useState<ActiveLesson>('capitals');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [comboCount, setComboCount] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [finishedQuizLength, setFinishedQuizLength] = useState(QUIZ_LENGTH);

  // ── Learn session ─────────────────────────────────────────────────────────
  const [learnCards, setLearnCards] = useState<LearnCard[]>([]);
  const [learnIdx, setLearnIdx] = useState(0);
  const [learnFlipped, setLearnFlipped] = useState(false);

  // ── Level-up modal ────────────────────────────────────────────────────────
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevelIdx, setNewLevelIdx] = useState<number | null>(null);

  // ── Animations & sounds ───────────────────────────────────────────────────
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const initialized = useRef(false);
  const levelUpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playSound = useSounds();

  const fadeIn = useCallback(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
  }, [fadeAnim]);

  const triggerShake = useCallback(() => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  }, [shakeAnim]);

  const triggerPop = useCallback(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.15, duration: 120, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
  }, [scaleAnim]);

  // ── Load persisted state once ─────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    loadGameState().then(s => {
      if (cancelled) return;
      setXp(s.xp);
      setStreak(s.streak);
      setBestStreak(s.bestStreak);
      setTotalCorrect(s.totalCorrect);
      setTotalAnswered(s.totalAnswered);
      setLearnedItems(s.learnedItems);
      setDailyCompleted(s.dailyDate === getDailySeed() ? s.dailyCompleted : false);
      setDifficulty(s.difficulty as DifficultyKey);
      setSelectedContinent(s.selectedContinent);
      initialized.current = true;
      setIsLoading(false);
      fadeIn();
    });
    return () => {
      cancelled = true;
      if (levelUpTimer.current) clearTimeout(levelUpTimer.current);
    };
  }, [fadeIn]);

  // ── Persist on change (guarded so the initial load isn't overwritten) ────
  useEffect(() => { if (initialized.current) saveValue('XP', xp); }, [xp]);
  useEffect(() => { if (initialized.current) saveValue('STREAK', streak); }, [streak]);
  useEffect(() => { if (initialized.current) saveValue('BEST_STREAK', bestStreak); }, [bestStreak]);
  useEffect(() => { if (initialized.current) saveValue('TOTAL_CORRECT', totalCorrect); }, [totalCorrect]);
  useEffect(() => { if (initialized.current) saveValue('TOTAL_ANSWERED', totalAnswered); }, [totalAnswered]);
  useEffect(() => { if (initialized.current) saveValue('LEARNED_ITEMS', learnedItems); }, [learnedItems]);
  useEffect(() => { if (initialized.current) saveValue('DAILY_COMPLETED', dailyCompleted); }, [dailyCompleted]);
  useEffect(() => { if (initialized.current) saveValue('DIFFICULTY', difficulty); }, [difficulty]);
  useEffect(() => { if (initialized.current) saveValue('CONTINENT', selectedContinent); }, [selectedContinent]);

  // ── Derived level info ────────────────────────────────────────────────────
  const level = getLevel(xp);
  const nextLevel = getNextLevel(xp);
  const levelIdx = getLevelIndex(xp);
  const levelProgress = nextLevel
    ? clamp(((xp - level.minXP) / (nextLevel.minXP - level.minXP)) * 100, 0, 100)
    : 100;

  // ── Actions ───────────────────────────────────────────────────────────────
  const resetSession = useCallback(() => {
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setSessionScore(0);
    setSessionCorrect(0);
    setComboCount(0);
    setBestCombo(0);
    setHearts(MAX_HEARTS);
  }, []);

  const startQuiz = useCallback((lesson: LessonId, isDaily = false) => {
    let quiz: Question[];
    if (isDaily) {
      // Seeded so everyone (and every retry) gets the same lesson mix today.
      const rng = seededRandom(getDailySeed());
      quiz = buildQuiz('capitals', 'All', difficulty, QUIZ_LENGTH, () => {
        const idx = clamp(Math.floor(rng() * LESSON_IDS.length), 0, LESSON_IDS.length - 1);
        return LESSON_IDS[idx];
      });
    } else {
      quiz = buildQuiz(lesson, selectedContinent, difficulty, QUIZ_LENGTH);
    }
    if (quiz.length === 0) return; // dataset problem — stay on Home rather than open an empty quiz

    setQuestions(quiz);
    resetSession();
    setActiveLesson(isDaily ? 'daily' : lesson);
    setScreen('quiz');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    fadeIn();
  }, [difficulty, selectedContinent, resetSession, fadeIn]);

  const startLearn = useCallback((lesson: LessonId) => {
    const cards = buildLearnCards(lesson, selectedContinent);
    if (cards.length === 0) return;
    setLearnCards(cards);
    setLearnIdx(0);
    setLearnFlipped(false);
    setScreen('learn');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    fadeIn();
  }, [selectedContinent, fadeIn]);

  const handleAnswer = useCallback((answer: string) => {
    if (showResult) return;
    const question = questions[currentQ];
    if (!question) return;

    const correct = answer === question.answer;
    setSelected(answer);
    setShowResult(true);
    setIsCorrect(correct);
    setTotalAnswered(p => p + 1);

    if (correct) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      playSound('correct');
      triggerPop();

      const combo = comboCount + 1;
      setComboCount(combo);
      setBestCombo(b => Math.max(b, combo));
      setTotalCorrect(p => p + 1);
      setSessionCorrect(p => p + 1);
      setStreak(p => {
        const next = p + 1;
        setBestStreak(b => Math.max(b, next));
        return next;
      });

      const base = 10 + (combo >= 3 ? combo * 3 : 0) + (combo >= 5 ? 5 : 0);
      const xpMult = difficulty === 'hard' ? 2.5 : difficulty === 'medium' ? 1.5 : 1;
      const gained = Math.round(base * xpMult);
      setSessionScore(p => p + gained);
      setXp(prev => {
        const next = prev + gained;
        const oldIdx = getLevelIndex(prev);
        const nextIdx = getLevelIndex(next);
        if (nextIdx > oldIdx) {
          if (levelUpTimer.current) clearTimeout(levelUpTimer.current);
          levelUpTimer.current = setTimeout(() => {
            setNewLevelIdx(nextIdx);
            setShowLevelUp(true);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
            playSound('levelup');
          }, 600);
        }
        return next;
      });
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
      playSound('wrong');
      triggerShake();
      setComboCount(0);
      setStreak(0);
      setHearts(p => Math.max(0, p - 1));
    }
  }, [showResult, questions, currentQ, comboCount, difficulty, playSound, triggerPop, triggerShake]);

  const nextQuestion = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    const isOver = hearts <= 0 || currentQ >= questions.length - 1;
    if (isOver) {
      if (activeLesson === 'daily') {
        setDailyCompleted(true);
        saveValue('DAILY_DATE', getDailySeed());
      }
      setFinishedQuizLength(questions.length);
      setScreen('results');
      fadeIn();
      return;
    }
    setCurrentQ(p => p + 1);
    setSelected(null);
    setShowResult(false);
    fadeIn();
  }, [hearts, currentQ, questions.length, activeLesson, fadeIn]);

  const goHome = useCallback(() => {
    setScreen('home');
  }, []);

  const markLearned = useCallback((id: string) => {
    setLearnedItems(prev => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  if (isLoading) return <LoadingScreen />;

  const levelUpModal = (
    <LevelUpModal
      visible={showLevelUp}
      level={newLevelIdx !== null ? LEVELS[newLevelIdx] : null}
      onClose={() => setShowLevelUp(false)}
    />
  );

  switch (screen) {
    case 'learn': {
      const card = learnCards[learnIdx];
      return (
        <LearnScreen
          cards={learnCards}
          index={learnIdx}
          flipped={learnFlipped}
          onFlip={() => setLearnFlipped(f => !f)}
          onPrev={() => { setLearnIdx(p => Math.max(0, p - 1)); setLearnFlipped(false); }}
          onNext={() => {
            if (card) markLearned(card.id);
            setLearnIdx(p => Math.min(learnCards.length - 1, p + 1));
            setLearnFlipped(false);
          }}
          onDone={() => { if (card) markLearned(card.id); goHome(); }}
          onExit={goHome}
        />
      );
    }
    case 'levels':
      return (
        <LevelsScreen xp={xp} level={level} nextLevel={nextLevel} levelIndex={levelIdx} onExit={goHome} />
      );
    case 'quiz':
      return (
        <>
          <QuizScreen
            questions={questions}
            currentIndex={currentQ}
            selected={selected}
            showResult={showResult}
            isCorrect={isCorrect}
            hearts={hearts}
            sessionScore={sessionScore}
            comboCount={comboCount}
            activeLesson={activeLesson}
            difficulty={difficulty}
            fadeAnim={fadeAnim}
            shakeAnim={shakeAnim}
            scaleAnim={scaleAnim}
            onAnswer={handleAnswer}
            onNext={nextQuestion}
            onExit={goHome}
          />
          {levelUpModal}
        </>
      );
    case 'results':
      return (
        <>
          <ResultsScreen
            sessionCorrect={sessionCorrect}
            quizLength={finishedQuizLength}
            sessionScore={sessionScore}
            bestCombo={bestCombo}
            hearts={hearts}
            xp={xp}
            level={level}
            activeLesson={activeLesson}
            onPlayAgain={() =>
              activeLesson === 'daily' ? startQuiz('capitals', true) : startQuiz(activeLesson)
            }
            onHome={goHome}
          />
          {levelUpModal}
        </>
      );
    case 'home':
    default:
      return (
        <>
          <HomeScreen
            level={level}
            nextLevel={nextLevel}
            xp={xp}
            streak={streak}
            bestStreak={bestStreak}
            totalCorrect={totalCorrect}
            totalAnswered={totalAnswered}
            learnedCount={learnedItems.length}
            levelProgress={levelProgress}
            difficulty={difficulty}
            selectedContinent={selectedContinent}
            dailyCompleted={dailyCompleted}
            onSelectDifficulty={setDifficulty}
            onSelectContinent={setSelectedContinent}
            onStartQuiz={lesson => startQuiz(lesson)}
            onStartDaily={() => startQuiz('capitals', true)}
            onStartLearn={startLearn}
            onOpenLevels={() => setScreen('levels')}
          />
          {levelUpModal}
        </>
      );
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <GeoQuestApp />
    </ErrorBoundary>
  );
}
