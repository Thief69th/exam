/**
 * Online Exam Platform - Mock Database & LocalStorage API
 * Handles mock exam questions, user profiles, test sessions, attempts, and aggregations.
 */

const EXAMS_DATA = [
  {
    id: "web-dev-basics",
    title: "Web Development Foundations",
    description: "Master core HTML5, semantic markup, CSS Layouts (Flexbox/Grid), and ES6+ JavaScript fundamentals. Highly practical and comprehensive.",
    category: "Tech",
    questionsCount: 5,
    duration: 10, // minutes
    difficulty: "Beginner",
    language: "English",
    tags: ["HTML5", "CSS3", "JS", "ES6"],
    questions: [
      {
        id: "wd-1",
        text: "Which of the following HTML5 elements is used to represent self-contained content, such as illustrations, diagrams, photos, or code listings?",
        options: [
          "<section>",
          "<article>",
          "<figure>",
          "<aside>"
        ],
        correctOption: 2, // <figure>
        explanation: "The <figure> element represents self-contained content, optionally with a caption (<figcaption>). It is commonly used to group media files like photos or illustrations with their explanations."
      },
      {
        id: "wd-2",
        text: "What is the correct value of the flex-direction property in CSS Flexbox to stack child items vertically in reverse order?",
        options: [
          "column-reverse",
          "vertical-reverse",
          "row-reverse",
          "stack-reverse"
        ],
        correctOption: 0, // column-reverse
        explanation: "The 'flex-direction: column-reverse' property stacks flex items vertically (as a column), but in reverse order (bottom to top)."
      },
      {
        id: "wd-3",
        text: "Which JavaScript array method creates a new array filled with all array elements that pass a test implemented by the provided function?",
        options: [
          "map()",
          "filter()",
          "find()",
          "reduce()"
        ],
        correctOption: 1, // filter()
        explanation: "The filter() method creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function."
      },
      {
        id: "wd-4",
        text: "How does the 'defer' attribute in a <script> tag behave compared to the 'async' attribute?",
        options: [
          "It blocks HTML parsing until the script is fully executed.",
          "It downloads the script asynchronously but delays execution until the HTML document is fully parsed.",
          "It downloads and executes the script immediately in a parallel thread.",
          "There is no difference; they behave identically in modern browsers."
        ],
        correctOption: 1, // downloads async, delays execution
        explanation: "Scripts with 'defer' are fetched in parallel and executed only after the HTML document is completely parsed, preserving execution order. Scripts with 'async' are executed as soon as they finish downloading, which might block parsing."
      },
      {
        id: "wd-5",
        text: "Which of the following is NOT a valid declaration of a block-scoped variable in modern JavaScript (ES6+)?",
        options: [
          "let x = 10;",
          "const y = 20;",
          "var z = 30;",
          "All of the above are block-scoped."
        ],
        correctOption: 2, // var z = 30
        explanation: "'let' and 'const' declare block-scoped variables. 'var' declares variables that are function-scoped or globally scoped, meaning they ignore curly-brace block boundaries."
      }
    ]
  },
  {
    id: "dsa-intermediate",
    title: "Data Structures & Algorithms",
    description: "Evaluate your proficiency in binary trees, algorithmic complexities (Big-O), stacks, queues, hash tables, and sorting methods.",
    category: "Tech",
    questionsCount: 5,
    duration: 15, // minutes
    difficulty: "Intermediate",
    language: "English",
    tags: ["Algorithms", "Data Structures", "Big-O"],
    questions: [
      {
        id: "dsa-1",
        text: "What is the worst-case time complexity of searching for an element in an unsorted singly linked list of size N?",
        options: [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N log N)"
        ],
        correctOption: 2, // O(N)
        explanation: "In an unsorted singly linked list, we may have to traverse the entire list of N nodes to find the target element (or confirm it doesn't exist), resulting in O(N) worst-case time complexity."
      },
      {
        id: "dsa-2",
        text: "Which of the following data structures operates on a First-In, First-Out (FIFO) access policy?",
        options: [
          "Stack",
          "Queue",
          "Binary Search Tree",
          "Heap"
        ],
        correctOption: 1, // Queue
        explanation: "A Queue works on the FIFO (First-In, First-Out) principle, where the first element added is the first one to be removed. A Stack works on LIFO (Last-In, First-Out)."
      },
      {
        id: "dsa-3",
        text: "What type of tree traversal visits the nodes in the following order: Left Subtree, Root Node, Right Subtree?",
        options: [
          "Pre-order Traversal",
          "Post-order Traversal",
          "Level-order Traversal",
          "In-order Traversal"
        ],
        correctOption: 3, // In-order
        explanation: "In-order traversal visits nodes in the order Left -> Root -> Right. For a Binary Search Tree, an in-order traversal visits the keys in ascending sorted order."
      },
      {
        id: "dsa-4",
        text: "Which hash collision resolution technique stores colliding elements in a list or chain at the respective index of the hash table?",
        options: [
          "Linear Probing",
          "Quadratic Probing",
          "Separate Chaining",
          "Double Hashing"
        ],
        correctOption: 2, // Separate Chaining
        explanation: "Separate chaining solves collisions by keeping a linked list (or chain) of all items that hash to the same bucket index. The other options are forms of open addressing."
      },
      {
        id: "dsa-5",
        text: "Which of the following sorting algorithms is inherently stable and operates in O(N log N) time complexity in its worst case?",
        options: [
          "Quick Sort",
          "Merge Sort",
          "Heap Sort",
          "Selection Sort"
        ],
        correctOption: 1, // Merge Sort
        explanation: "Merge Sort is a stable sorting algorithm that guarantees O(N log N) time complexity under all cases (best, average, and worst). Quick Sort is unstable and degrades to O(N^2) in its worst case, while Heap Sort is unstable."
      }
    ]
  },
  {
    id: "gk-hindi-literature",
    title: "General Knowledge & Language (bilingual)",
    description: "Evaluates basic computer science histories and linguistic general awareness. (इस परीक्षा में हिंदी भाषा के प्रश्न भी शामिल हैं।)",
    category: "Language",
    questionsCount: 5,
    duration: 8, // minutes
    difficulty: "Beginner",
    language: "Bilingual",
    tags: ["GK", "Bilingual", "Computer Basics", "Hindi"],
    questions: [
      {
        id: "gkh-1",
        text: "Who is widely acknowledged as the 'Father of Computers' for designing the Analytical Engine? / कंप्यूटर का जनक (Father of Computers) किसे कहा जाता है जिन्होंने एनालिटिकल इंजन का आविष्कार किया था?",
        options: [
          "Alan Turing / एलन ट्यूरिंग",
          "Charles Babbage / चार्ल्स बैबेज",
          "John von Neumann / जॉन वॉन न्यूमैन",
          "Ada Lovelace / एडा लवलेस"
        ],
        correctOption: 1, // Charles Babbage
        explanation: "Charles Babbage is known as the father of computers because he designed the Analytical Engine in the 1830s, which contained the essential components of a modern general-purpose computer. / चार्ल्स बैबेज को कंप्यूटर का जनक माना जाता है क्योंकि उन्होंने 1830 के दशक में एनालिटिकल इंजन का प्रारूप तैयार किया था, जो आधुनिक सामान्य कंप्यूटर की बुनियादी रूपरेखा थी।"
      },
      {
        id: "gkh-2",
        text: "Which of the following is a non-volatile computer memory that retains its data even after the power is turned off? / निम्नलिखित में से कौन सी कंप्यूटर मेमोरी नॉन-वोलेटाइल (गैर-अस्थिर) होती है, जो बिजली बंद होने पर भी डेटा नहीं खोती?",
        options: [
          "RAM / रैम",
          "SRAM / एस-रैम",
          "ROM / रोम",
          "DRAM / डी-रैम"
        ],
        correctOption: 2, // ROM
        explanation: "Read-Only Memory (ROM) is non-volatile, meaning it stores data permanently even when the system loses power. RAM is volatile. / रीड-ओनली मेमोरी (ROM) नॉन-वोलेटाइल होती है, जिसका अर्थ है कि बिजली आपूर्ति बंद होने पर भी इसमें संग्रहीत डेटा सुरक्षित रहता है। RAM वोलेटाइल होती है।"
      },
      {
        id: "gkh-3",
        text: "Which database system belongs to the NoSQL (Non-Relational) category? / निम्नलिखित में से कौन सा डेटाबेस सिस्टम नोएसक्यूएल (NoSQL) श्रेणी के अंतर्गत आता है?",
        options: [
          "PostgreSQL / पोस्टग्रेस-क्यूएल",
          "MySQL / माय-एसक्यूएल",
          "MongoDB / मोंगो-डीबी",
          "Oracle Database / ओरेकल डेटाबेस"
        ],
        correctOption: 2, // MongoDB
        explanation: "MongoDB is a document-oriented NoSQL database. MySQL, PostgreSQL, and Oracle are standard relational databases (RDBMS) which use tabular schemas. / मोंगो-डीबी (MongoDB) एक डॉक्यूमेंट-ओरिएंटेड नोएसक्यूएल डेटाबेस है। माय-एसक्यूएल, पोस्टग्रेस और ओरेकल पारंपरिक रिलेशनल डेटाबेस हैं जो तालिकाओं (tables) का उपयोग करते हैं।"
      },
      {
        id: "gkh-4",
        text: "What is the full form of PDF in computer files? / कंप्यूटर फाइलों के संदर्भ में PDF का पूर्ण रूप (Full Form) क्या होता है?",
        options: [
          "Portable Document Format",
          "Printable Document File",
          "Personal Digital Format",
          "Public Document Folder"
        ],
        correctOption: 0, // Portable Document Format
        explanation: "PDF stands for Portable Document Format, developed by Adobe in 1992 to present documents consistently across diverse software, hardware, and operating systems."
      },
      {
        id: "gkh-5",
        text: "Which protocol is used to secure data transfer between a web browser and a website by encrypting the traffic? / वेब ब्राउज़र और वेबसाइट के बीच डेटा ट्रांसफर को सुरक्षित करने के लिए किस प्रोटोकॉल का उपयोग किया जाता है, जो ट्रैफ़िक को एन्क्रिप्ट करता है?",
        options: [
          "HTTP",
          "FTP",
          "HTTPS",
          "SMTP"
        ],
        correctOption: 2, // HTTPS
        explanation: "HTTPS (Hypertext Transfer Protocol Secure) encrypts the communication channel between a user's web browser and the server using SSL/TLS protocols to ensure data privacy and integrity. / HTTPS (हाइपरटेक्स्ट ट्रांसफर प्रोटोकॉल सिक्योर) एसएसएल/टीएलएस एन्क्रिप्शन के जरिए यूजर ब्राउज़र और सर्वर के मध्य डेटा ट्रांसमिशन को पूर्णतः सुरक्षित करता है।"
      }
    ]
  },
  {
    id: "quantitative-aptitude",
    title: "Quantitative Aptitude & Logic",
    description: "Sharpen your logical reasoning and mathematical analytical capability with pattern puzzles, sequence equations, and ratio questions.",
    category: "Aptitude",
    questionsCount: 5,
    duration: 12, // minutes
    difficulty: "Advanced",
    language: "English",
    tags: ["Math", "Logic", "Problem Solving"],
    questions: [
      {
        id: "qa-1",
        text: "Complete the mathematical number sequence: 3, 8, 18, 38, 78, ?",
        options: [
          "118",
          "158",
          "148",
          "168"
        ],
        correctOption: 1, // 158
        explanation: "The pattern is: multiply the current number by 2 and add 2. E.g., (3*2)+2 = 8; (8*2)+2 = 18; (18*2)+2 = 38; (38*2)+2 = 78; (78*2)+2 = 158."
      },
      {
        id: "qa-2",
        text: "If a developer writes code at an average speed of 40 lines per hour, and a second developer writes at 60 lines per hour, how many hours will they take together to build a script of 500 lines?",
        options: [
          "4 hours",
          "5 hours",
          "6 hours",
          "4.5 hours"
        ],
        correctOption: 1, // 5 hours
        explanation: "Combined speed = 40 + 60 = 100 lines per hour. Total lines = 500. Time taken = 500 / 100 = 5 hours."
      },
      {
        id: "qa-3",
        text: "What is the probability of rolling a sum of exactly 9 with two standard six-sided dice?",
        options: [
          "1/9",
          "1/6",
          "5/36",
          "1/12"
        ],
        correctOption: 0, // 1/9 (which is 4/36)
        explanation: "Total outcomes = 6 * 6 = 36. Outcomes resulting in a sum of 9 are: (3,6), (4,5), (5,4), and (6,3), which is 4 possibilities. Probability = 4/36 = 1/9."
      },
      {
        id: "qa-4",
        text: "A project manager states: 'All engineers are programmers. Some programmers are data analysts.' Which of the following statements MUST logically be true?",
        options: [
          "All engineers are data analysts.",
          "Some engineers are data analysts.",
          "No engineers are data analysts.",
          "None of the above statements is guaranteed to be true."
        ],
        correctOption: 3, // None of the above
        explanation: "Since the group of programmers who are data analysts is not defined relative to the engineers, there might be no overlap between engineers and data analysts, or there could be a partial overlap. None of A, B, or C is guaranteed to be true."
      },
      {
        id: "qa-5",
        text: "A computer store offers a successive discount of 20% and 10% on a laptop priced at $1,000. What is the final selling price of the laptop?",
        options: [
          "$700",
          "$720",
          "$750",
          "$800"
        ],
        correctOption: 1, // $720
        explanation: "First discount of 20%: $1,000 - $200 = $800. Second discount of 10% on the discounted price: $800 - $80 = $720. (Alternatively, combined discount multiplier is 0.8 * 0.9 = 0.72)."
      }
    ]
  }
];

const DEFAULT_PROFILE = {
  name: "Amit Kumar",
  email: "amit.kumar@education.in",
  avatar: "avatar-3", // ID for active avatar selection
  registeredAt: "2026-05-01"
};

// ==========================================
// MOCK DATABASE API METHODS
// ==========================================

const ExamDB = {
  // Retrieve list of all available exams
  getExams() {
    return EXAMS_DATA.map(exam => ({
      id: exam.id,
      title: exam.title,
      description: exam.description,
      category: exam.category,
      questionsCount: exam.questionsCount,
      duration: exam.duration,
      difficulty: exam.difficulty,
      language: exam.language,
      tags: exam.tags
    }));
  },

  // Retrieve details of a specific exam including questions
  getExam(id) {
    return EXAMS_DATA.find(exam => exam.id === id) || null;
  },

  // USER PROFILE METHODS
  getUserProfile() {
    const profile = localStorage.getItem("exam_user_profile");
    if (!profile) {
      localStorage.setItem("exam_user_profile", JSON.stringify(DEFAULT_PROFILE));
      return DEFAULT_PROFILE;
    }
    return JSON.parse(profile);
  },

  saveUserProfile(profileData) {
    const current = this.getUserProfile();
    const updated = { ...current, ...profileData };
    localStorage.setItem("exam_user_profile", JSON.stringify(updated));
    return updated;
  },

  // EXAM SESSION DRAFTS (If user accidentally refreshes)
  saveExamDraft(examId, draftState) {
    localStorage.setItem(`exam_draft_${examId}`, JSON.stringify({
      state: draftState,
      timestamp: Date.now()
    }));
  },

  getExamDraft(examId) {
    const draft = localStorage.getItem(`exam_draft_${examId}`);
    return draft ? JSON.parse(draft) : null;
  },

  clearExamDraft(examId) {
    localStorage.removeItem(`exam_draft_${examId}`);
  },

  // ATTEMPTS HISTORY
  saveAttempt(attempt) {
    // attempt properties: id, examId, examTitle, date, score, totalQuestions, correctCount, wrongCount, skippedCount, timeSpent, answersMap
    const attempts = this.getAttempts();
    attempts.unshift(attempt); // Add to the top
    localStorage.setItem("exam_attempts_history", JSON.stringify(attempts));
    
    // Trigger statistics update
    this.updateDashboardStats();
    return attempt;
  },

  getAttempts() {
    const history = localStorage.getItem("exam_attempts_history");
    return history ? JSON.parse(history) : [];
  },

  getAttempt(attemptId) {
    const attempts = this.getAttempts();
    return attempts.find(a => a.id === attemptId) || null;
  },

  // STATISTICS & METRICS FOR DASHBOARD
  getDashboardStats() {
    const attempts = this.getAttempts();
    
    if (attempts.length === 0) {
      return {
        totalExamsTaken: 0,
        averageScore: 0,
        totalTimeSpent: 0, // seconds
        passingRate: 0,
        achievementsCount: 0,
        recentTrends: [] // list of scores chronologically
      };
    }

    const totalExams = attempts.length;
    const scoresSum = attempts.reduce((sum, item) => sum + item.score, 0);
    const averageScore = Math.round(scoresSum / totalExams);
    
    const timeSpentSum = attempts.reduce((sum, item) => sum + item.timeSpent, 0);
    
    // Passing score criteria is 60%
    const passedExams = attempts.filter(item => item.score >= 60).length;
    const passingRate = Math.round((passedExams / totalExams) * 100);

    // Achievements calculation
    let achievements = 0;
    if (totalExams >= 1) achievements++; // First exam taken
    if (attempts.some(a => a.score === 100)) achievements++; // Perfect score!
    if (averageScore >= 80) achievements++; // Scholar!
    if (timeSpentSum >= 600) achievements++; // Dedication! (Over 10 mins study time total)

    // Chart trend coordinates (chronological order)
    const recentTrends = [...attempts]
      .reverse()
      .slice(-10) // Show last 10 attempts
      .map(item => ({
        examTitle: item.examTitle,
        score: item.score,
        date: new Date(item.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })
      }));

    return {
      totalExamsTaken: totalExams,
      averageScore,
      totalTimeSpent: timeSpentSum,
      passingRate,
      achievementsCount: achievements,
      recentTrends
    };
  },

  updateDashboardStats() {
    // Utility to trigger callbacks or recalculations if required.
    // In local architecture, we compute stats dynamically in getDashboardStats().
  },

  // Seed default history data if empty (to present beautiful graphs on initial run)
  seedInitialData() {
    const history = this.getAttempts();
    if (history.length === 0) {
      const mockAttempts = [
        {
          id: "mock-att-1",
          examId: "web-dev-basics",
          examTitle: "Web Development Foundations",
          date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
          score: 60,
          totalQuestions: 5,
          correctCount: 3,
          wrongCount: 2,
          skippedCount: 0,
          timeSpent: 310, // 5 mins 10 secs
          answersMap: { "wd-1": 1, "wd-2": 0, "wd-3": 1, "wd-4": 0, "wd-5": 0 }
        },
        {
          id: "mock-att-2",
          examId: "quantitative-aptitude",
          examTitle: "Quantitative Aptitude & Logic",
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
          score: 80,
          totalQuestions: 5,
          correctCount: 4,
          wrongCount: 1,
          skippedCount: 0,
          timeSpent: 520, // 8 mins 40 secs
          answersMap: { "qa-1": 1, "qa-2": 1, "qa-3": 0, "qa-4": 2, "qa-5": 1 }
        }
      ];
      localStorage.setItem("exam_attempts_history", JSON.stringify(mockAttempts));
    }
  }
};

// Run seed immediately on import to ensure beautiful layouts
ExamDB.seedInitialData();

// Export database globally
window.ExamDB = ExamDB;
