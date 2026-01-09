// English translations
export const en = {
  dashboard: {
    welcome: "Welcome back",
    personalDashboard:
      "This is your personal dashboard where you can manage your account and activities.",
    totalChats: "Total Chats",
    messagesSent: "Messages Sent",
    activeSessions: "Active Sessions",
    accountAge: "Account Age",
  },
  navigation: {
    dashboard: "Dashboard",
    chats: "Chats",
    apiStatus: "API Status",
    profile: "Profile",
    download: "Download",
    faq: "FAQ",
  },
  auth: {
    login: "Login",
    register: "Register",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    registerHere: "Register",
    loginHere: "Login",
    verifyEmail: "Email Verification",
    verificationCode: "Verification Code",
    verifyEmailButton: "Verify Email",
    enterSixDigitCode:
      "Please enter the 6-digit verification code that appeared in the server console after registration.",
    forgotPassword: "Forgot Password?",
    forgotPasswordSubtitle:
      "Enter your email and we'll send you a link to reset your password",
    sendResetLink: "Send Reset Link",
    passwordResetLinkSent: "Password reset link has been sent to your email",
    passwordResetFailed: "Password reset failed. Please try again.",
    backToLogin: "Back to Login",
    sending: "Sending...",
    invalidResetToken: "Invalid or expired reset token",
    invalidTokenTitle: "Invalid Token",
    resetPassword: "Reset Password",
    resetPasswordSubtitle: "Enter your new password",
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password",
    resetting: "Resetting...",
    resetPasswordButton: "Reset Password",
    passwordsDontMatch: "Passwords do not match",
    passwordTooShort: "Password must be at least 6 characters long",
    passwordResetSuccess:
      "Password has been reset successfully! You can now login with your new password.",
  },
  profile: {
    profile: "Profile",
    accountInformation: "Account Information",
    email: "Email",
    emailVerified: "Email Verified",
    accountCreated: "Account Created",
    yes: "Yes",
    no: "No",
    accountActions: "Account Actions",
    changePassword: "Change Password",
    cancelChangePassword: "Cancel Change Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password",
    updatePassword: "Update Password",
    logout: "Logout",
    passwordChanged: "Password changed successfully!",
    passwordsNotMatch: "New passwords do not match",
    passwordLength: "Password must be at least 6 characters long",
    invalidPassword: "Invalid email or password",
    registrationFailed: "Registration failed. Please try again.",
    invalidCode: "Invalid or expired verification code",
    emailVerifiedSuccess:
      "Email verified successfully! Redirecting to dashboard...",
    changeEmail: "Change Email",
    cancelChangeEmail: "Cancel Change Email",
    newEmail: "New Email",
    updateEmail: "Update Email",
    emailChanged: "Email changed successfully!",
    emailChangeFailed: "Email change failed. Please try again.",
    invalidEmailFormat: "Invalid email format",
    emailNotChanged: "New email must be different from current email",
  },
  chats: {
    chats: "Chats",
    chatHistory: "Chat History",
    historyWillAppear: "History will appear later",
    backToSessions: "Back to Sessions",
    loadingMessages: "Loading messages...",
    them: "Them",
    suggestion: "Suggestion",
    noMessages: "No messages in this session",
  },
  apiStatus: {
    apisProviderStatus: "API Services Status",
    coreInference: "Core Inference",
    llmServices: "LLM Services",
    inferenceServices: "Inference Services",
    audioServices: "Audio & Transcription",
    active: "Valid",
    inactive: "Invalid",
  },
  footer: {
    copyright: "Brave Monkey App. All rights reserved.",
    loveCapuchins: "Love capuchins, they are cool ! 🐵",
  },
  language: {
    english: "English",
    russian: "Russian",
  },
  landing: {
    subtitle: "AI assistant for interviews",
    description:
      "A stealth AI assistant that helps you during programmer interviews in real-time. Provides answers, analyzes questions.",
    getStarted: "Get Started",
    featuresTitle: "Features",
    feature1Title: "Real-time Analysis",
    feature1Desc:
      "Analyzes what's happening on your screen and audio, providing relevant hints",
    feature2Title: "Stealth Mode",
    feature2Desc: "Works over all windows but invisible to recording systems",
    feature4Title: "Free Models",
    feature4Desc: "Uses only free AI models from leading companies",
    uspTitle: "Tired of interviews?",
    uspDescription:
      "An AI assistant that helps you during programmer interviews in real-time. Because those interview questions about things you'll never use at work can be exhausting.",
    benefit1:
      "Incognito mode: Overlay is invisible to Zoom, Google Meet, OBS and other recording systems",
    benefit2:
      "Real-time: Real-time screen and audio analysis with instant responses",
    benefit3: "AI-Powered Assistance: Smart responses to help you succeed",
    benefit4:
      "Advanced Algorithms: Cutting-edge technology for superior results",
    ctaTitle: "Ready to get started?",
    ctaDescription:
      "Join thousands of professionals already using Brave Monkey to enhance their effectiveness in the interviews",
  },
  chatDemo: {
    question1: "What is garbage collector in Golang?",
    answer1:
      "Go uses a concurrent, tri-color, mark-and-sweep garbage collector. It works by: \\n1. Mark phase: identifies reachable objects.\\n2. Sweep phase: reclaims memory from unreachable objects.\\nIt's optimized for low latency (sub-millisecond pause times).",
    question2: "Screenshot detected: TwoSum problem on LeetCode.",
    answer2:
      "Optimal solution for TwoSum using Hash Map (O(n) time complexity):\\n\\n```go\\nfunc twoSum(nums []int, target int) []int {\\n    m := make(map[int]int)\\n    for i, n := range nums {\\n        if idx, ok := m[target-n]; ok {\\n            return []int{idx, i}\\n        }\\n        m[n] = i\\n    }\\n    return nil\\n}\\n```",
  },
  validation: {
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email address",
    passwordRequired: "Password is required",
    passwordTooShort: "Password must be at least 6 characters long",
    passwordTooLong: "Password must be no more than 128 characters long",
    passwordRequirements:
      "Password must contain at least one letter and one number",
    passwordsNotMatch: "Passwords do not match",
    confirmPasswordRequired: "Please confirm your password",
    currentPasswordRequired: "Current password is required",
  },
  download: {
    title: "Download",
    subtitle: "Download the latest version",
    windows: "Windows",
    macos: "macOS",
    windowsVersion: "Version: 1.0.0",
    macosVersion: "Version: 1.0.0",
    windowsRequirements: "Requirements: Windows 10 or later",
    macosRequirements: "Requirements: macOS 10.15 or later",
    downloadButton: "Download",
  },
  telegramSupport: {
    title: "Technical Support",
    description: "You can contact us via Telegram or send a message through the form:",
    placeholder: "Enter your message...",
    send: "Send",
    sending: "Sending...",
    goToTelegram: "Go to Telegram",
    close: "Close",
    openSupportChat: "Open Telegram Support Chat",
    messageSent: "Message sent! We will contact you on Telegram."
  },
  faq: {
    title: "Frequently Asked Questions",
    searchPlaceholder: "Search questions...",
    noResults: "No questions found matching your search",
    questions: {
      q1: {
        question: "Where can I get API keys?",
        answer: "Register on OpenRouter, Groq Cloud, Google AI Studio or Hugging Face Settings. Keys are entered directly in the app interface (Settings)."
      },
      q2: {
        question: "Why does Groq return 403?",
        answer: "Groq blocks requests from Russia/Belarus. Make sure your Xray config or Happ app is working correctly. The backend logs status: 'Internal Xray is UP'."
      },
      q3: {
        question: "How do I run the backend?",
        answer: "To run the backend, you need to: 1) Get access from the administrator, 2) Login to GitHub Container Registry with your token, 3) Pull the image: docker pull ghcr.io/ibravemonkey/brave-monkey-backend:latest, 4) Run with Docker Compose using the provided docker-compose.yml file."
      },
      q4: {
        question: "What are the key features of Brave Monkey?",
        answer: "Smart LLM Orchestration, Zero-Config Backend, Smart Proxy Guard, Stealth Overlay (macOS), Local Privacy, and Groq STT."
      },
      q5: {
        question: "How does the Smart Proxy work?",
        answer: "The system automatically determines the optimal path for your requests. If you have Happ running (or any app with SOCKS5 on port 1088), requests go through it. If Happ is off, the backend starts Xray inside the container."
      },
      q6: {
        question: "What are the system requirements?",
        answer: "Docker & Docker Compose, Node.js (LTS) & npm. For macOS, you'll also need the overlay helper in the bin/ folder."
      },
      q7: {
        question: "How do I configure API keys?",
        answer: "After running the backend, create a .env file in the same directory with your API keys (GEMINI_API_KEY, GROQ_API_KEY, etc.) and restart the service with 'docker compose up -d'."
      },
      q8: {
        question: "How does audio support work?",
        answer: "The app supports speech recognition via Groq API with automatic fallback to backup providers (Deepgram, AssemblyAI) if the main service is unavailable. If all audio services are unavailable, the app automatically switches to text input mode."
      }
    }
  },
};

