import React, { useState } from 'react';
import { useI18n } from '../../contexts/I18nContext';
import { useTheme } from '../../contexts/ThemeContext';
import './FAQ.css';

const FAQ = () => {
  const { t } = useI18n();
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({});

  // Часто задаваемые вопросы
  const faqs = [
    {
      question: t('faq.questions.q1.question'),
      answer: t('faq.questions.q1.answer')
    },
    {
      question: t('faq.questions.q2.question'),
      answer: t('faq.questions.q2.answer')
    },
    {
      question: t('faq.questions.q3.question'),
      answer: t('faq.questions.q3.answer')
    },
    {
      question: t('faq.questions.q4.question'),
      answer: t('faq.questions.q4.answer')
    },
    {
      question: t('faq.questions.q5.question'),
      answer: t('faq.questions.q5.answer')
    },
    {
      question: t('faq.questions.q6.question'),
      answer: t('faq.questions.q6.answer')
    },
    {
      question: t('faq.questions.q7.question'),
      answer: t('faq.questions.q7.answer')
    },
    {
      question: t('faq.questions.q8.question'),
      answer: t('faq.questions.q8.answer')
    }
  ];

  // Фильтрация FAQ по поисковому запросу
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleQuestion = (index: number) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className={`faq-container ${theme}`}>
      <h2 className="faq-title">{t('faq.title')}</h2>
      
      <div className="faq-search-section">
        <input
          type="text"
          className="faq-search-input"
          placeholder={t('faq.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="faq-list">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div 
                className="faq-question" 
                onClick={() => toggleQuestion(index)}
              >
                <h3>{faq.question}</h3>
                <span className="faq-toggle-icon">
                  {expandedQuestions[index] ? '−' : '+'}
                </span>
              </div>
              
              {expandedQuestions[index] && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-results">
            {t('faq.noResults')}
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQ;