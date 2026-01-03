import React, { useEffect, useState } from 'react';
import { useI18n } from '../../contexts/I18nContext';
import styles from './ChatsPage.module.css';
import { apiClient } from '../../api/apiClient';

interface ChatSession {
  sessionId: string;
  preview: string;
  timestamp: number;
  conversationHistory?: Array<{
    role: string;
    content: string;
    transcription?: string;
    ai_response?: string;
  }>;
}

const ChatsPage: React.FC = () => {
  const { t } = useI18n();
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(
    null
  );
  const [messagesLoading, setMessagesLoading] = useState(false);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<ChatSession[]>('/chats');
      if (response.success && response.data) {
        setChats(response.data);
      } else if (response.error) {
        setError(response.error);
      } else if (response.message) {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to load chats');
    } finally {
      setLoading(false);
    }
  };

  const handleSessionClick = async (session: ChatSession) => {
    try {
      setSelectedSession(session);
      setMessagesLoading(true);
      // Fetch full details including conversation history
      const response = await apiClient.get<ChatSession>(
        `/chats/${session.sessionId}`
      );
      if (response.success && response.data) {
        setSelectedSession({ ...session, ...response.data });
      }
    } catch (err) {
      console.error('Failed to load session details', err);
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedSession(null);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {selectedSession ? (
          <div className={styles.detailView}>
            <div className={styles.detailHeader}>
              <button onClick={handleBack} className={styles.backButton}>
                ← {t('chats.backToSessions') || 'Back'}
              </button>
              <div className={styles.detailDate}>
                {formatDate(selectedSession.timestamp)}
              </div>
            </div>

            <div className={styles.messagesContainer}>
              {messagesLoading ? (
                <div className={styles.loading}>
                  {t('chats.loadingMessages') || 'Loading messages...'}
                </div>
              ) : (
                selectedSession.conversationHistory?.map((msg, idx) => (
                  <div key={idx} className={styles.messageRow}>
                    {msg.role === 'user' || msg.transcription ? (
                      <div
                        className={`${styles.messageBubble} ${styles.userBubble}`}
                      >
                        <div className={styles.bubbleLabel}>
                          {t('chats.them') || 'Them'}
                        </div>
                        <div className={styles.bubbleContent}>
                          {msg.content || msg.transcription}
                        </div>
                      </div>
                    ) : null}

                    {msg.role === 'assistant' || msg.ai_response ? (
                      <div
                        className={`${styles.messageBubble} ${styles.aiBubble}`}
                      >
                        <div className={styles.bubbleLabel}>
                          {t('chats.suggestion') || 'Suggestion'}
                        </div>
                        <div className={styles.bubbleContent}>
                          {/* Basic whitespace preservation for now, ideally Markdown renderer */}
                          <pre className={styles.preContent}>
                            {msg.content || msg.ai_response}
                          </pre>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))
              )}
              {!messagesLoading &&
                (!selectedSession.conversationHistory ||
                  selectedSession.conversationHistory.length === 0) && (
                  <div className={styles.emptyState}>
                    {t('chats.noMessages') || 'No messages in this session'}
                  </div>
                )}
            </div>
          </div>
        ) : (
          <div className={styles.card}>
            <h1 className={styles.pageTitle}>{t('chats.chatHistory')}</h1>

            {loading && <div className={styles.loading}>Loading...</div>}
            {error && <p className={styles.error}>{error}</p>}

            {!loading && !error && chats.length === 0 && (
              <p className={styles.emptyState}>
                {t('chats.historyWillAppear')}
              </p>
            )}

            <div className={styles.chatList}>
              {chats.map(chat => (
                <div
                  key={chat.sessionId}
                  className={styles.chatItem}
                  onClick={() => handleSessionClick(chat)}
                >
                  <div className={styles.chatHeader}>
                    <span className={styles.chatDate}>
                      {formatDate(chat.timestamp)}
                    </span>
                  </div>
                  <div className={styles.chatPreview}>{chat.preview}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatsPage;
