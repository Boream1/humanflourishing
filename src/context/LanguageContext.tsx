
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    "home": "Home",
    "lesson1": "LESSON 1: Being Human",
    "lesson2": "LESSON 2: Cultivating Awareness: Emotions and Cognition",
    "selectLanguage": "Select Language",
    "english": "English",
    "spanish": "Spanish",
    "previousChapter": "Previous Chapter",
    "nextChapter": "Next Chapter",
    "backToHome": "Back to Home",
    // Chapter 1 translations
    "chapter1.title": "LESSON 1: Being Human",
    "chapter1.objective1": "Appreciate the complexity of human beings",
    "chapter1.objective2": "Understand the human need for social connection",
    "chapter1.objective3": "Evaluate the role and paradox of human biases",
    "chapter1.section1.title": "What Does It Mean to Be Human?",
    "chapter1.section1.keyPoint": "As humans, we are programmed for survival. This instinct is still relevant in our lives today, even if we do not often face life-threatening situations. As a result, our brains may interpret certain events, such as an email or an exam, as a threat, even though these things are not life-threatening. Recognizing these kinds of 'primitive' responses as part of our human identity is a crucial step toward self-awareness and, ultimately, flourishing.",
    "chapter1.section2.title": "Being Human: The Interconnection of Body, Mind, and Soul",
    "chapter1.section2.keyPoint": "Understanding the interconnection of the body, mind, and soul is key to promoting well-being. For example, by understanding the relationship between the amygdala and the prefrontal cortex and how physical exercise can affect that relationship, we can take more informed actions to promote our overall health.",
    "chapter1.section3.title": "The Importance of Human Social Connection",
    "chapter1.section3.keyPoint": "As humans, we are wired for social connection. Research shows that meaningful social connection contributes to our happiness. In contrast, feelings of loneliness can have a significant detrimental impact on our well-being.",
    "chapter1.readings.title": "Readings",
    "chapter1.readings.intro": "Please complete the readings below to engage with the following activities:",
    "chapter1.readings.title1": "Why a strong social network improves performance, health, and well-being",
    "chapter1.readings.title2": "Your journey to self-discovery",
    "chapter1.section4.title": "Human Biases",
    "chapter1.section4.keyPoint": "As humans, we all have biases. These biases are rooted in the need for survival and exist as a way for our brains to make quick, efficient decisions; however, they can also negatively affect our well-being. By understanding our biases and how they function, we can better cultivate practices that contribute to our flourishing.",
    "chapter1.section5.title": "Leading Self for Greater Impact in What We Do",
    "chapter1.section6.title": "Closing Meditation: Lesson 1",
    "chapter1.optionalReadings.title": "Optional Reading",
    "chapter1.optionalReadings.intro": "Please complete the following readings if they are of interest to you!",
    "chapter1.optionalReadings.title1": "Warmth and Competence Model",
    "chapter1.optionalReadings.title2": "Human Connection in the Age of AI",
    
    // Chapter 2 translations
    "chapter2.title": "LESSON 2: Cultivating Awareness: Emotions and Cognition",
    "chapter2.objective1": "Understand the connection of emotion with values, thinking, and behavior",
    "chapter2.objective2": "Appreciate the utility of positive emotions for survival and how this shapes our perspective",
    "chapter2.objective3": "Understand metacognition and how to build deeper awareness",
    "chapter2.objective4": "Leverage the integration of body, mind, and soul to support our awareness, emotions, and cognition",
    "chapter2.section1.title": "What Are Emotions? What is Emotional Granularity?",
    "chapter2.section1.keyPoint": "Emotional granularity emphasizes the importance of recognizing the nuanced differences between various emotions. This elevated awareness of the range of emotions we experience can help us better interpret our emotional responses and shape our behaviors in a more productive manner.",
    "chapter2.readings.title": "Readings",
    "chapter2.readings.intro": "Please complete the following readings:",
    "chapter2.readings.title1": "The Wheel of Emotional Granularity",
    "chapter2.readings.title2": "The role of emotional granularity in emotional regulation, mental disorders, and well-being",
    "chapter2.activity1.title": "Activity: Reflecting on Emotional Granularity",
    "chapter2.activity1.description": "Can you identify a situation where you felt an emotion from the outermost circle of the wheel of emotional granularity? We encourage you to take your journal or a notebook and describe that situation and how you felt.",
    "chapter2.section2.title": "The Broaden and Build Theory",
    "chapter2.section2.keyPoint": "The Broaden and Build Theory, developed by Barbara Fredrickson, suggests that positive emotions broaden our awareness and visual field. As a result, we develop a greater appreciation of and ability to engage with the world around us.",
    "chapter2.section3.title": "Metacognition and Increasing Awareness",
    "chapter2.section3.keyPoint": "Metacognition is the concept of thinking about our thinking. Metacognition gives us a greater awareness of our thinking and learning so that we can be more proactive in our decision-making and work to avoid detrimental biases.",
    "chapter2.activity2.title": "Activity: Practicing Metacognition",
    "chapter2.activity2.description": "Now it's time to practice some ways to elevate your metacognition. Choose at least two of these practices and try them out!",
    "chapter2.activity2.practice1.title": "Journaling",
    "chapter2.activity2.practice1.description": "Writing down your thoughts, feelings, and experiences helps increase self-awareness and provides insights into your thinking patterns.",
    "chapter2.activity2.practice2.title": "Mindfulness",
    "chapter2.activity2.practice2.description": "Focusing your awareness on the present moment can reduce stress and improve cognitive clarity by preventing your mind from wandering.",
    "chapter2.activity2.practice3.title": "Take time to pause",
    "chapter2.activity2.practice3.description": "Deliberately pausing before reacting allows you to consider your thoughts and responses, leading to more thoughtful decision-making.",
    "chapter2.activity2.practice4.title": "Stand up and move around",
    "chapter2.activity2.practice4.description": "Physical movement can boost brain function and creativity, helping you think more clearly and effectively.",
    "chapter2.activity2.practice5.title": "Appreciate nature",
    "chapter2.activity2.practice5.description": "Spending time in nature, or even just looking through a window to appreciate the natural world, can reduce stress and enhance your mood, providing a fresh perspective and mental clarity.",
    "chapter2.activity2.practice6.title": "Connect with another human being",
    "chapter2.activity2.practice6.description": "Engaging in meaningful conversations can provide new insights and help you reflect on your own thoughts and feelings.",
    "chapter2.section4.title": "Awareness, Emotions, and Cognition Across Body, Mind, and Soul",
    "chapter2.activity3.title": "Activity: Leveraging Body, Mind, and Soul",
    "chapter2.activity3.description": "We can leverage the integration of body, mind, and soul to support our awareness, emotions, and cognition. Specifically, we can leverage aspects of the body, mind, and soul so that they enhance each other. For example, if we're feeling mentally sluggish at work, we can activate the body by going for a walk. By energizing the body through physical activity, we can energize the mind. Similarly, if we're feeling physically tired, we can tap into the soul by connecting with others. By energizing the soul with human connection, we can energize the body.",
    "chapter2.activity3.question": "Given these examples, what practices can you cultivate to better leverage the body, mind, and soul connection to support you in your flourishing?",
    "chapter2.section5.title": "An Integrated Approach to Learning",
    "chapter2.section6.title": "Closing Meditation: Lesson 2"
  },
  es: {
    "home": "Inicio",
    "lesson1": "LECCIÓN 1: Ser Humano",
    "lesson2": "LECCIÓN 2: Cultivando la Conciencia: Emociones y Cognición",
    "selectLanguage": "Seleccionar Idioma",
    "english": "Inglés",
    "spanish": "Español",
    "previousChapter": "Capítulo Anterior",
    "nextChapter": "Capítulo Siguiente",
    "backToHome": "Volver al Inicio",
    // Chapter 1 translations
    "chapter1.title": "LECCIÓN 1: Ser Humano",
    "chapter1.objective1": "Apreciar la complejidad de los seres humanos",
    "chapter1.objective2": "Comprender la necesidad humana de conexión social",
    "chapter1.objective3": "Evaluar el papel y la paradoja de los sesgos humanos",
    "chapter1.section1.title": "¿Qué Significa Ser Humano?",
    "chapter1.section1.keyPoint": "Como humanos, estamos programados para la supervivencia. Este instinto sigue siendo relevante en nuestras vidas hoy, incluso si no enfrentamos a menudo situaciones que amenazan la vida. Como resultado, nuestro cerebro puede interpretar ciertos eventos, como un correo electrónico o un examen, como una amenaza, aunque estas cosas no sean potencialmente mortales. Reconocer este tipo de respuestas 'primitivas' como parte de nuestra identidad humana es un paso crucial hacia el autoconocimiento y, en última instancia, hacia el florecimiento.",
    "chapter1.section2.title": "Ser Humano: La Interconexión del Cuerpo, la Mente y el Alma",
    "chapter1.section2.keyPoint": "Comprender la interconexión del cuerpo, la mente y el alma es clave para promover el bienestar. Por ejemplo, al comprender la relación entre la amígdala y la corteza prefrontal y cómo el ejercicio físico puede afectar esa relación, podemos tomar acciones más informadas para promover nuestra salud general.",
    "chapter1.section3.title": "La Importancia de la Conexión Social Humana",
    "chapter1.section3.keyPoint": "Como humanos, estamos programados para la conexión social. La investigación muestra que la conexión social significativa contribuye a nuestra felicidad. En contraste, los sentimientos de soledad pueden tener un impacto perjudicial significativo en nuestro bienestar.",
    "chapter1.readings.title": "Lecturas",
    "chapter1.readings.intro": "Por favor, complete las lecturas a continuación para participar en las siguientes actividades:",
    "chapter1.readings.title1": "Por qué una red social fuerte mejora el rendimiento, la salud y el bienestar",
    "chapter1.readings.title2": "Tu viaje de autodescubrimiento",
    "chapter1.section4.title": "Sesgos Humanos",
    "chapter1.section4.keyPoint": "Como humanos, todos tenemos sesgos. Estos sesgos están arraigados en la necesidad de supervivencia y existen como una forma para que nuestro cerebro tome decisiones rápidas y eficientes; sin embargo, también pueden afectar negativamente nuestro bienestar. Al comprender nuestros sesgos y cómo funcionan, podemos cultivar mejor prácticas que contribuyan a nuestro florecimiento.",
    "chapter1.section5.title": "Liderando a Uno Mismo para un Mayor Impacto en lo que Hacemos",
    "chapter1.section6.title": "Meditación de Cierre: Lección 1",
    "chapter1.optionalReadings.title": "Lectura Opcional",
    "chapter1.optionalReadings.intro": "¡Completa las siguientes lecturas si son de tu interés!",
    "chapter1.optionalReadings.title1": "Modelo de Calidez y Competencia",
    "chapter1.optionalReadings.title2": "Conexión Humana en la Era de la IA",
    
    // Chapter 2 translations
    "chapter2.title": "LECCIÓN 2: Cultivando la Conciencia: Emociones y Cognición",
    "chapter2.objective1": "Entender la conexión de la emoción con los valores, el pensamiento y el comportamiento",
    "chapter2.objective2": "Apreciar la utilidad de las emociones positivas para la supervivencia y cómo esto moldea nuestra perspectiva",
    "chapter2.objective3": "Comprender la metacognición y cómo construir una conciencia más profunda",
    "chapter2.objective4": "Aprovechar la integración del cuerpo, la mente y el alma para apoyar nuestra conciencia, emociones y cognición",
    "chapter2.section1.title": "¿Qué Son las Emociones? ¿Qué es la Granularidad Emocional?",
    "chapter2.section1.keyPoint": "La granularidad emocional enfatiza la importancia de reconocer las diferencias matizadas entre varias emociones. Esta elevada conciencia de la gama de emociones que experimentamos puede ayudarnos a interpretar mejor nuestras respuestas emocionales y dar forma a nuestros comportamientos de una manera más productiva.",
    "chapter2.readings.title": "Lecturas",
    "chapter2.readings.intro": "Por favor, complete las siguientes lecturas:",
    "chapter2.readings.title1": "La Rueda de la Granularidad Emocional",
    "chapter2.readings.title2": "El papel de la granularidad emocional en la regulación emocional, trastornos mentales y bienestar",
    "chapter2.activity1.title": "Actividad: Reflexionando sobre la Granularidad Emocional",
    "chapter2.activity1.description": "¿Puedes identificar una situación en la que sentiste una emoción del círculo más externo de la rueda de la granularidad emocional? Te animamos a tomar tu diario o un cuaderno y describir esa situación y cómo te sentiste.",
    "chapter2.section2.title": "La Teoría de Ampliar y Construir",
    "chapter2.section2.keyPoint": "La Teoría de Ampliar y Construir, desarrollada por Barbara Fredrickson, sugiere que las emociones positivas amplían nuestra conciencia y nuestro campo visual. Como resultado, desarrollamos una mayor apreciación y capacidad para interactuar con el mundo que nos rodea.",
    "chapter2.section3.title": "Metacognición y Aumento de la Conciencia",
    "chapter2.section3.keyPoint": "La metacognición es el concepto de pensar sobre nuestro pensamiento. La metacognición nos da una mayor conciencia de nuestro pensamiento y aprendizaje para que podamos ser más proactivos en nuestra toma de decisiones y trabajar para evitar sesgos perjudiciales.",
    "chapter2.activity2.title": "Actividad: Practicando la Metacognición",
    "chapter2.activity2.description": "Ahora es el momento de practicar algunas formas de elevar tu metacognición. ¡Elige al menos dos de estas prácticas y pruébalas!",
    "chapter2.activity2.practice1.title": "Llevar un diario",
    "chapter2.activity2.practice1.description": "Escribir tus pensamientos, sentimientos y experiencias ayuda a aumentar la autoconciencia y proporciona información sobre tus patrones de pensamiento.",
    "chapter2.activity2.practice2.title": "Mindfulness",
    "chapter2.activity2.practice2.description": "Enfocar tu atención en el momento presente puede reducir el estrés y mejorar la claridad cognitiva evitando que tu mente divague.",
    "chapter2.activity2.practice3.title": "Tómate tiempo para hacer una pausa",
    "chapter2.activity2.practice3.description": "Hacer una pausa deliberadamente antes de reaccionar te permite considerar tus pensamientos y respuestas, lo que lleva a una toma de decisiones más reflexiva.",
    "chapter2.activity2.practice4.title": "Levántate y muévete",
    "chapter2.activity2.practice4.description": "El movimiento físico puede impulsar la función cerebral y la creatividad, ayudándote a pensar con más claridad y eficacia.",
    "chapter2.activity2.practice5.title": "Aprecia la naturaleza",
    "chapter2.activity2.practice5.description": "Pasar tiempo en la naturaleza, o incluso solo mirar por una ventana para apreciar el mundo natural, puede reducir el estrés y mejorar tu estado de ánimo, proporcionando una perspectiva fresca y claridad mental.",
    "chapter2.activity2.practice6.title": "Conéctate con otro ser humano",
    "chapter2.activity2.practice6.description": "Participar en conversaciones significativas puede proporcionar nuevas perspectivas y ayudarte a reflexionar sobre tus propios pensamientos y sentimientos.",
    "chapter2.section4.title": "Conciencia, Emociones y Cognición a través del Cuerpo, la Mente y el Alma",
    "chapter2.activity3.title": "Actividad: Aprovechando el Cuerpo, la Mente y el Alma",
    "chapter2.activity3.description": "Podemos aprovechar la integración del cuerpo, la mente y el alma para apoyar nuestra conciencia, emociones y cognición. Específicamente, podemos aprovechar aspectos del cuerpo, la mente y el alma para que se mejoren mutuamente. Por ejemplo, si nos sentimos mentalmente lentos en el trabajo, podemos activar el cuerpo saliendo a caminar. Al energizar el cuerpo a través de la actividad física, podemos energizar la mente. De manera similar, si nos sentimos físicamente cansados, podemos conectar con el alma conectándonos con otros. Al energizar el alma con la conexión humana, podemos energizar el cuerpo.",
    "chapter2.activity3.question": "Dados estos ejemplos, ¿qué prácticas puedes cultivar para aprovechar mejor la conexión del cuerpo, la mente y el alma para apoyarte en tu florecimiento?",
    "chapter2.section5.title": "Un Enfoque Integrado del Aprendizaje",
    "chapter2.section6.title": "Meditación de Cierre: Lección 2"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Intentar recuperar el idioma del localStorage si existe
  const storedLanguage = typeof window !== "undefined" ? localStorage.getItem("language") as Language : "en";
  const [language, setLanguageState] = useState<Language>(storedLanguage || "en");

  // Función para traducir texto
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Función para cambiar el idioma y guardarlo en localStorage
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", newLanguage);
    }
  };

  // Guardar el idioma en localStorage cuando cambie
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook para usar el contexto de idioma
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