// Russian translations
export const ru = {
  dashboard: {
    welcome: "С возвращением",
    personalDashboard:
      "Это ваш личный кабинет, где вы можете управлять своей учетной записью и активностью.",
    totalChats: "Всего чатов",
    messagesSent: "Отправлено сообщений",
    activeSessions: "Активные сессии",
    accountAge: "Возраст аккаунта",
  },
  navigation: {
    dashboard: "Панель управления",
    chats: "Чаты",
    apiStatus: "Статус API",
    profile: "Профиль",
    download: "Скачать",
    faq: "FAQ",
  },
  auth: {
    login: "Вход",
    register: "Регистрация",
    email: "Электронная почта",
    password: "Пароль",
    confirmPassword: "Подтвердите пароль",
    alreadyHaveAccount: "Уже есть аккаунт?",
    dontHaveAccount: "Нет аккаунта?",
    registerHere: "Зарегистрироваться",
    loginHere: "Войти",
    verifyEmail: "Подтверждение электронной почты",
    verificationCode: "Код подтверждения",
    verifyEmailButton: "Подтвердить электронную почту",
    enterSixDigitCode:
      "Пожалуйста, введите 6-значный код подтверждения, который появился в консоли сервера после регистрации.",
    forgotPassword: "Забыли пароль?",
    forgotPasswordSubtitle:
      "Введите вашу электронную почту, и мы вышлем ссылку для сброса пароля",
    sendResetLink: "Отправить ссылку",
    passwordResetLinkSent:
      "Ссылка для сброса пароля отправлена на вашу электронную почту",
    passwordResetFailed:
      "Ошибка сброса пароля. Пожалуйста, попробуйте еще раз.",
    backToLogin: "Вернуться к входу",
    sending: "Отправка...",
    invalidResetToken: "Неверный или просроченный токен сброса",
    invalidTokenTitle: "Неверный токен",
    resetPassword: "Сброс пароля",
    resetPasswordSubtitle: "Введите ваш новый пароль",
    newPassword: "Новый пароль",
    confirmNewPassword: "Подтвердите новый пароль",
    resetting: "Сброс...",
    resetPasswordButton: "Сбросить пароль",
    passwordsDontMatch: "Пароли не совпадают",
    passwordTooShort: "Пароль должен содержать не менее 6 символов",
    passwordResetSuccess:
      "Пароль успешно сброшен! Теперь вы можете войти с новым паролем.",
  },
  profile: {
    profile: "Профиль",
    accountInformation: "Информация об аккаунте",
    email: "Электронная почта",
    emailVerified: "Электронная почта подтверждена",
    accountCreated: "Аккаунт создан",
    yes: "Да",
    no: "Нет",
    accountActions: "Действия с аккаунтом",
    changePassword: "Изменить пароль",
    cancelChangePassword: "Отменить изменение пароля",
    currentPassword: "Текущий пароль",
    newPassword: "Новый пароль",
    confirmNewPassword: "Подтвердите новый пароль",
    updatePassword: "Обновить пароль",
    logout: "Выйти",
    passwordChanged: "Пароль успешно изменен!",
    passwordsNotMatch: "Новые пароли не совпадают",
    passwordLength: "Пароль должен содержать не менее 6 символов",
    invalidPassword: "Неверный адрес электронной почты или пароль",
    registrationFailed: "Ошибка регистрации. Пожалуйста, попробуйте снова.",
    invalidCode: "Неверный или просроченный код подтверждения",
    emailVerifiedSuccess:
      "Электронная почта подтверждена! Перенаправление на панель управления...",
    changeEmail: "Изменить Email",
    cancelChangeEmail: "Отменить изменение Email",
    newEmail: "Новый Email",
    updateEmail: "Обновить Email",
    emailChanged: "Email успешно изменен!",
    emailChangeFailed: "Ошибка изменения Email. Пожалуйста, попробуйте снова.",
    invalidEmailFormat: "Неверный формат email",
    emailNotChanged: "Новый email должен отличаться от текущего",
  },
  chats: {
    chats: "Чаты",
    chatHistory: "История чатов",
    historyWillAppear: "История появится позже",
    backToSessions: "Назад к списку",
    loadingMessages: "Загрузка сообщений...",
    them: "Собеседник",
    suggestion: "Предложение",
    noMessages: "Нет сообщений в этой сессии",
  },
  apiStatus: {
    apisProviderStatus: "Статус сервисов API",
    coreInference: "Инференс-ядро",
    llmServices: "Сервисы LLM",
    inferenceServices: "Сервисы инференса",
    audioServices: "Аудио и транскрибация",
    active: "Валиден",
    inactive: "Невалиден",
  },
  footer: {
    copyright: "Brave Monkey App. Все права защищены.",
    loveCapuchins: "Люблю капуцин, они прикольные! 🐵",
  },
  language: {
    english: "Английский",
    russian: "Русский",
  },
  landing: {
    subtitle: "AI-помощник для собеседований",
    description:
      "Скрытный AI-ассистент, который помогает вам во время собеседований на программиста в реальном времени. Подсказывает ответы, анализирует вопросы.",
    getStarted: "Начать",
    featuresTitle: "Возможности",
    feature1Title: "Анализ в реальном времени",
    feature1Desc:
      "Анализирует происходящее на экране и в аудио, предоставляя актуальные подсказки",
    feature2Title: "Незаметный режим",
    feature2Desc: "Работает поверх всех окон, но невидим для систем записи",
    feature4Title: "Бесплатные модели",
    feature4Desc: "Использует только бесплатные AI-модели от ведущих компаний",
    uspTitle: "Достали собесы?",
    uspDescription:
      "AI-ассистент, который помогает вам во время собеседований на программиста в реальном времени. Ведь эти вопросы на собеседованиях о том, что вам на работе маловероятно пригодится, могут утомлять.",
    benefit1:
      "Инкогнито режим: Оверлей невидим для Zoom, Google Meet, OBS и других систем записи",
    benefit2:
      "Реальное время: Анализ экрана и аудио в реальном времени с мгновенными ответами",
    benefit3: "AI-помощь: Умные ответы, которые помогут вам преуспеть",
    benefit4:
      "Передовые алгоритмы: Передовые технологии для превосходных результатов",
    ctaTitle: "Готовы начать?",
    ctaDescription:
      "Присоединяйтесь к тысячам профессионалов, которые уже используют Brave Monkey для повышения эффективности в собеседованиях",
  },
  chatDemo: {
    question1: "Что такое сборщик мусора в Golang?",
    answer1:
      "Go использует конкурентный, трехцветный, пометочный сборщик мусора. Он работает следующим образом: \\n1. Фаза пометки: идентифицирует достижимые объекты.\\n2. Фаза очистки: освобождает память из недостижимых объектов.\\nОптимизирован для низкой задержки (время паузы в микросекундах).",
    question2: "Обнаружено изображение: задача TwoSum на LeetCode.",
    answer2:
      "Оптимальное решение TwoSum с использованием хеш-таблицы (O(n) по времени):\\n\\n```go\\nfunc twoSum(nums []int, target int) []int {\\n    m := make(map[int]int)\\n    for i, n := range nums {\\n        if idx, ok := m[target-n]; ok {\\n            return []int{idx, i}\\n        }\\n        m[n] = i\\n    }\\n    return nil\\n}\\n```",
  },
  validation: {
    emailRequired: "Email обязателен",
    emailInvalid: "Пожалуйста, введите действительный адрес электронной почты",
    passwordRequired: "Пароль обязателен",
    passwordTooShort: "Пароль должен содержать не менее 6 символов",
    passwordTooLong: "Пароль должен содержать не более 128 символов",
    passwordRequirements:
      "Пароль должен содержать хотя бы одну букву и одну цифру",
    passwordsNotMatch: "Пароли не совпадают",
    confirmPasswordRequired: "Пожалуйста, подтвердите ваш пароль",
    currentPasswordRequired: "Текущий пароль обязателен",
  },
  download: {
    title: "Скачать",
    subtitle: "Скачайте последнюю версию",
    windows: "Windows",
    macos: "macOS",
    windowsVersion: "Версия: 1.0.0",
    macosVersion: "Версия: 1.0.0",
    windowsRequirements: "Требования: Windows 10 или новее",
    macosRequirements: "Требования: macOS 10.15 или новее",
    downloadButton: "Скачать",
  },
  telegramSupport: {
    title: "Техническая поддержка",
    description: "Вы можете связаться с нами через Telegram или отправить сообщение через форму:",
    placeholder: "Введите ваше сообщение...",
    send: "Отправить",
    sending: "Отправка...",
    goToTelegram: "Перейти в Telegram",
    close: "Закрыть",
    openSupportChat: "Открыть чат поддержки Telegram",
    messageSent: "Сообщение отправлено! Мы свяжемся с вами в Telegram."
  },
  faq: {
    title: "Часто задаваемые вопросы",
    searchPlaceholder: "Поиск вопросов...",
    noResults: "Не найдено вопросов, соответствующих вашему запросу",
    questions: {
      q1: {
        question: "Где можно получить API-ключи?",
        answer: "Зарегистрируйтесь на OpenRouter, Groq Cloud, Google AI Studio или Hugging Face Settings. Ключи вводятся непосредственно в интерфейсе приложения (Настройки)."
      },
      q2: {
        question: "Почему Groq возвращает 403?",
        answer: "Groq блокирует запросы из России/Беларуси. Убедитесь, что ваша конфигурация Xray или приложение Happ работает корректно. Бэкенд логирует статус: 'Internal Xray is UP'."
      },
      q3: {
        question: "Как запустить бэкенд?",
        answer: "Для запуска бэкенда необходимо: 1) Получить доступ от администратора, 2) Войти в GitHub Container Registry с помощью токена, 3) Загрузить образ: docker pull ghcr.io/ibravemonkey/brave-monkey-backend:latest, 4) Запустить с помощью Docker Compose, используя предоставленный файл docker-compose.yml."
      },
      q4: {
        question: "Каковы ключевые особенности Brave Monkey?",
        answer: "Умная оркестрация LLM, бэкенд без настройки, защита умного прокси, скрытый оверлей (macOS), локальная конфиденциальность и Groq STT."
      },
      q5: {
        question: "Как работает умный прокси?",
        answer: "Система автоматически определяет оптимальный путь для ваших запросов. Если у вас запущен Happ (или любое приложение с SOCKS5 на порту 1088), запросы проходят через него. Если Happ выключен, бэкенд запускает Xray внутри контейнера."
      },
      q6: {
        question: "Каковы системные требования?",
        answer: "Docker & Docker Compose, Node.js (LTS) & npm. Для macOS вам также понадобится помощник оверлея в папке bin/."
      },
      q7: {
        question: "Как настроить API-ключи?",
        answer: "После запуска бэкенда создайте файл .env в той же директории с вашими API-ключами (GEMINI_API_KEY, GROQ_API_KEY и т.д.) и перезапустите сервис командой 'docker compose up -d'."
      },
      q8: {
        question: "Как работает поддержка аудио?",
        answer: "Приложение поддерживает распознавание речи через Groq API с автоматическим переключением на резервных поставщиков (Deepgram, AssemblyAI) в случае недоступности основного сервиса. Если все аудио-сервисы недоступны, приложение автоматически переходит в режим текстового ввода."
      }
    }
  },
};
