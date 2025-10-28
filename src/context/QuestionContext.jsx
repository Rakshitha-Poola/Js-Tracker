import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const QuestionContext = createContext();

// ✅ Custom throttle implementation
function throttle(fn, delay) {
  let lastCall = 0;
  let timeoutId;

  return (...args) => {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        fn(...args);
      }, delay - (now - lastCall));
    }
  };
}

export const QuestionProvider = ({ children }) => {
  const [topics, setTopics] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // 🧠 Fetch all topics
  const fetchTopics = useCallback(
    throttle(async () => {
      if (!token) return;
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/topic/get-allTopics`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();
        if (res.ok && data.topics) {
          setTopics(data.topics);
        }
      } catch (err) {
        console.error("Error fetching topics:", err);
      } finally {
        setLoading(false);
      }
    }, 1500),
    [token]
  );

  // ✅ Lazy load topics on scroll
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        setVisibleCount((prev) => prev + 5);
      }
    }, 500);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🧠 Fetch single topic with updated progress
  const fetchTopicWithProgress = useCallback(
    throttle(async (topicName) => {
      if (!token || !topicName) return;

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/topic/get-topic/${encodeURIComponent(
            topicName
          )}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();
        if (res.ok && data) {
          setTopics((prev) => {
            const existing = prev.find((t) => t._id === data._id);
            if (existing) {
              return prev.map((t) => (t._id === data._id ? data : t));
            }
            return [...prev, data];
          });
        }
      } catch (err) {
        console.error("Error fetching topic with progress:", err);
      }
    }, 1000),
    [token]
  );

  // ✅ Update question state (bookmark, done, etc.)
  const updateQuestion = useCallback(
    throttle(async (topicId, questionId, field, value) => {
      const updatedTopics = topics.map((t) =>
        t._id === topicId
          ? {
              ...t,
              questions: t.questions.map((q) =>
                q._id === questionId ? { ...q, [field]: value } : q
              ),
            }
          : t
      );

      setTopics(updatedTopics); // Optimistic update

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/topic/${topicId}/questions/${questionId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ field, value }),
          }
        );

        const data = await res.json();
        if (res.ok && data.topic?.questions) {
          const updatedQ = data.topic.questions.find(
            (q) => q._id === questionId
          );
          if (updatedQ) {
            setTopics((prev) =>
              prev.map((t) =>
                t._id === topicId
                  ? {
                      ...t,
                      questions: t.questions.map((q) =>
                        q._id === questionId ? { ...q, ...updatedQ } : q
                      ),
                    }
                  : t
              )
            );
          }
        }
      } catch (err) {
        console.error("Failed to update question:", err);
      }
    }, 800),
    [token, topics]
  );

  const visibleTopics = topics.slice(0, visibleCount);

  return (
    <QuestionContext.Provider
      value={{
  topics,
  visibleTopics,
  fetchTopics,
  fetchTopicWithProgress,
  updateQuestion,
  loading,
}}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestions = () => useContext(QuestionContext);
