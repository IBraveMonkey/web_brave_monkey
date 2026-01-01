import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatDemo.module.css';

interface Message {
    id: number;
    sender: string;
    text: string;
    isAI: boolean;
    isScreenshot?: boolean;
}

const ChatDemo: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [currentScenario, setCurrentScenario] = useState(0);
    const [isEasterEggActive, setIsEasterEggActive] = useState(false);
    const [hoverProgress, setHoverProgress] = useState(0);
    const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const scenarios = [
        {
            question: "What is garbage collector in Golang?",
            answer: "Go uses a concurrent, tri-color, mark-and-sweep garbage collector. It works by: \n1. Mark phase: identifies reachable objects.\n2. Sweep phase: reclaims memory from unreachable objects.\nIt's optimized for low latency (sub-millisecond pause times)."
        },
        {
            question: "Screenshot detected: TwoSum problem on LeetCode.",
            isQuestionScreenshot: true,
            answer: "Optimal solution for TwoSum using Hash Map (O(n) time complexity):\n\n```go\nfunc twoSum(nums []int, target int) []int {\n    m := make(map[int]int)\n    for i, n := range nums {\n        if idx, ok := m[target-n]; ok {\n            return []int{idx, i}\n        }\n        m[n] = i\n    }\n    return nil\n}\n```"
        }
    ];

    useEffect(() => {
        let mounted = true;

        const runScenario = async () => {
            if (!mounted) return;

            const scenario = scenarios[currentScenario];

            // Clear previous messages and start typing
            setMessages([]);

            // User/System input
            await new Promise(r => setTimeout(r, 1000));
            if (!mounted) return;
            setMessages(prev => [...prev, {
                id: Date.now(),
                sender: scenario.isQuestionScreenshot ? "System" : "You",
                text: scenario.question,
                isAI: false,
                isScreenshot: scenario.isQuestionScreenshot
            }]);

            // AI response lag simulation
            await new Promise(r => setTimeout(r, 1500));
            if (!mounted) return;
            setIsTyping(true);

            // Typing animation
            const fullText = scenario.answer;
            let currentText = "";
            for (let i = 0; i < fullText.length; i++) {
                await new Promise(r => setTimeout(r, 15));
                if (!mounted) return;
                currentText += fullText[i];
                if (i === 0) {
                    setMessages(prev => [...prev, {
                        id: Date.now() + 1,
                        sender: "Brave Monkey",
                        text: "",
                        isAI: true
                    }]);
                }
                setMessages(prev => {
                    const newMsg = [...prev];
                    newMsg[newMsg.length - 1] = { ...newMsg[newMsg.length - 1], text: currentText };
                    return newMsg;
                });
            }

            setIsTyping(false);

            // Wait before next scenario
            await new Promise(r => setTimeout(r, 5000));
            if (!mounted) return;
            setCurrentScenario((prev) => (prev + 1) % scenarios.length);
        };

        runScenario();

        return () => { mounted = false; };
    }, [currentScenario]);

    const handleMouseEnter = () => {
        setHoverProgress(0);
        hoverTimerRef.current = setTimeout(() => {
            setIsEasterEggActive(true);
        }, 5000);

        progressIntervalRef.current = setInterval(() => {
            setHoverProgress(prev => Math.min(prev + (100 / 50), 100)); // Update every 100ms
        }, 100);
    };

    const handleMouseLeave = () => {
        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        setHoverProgress(0);
        setIsEasterEggActive(false);
    };

    return (
        <div
            className={`${styles.demoWrapper} ${isEasterEggActive ? styles.easterEggMode : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {!isEasterEggActive && hoverProgress > 0 && hoverProgress < 100 && (
                <div className={styles.progressBar} style={{ width: `${hoverProgress}%` }} />
            )}

            <div className={styles.chatContainer}>
                {isEasterEggActive ? (
                    <div className={styles.easterEggContent}>
                        <img src="/literallyMe.jpg" alt="Literally Me" className={styles.easterEggImage} />
                        <div className={styles.easterEggOverlay}>LITERALLY ME</div>
                    </div>
                ) : (
                    <>
                        <div className={styles.chatHeader}>
                            <div className={styles.statusDot}></div>
                            <span>Brave Monkey AI Assistant</span>
                            <div className={styles.headerAccent}>STYLISH</div>
                        </div>
                        <div className={styles.messagesList}>
                            {messages.map((msg) => (
                                <div key={msg.id} className={`${styles.message} ${msg.isAI ? styles.aiMessage : styles.userMessage}`}>
                                    <div className={styles.senderName}>{msg.sender}</div>
                                    <div className={styles.messageContent}>
                                        {msg.isScreenshot && <div className={styles.screenshotIcon}>🖼️ Screen Capture</div>}
                                        <pre className={styles.text}>{msg.text}</pre>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className={styles.typingIndicator}>
                                    <span></span><span></span><span></span>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ChatDemo;
