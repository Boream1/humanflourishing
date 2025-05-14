
import React, { useState } from 'react';
import { Textarea } from './ui/textarea';
import { useLanguage } from '../context/LanguageContext';

const ReflectionActivity: React.FC = () => {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: ''
  });

  const handleChange = (question: keyof typeof answers) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers(prev => ({
      ...prev,
      [question]: e.target.value
    }));
  };

  const handleSubmit = (question: keyof typeof answers) => () => {
    console.log(`Submitted answer for ${question}:`, answers[question]);
    // Aquí podríamos implementar la lógica para guardar las respuestas
    alert(`Respuesta enviada para la pregunta ${question.replace('question', '')}`);
  };

  const handleReset = (question: keyof typeof answers) => () => {
    setAnswers(prev => ({
      ...prev,
      [question]: ''
    }));
  };

  const getCharacterCount = (text: string) => {
    return `${text.length} ${t('reflectionActivity.charCount')}`;
  };

  return (
    <div className="reflection-activity">
      <h2 className="section-heading">{t('reflectionActivity.title')}</h2>
      <p className="mb-8">{t('reflectionActivity.introduction')}</p>

      <div className="reflection-question">
        <div className="reflection-question-header">
          <div className="reflection-question-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
            </svg>
          </div>
          <h3 className="reflection-question-title">{t('reflectionActivity.question1')}</h3>
        </div>
        
        <Textarea 
          placeholder={t('reflectionActivity.placeholder')} 
          className="reflection-textarea" 
          value={answers.question1}
          onChange={handleChange('question1')}
          maxLength={1500}
        />
        
        <div className="reflection-controls">
          <span className="char-count">{getCharacterCount(answers.question1)}</span>
          <div className="reflection-buttons">
            <button 
              className="reflection-button reflection-button-reset" 
              onClick={handleReset('question1')}
            >
              Reset
            </button>
            <button 
              className="reflection-button reflection-button-submit" 
              onClick={handleSubmit('question1')}
              disabled={!answers.question1.trim()}
            >
              {t('reflectionActivity.submit')}
            </button>
          </div>
        </div>
      </div>

      <div className="reflection-question">
        <div className="reflection-question-header">
          <div className="reflection-question-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h3 className="reflection-question-title">{t('reflectionActivity.question2')}</h3>
        </div>
        
        <Textarea 
          placeholder={t('reflectionActivity.placeholder')} 
          className="reflection-textarea" 
          value={answers.question2}
          onChange={handleChange('question2')}
          maxLength={1500}
        />
        
        <div className="reflection-controls">
          <span className="char-count">{getCharacterCount(answers.question2)}</span>
          <div className="reflection-buttons">
            <button 
              className="reflection-button reflection-button-reset" 
              onClick={handleReset('question2')}
            >
              Reset
            </button>
            <button 
              className="reflection-button reflection-button-submit" 
              onClick={handleSubmit('question2')}
              disabled={!answers.question2.trim()}
            >
              {t('reflectionActivity.submit')}
            </button>
          </div>
        </div>
      </div>

      <div className="reflection-question">
        <div className="reflection-question-header">
          <div className="reflection-question-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </div>
          <h3 className="reflection-question-title">{t('reflectionActivity.question3')}</h3>
        </div>
        
        <Textarea 
          placeholder={t('reflectionActivity.placeholder')} 
          className="reflection-textarea" 
          value={answers.question3}
          onChange={handleChange('question3')}
          maxLength={1500}
        />
        
        <div className="reflection-controls">
          <span className="char-count">{getCharacterCount(answers.question3)}</span>
          <div className="reflection-buttons">
            <button 
              className="reflection-button reflection-button-reset" 
              onClick={handleReset('question3')}
            >
              Reset
            </button>
            <button 
              className="reflection-button reflection-button-submit" 
              onClick={handleSubmit('question3')}
              disabled={!answers.question3.trim()}
            >
              {t('reflectionActivity.submit')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReflectionActivity;
