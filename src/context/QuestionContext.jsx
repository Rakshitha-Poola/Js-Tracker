import React, { createContext, useContext, useEffect, useState } from "react";

const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [topics, setTopics] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch all topics (for Topics page)
  const fetchTopics = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:4000/api/topic/get-allTopics", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setTopics(data.topics || []);
    } catch (err) {
      console.error("Error fetching topics:", err);
    }
  };

  // Fetch single topic by name with progress
  const fetchTopicWithProgress = async (topicName) => {
    if (!token) return;
    try {
      const res = await fetch(
        `http://localhost:4000/api/topic/get-topic/${encodeURIComponent(topicName)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      if (res.ok && data) {
        setTopics((prev) => {
          const existing = prev.find((t) => t._id === data._id);
          if (existing) {
            return prev.map((t) => (t._id === data._id ? data : t));
          } else {
            return [...prev, data];
          }
        });
      }
    } catch (err) {
      console.error("Error fetching topic with progress:", err);
    }
  };

  // Update any question field
  const updateQuestion = async (topicId, questionId, field, value) => {

    const updatedTopics = topics?.map((t) =>
        t._id === topicId
          ? {
              ...t,
              questions: t.questions.map((q) =>
                q._id === questionId ? { ...q, [field]: value } : q
              ),
            }
          : t
      )



    try {
      const res = await fetch(
        `http://localhost:4000/api/topic/${topicId}/questions/${questionId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ field, value }),
        }
      );

      const data = await res.json();
      if (res.ok && data.topic?.questions) {
        const updatedQ = data.topic.questions.find((q) => q._id === questionId);
        if (updatedQ) {


          console.log(data, "topics data")


          // setTopics((prev) =>
          //   prev.map((t) =>
          //     t._id === topicId
          //       ? {
          //           ...t,
          //           questions: t.questions.map((q) =>
          //             q._id === questionId ? { ...q, ...updatedQ } : q
          //           ),
          //         }
          //       : t
          //   )
          // );
      console.log(updatedTopics)
           setTopics([...updatedTopics]);
        }
      }
    } catch (err) {
      console.error("Failed to update question:", err);
    }
  };

  return (
    <QuestionContext.Provider value={{ topics, updateQuestion, fetchTopics, fetchTopicWithProgress }}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestions = () => useContext(QuestionContext);
