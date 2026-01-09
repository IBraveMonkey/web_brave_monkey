import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useI18n } from '../../contexts/I18nContext';
import './TelegramSupport.css';

const TelegramSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const { theme } = useTheme();
  const { t } = useI18n();

  const telegramUsername = '@testtesttest'; // Тестовый Telegram аккаунт
  const telegramUrl = `https://t.me/${telegramUsername.replace('@', '')}`;

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMessage('');
    setSendSuccess(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);

    // В реальном приложении здесь будет логика отправки сообщения в Telegram
    // Пока что просто имитируем отправку
    try {
      // Здесь будет API-вызов для отправки сообщения в Telegram
      console.log('Отправка сообщения в Telegram:', message);

      // Имитация задержки
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Сброс формы и показ сообщения об успехе
      setMessage('');
      setSendSuccess(true);

      // Автоматическое закрытие через 2 секунды
      setTimeout(() => {
        closeModal();
        setSendSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Иконка Telegram в правом нижнем углу */}
      <button
        className={`telegram-support-button ${theme}`}
        onClick={toggleModal}
        aria-label={t('telegramSupport.openSupportChat')}
      >
        <span className="telegram-icon">📟</span>
      </button>

      {/* Модальное окно */}
      {isOpen && (
        <div className="telegram-support-modal-overlay" onClick={closeModal}>
          <div className={`telegram-support-modal ${theme}`} onClick={(e) => e.stopPropagation()}>
            <div className="telegram-support-header">
              <h3>{t('telegramSupport.title')}</h3>
              <button className="close-button" onClick={closeModal} aria-label={t('telegramSupport.close')}>
                ×
              </button>
            </div>

            {sendSuccess ? (
              <div className="success-message">
                {t('telegramSupport.messageSent')}
              </div>
            ) : (
              <div className="telegram-support-content">
                <p>{t('telegramSupport.description')}</p>

                <form onSubmit={handleSendMessage} className="feedback-form">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('telegramSupport.placeholder')}
                    rows={4}
                    required
                    disabled={isSending}
                  />
                  <div className="form-buttons">
                    <button
                      type="submit"
                      className="send-button"
                      disabled={isSending || !message.trim()}
                    >
                      {isSending ? t('telegramSupport.sending') : t('telegramSupport.send')}
                    </button>
                    <a
                      href={telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="telegram-button"
                    >
                      {t('telegramSupport.goToTelegram')}
                    </a>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TelegramSupport;