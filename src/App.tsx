import React, { useState, useEffect } from 'react';
import { Camera, Star, Truck, Upload, Mail, Phone, MessageCircle, Clock, Shield, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useKeenSlider } from 'keen-slider/react';
import { motion, AnimatePresence } from 'framer-motion';
import "keen-slider/keen-slider.min.css";

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold flex items-center gap-2">
          📌 {question}
        </span>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pt-4 pb-2 text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    loop: true,
    mode: "snap",
  });

  const [examplesSliderRef, examplesInstanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      perView: 3,
      spacing: 20,
    },
    loop: true,
    mode: "snap",
    breakpoints: {
      '(max-width: 768px)': {
        slides: {
          perView: 1,
          spacing: 10,
        },
      },
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (instanceRef.current) {
        instanceRef.current.next();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const faqItems = [
    {
      question: "Яка різниця між звичайним друком і друком на плівці?",
      answer: "Звичайний друк — це цифровий процес, який з часом може втратити яскравість. Друк на плівці — це хімічне нанесення кольору, що проникає в структуру матеріалу. Це забезпечує натуральну глибину кольору, плавні переходи та гарантує довговічність на десятки років."
    },
    {
      question: "Чи справді фото зберігаються 100 років?",
      answer: "Так! Завдяки хімічному нанесенню фарб і спеціальному плівковому матеріалу, зображення не вигорають, не стираються та не втрачають чіткості навіть через 100 років."
    },
    {
      question: "Яка мінімальна кількість фото для замовлення?",
      answer: "Мінімальне замовлення — 20 фото. Вартість залежить від обсягу: чим більше фото, тим нижча ціна за одиницю."
    },
    {
      question: "Які формати фото підходять?",
      answer: "Ми приймаємо всі популярні формати: JPG, PNG, TIFF. Бажано, щоб фото мали хорошу якість — не менше 1500 пікселів по ширині."
    },
    {
      question: "Чи можна надрукувати чорно-білі фото?",
      answer: "Звісно! Чорно-білі знімки виглядають особливо атмосферно на плівці. Вони зберігають характерну глибину і стають ще більш емоційними."
    },
    {
      question: "Чи редагуєте ви фото перед друком?",
      answer: "Ми не змінюємо фото без вашого запиту. Але якщо ви хочете — можемо трохи підкоригувати світло, контраст або зробити базову ретуш (за додаткову плату)."
    },
    {
      question: "Скільки часу займає друк?",
      answer: "Зазвичай від 2 до 5 робочих днів, залежно від обсягу замовлення. Ми повідомимо точні терміни після прийому ваших фото."
    },
    {
      question: "Як я отримаю свої фото?",
      answer: "Ви можете отримати замовлення Новою Поштою або самовивозом у місті доставки. Ми завжди надсилаємо номер ТТН одразу після відправки."
    },
    {
      question: "Чи можна надрукувати старі скановані фото?",
      answer: "Так! Якщо скан має гарну роздільну здатність, ми з радістю перетворимо ваші старі фото у вічні спогади на плівці."
    },
    {
      question: "Оплата тільки по повній предоплаті?",
      answer: "Це рахується як індивідуальне замовлення тому воно тільки по повній предоплаті."
    }
  ];

  return (
    <div className="min-h-screen bg-film-light">
      {/* Hero Section */}
      <section className="min-h-screen bg-gray-100 relative overflow-hidden">
        <div className="container mx-auto px-4 pt-20 pb-12">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-5xl md:text-6xl font-bold mb-12 text-center text-film-primary"
          >
            Друк фото на плівці, який збережеться на 100 років
          </motion.h1>

          <div className="max-w-5xl mx-auto mb-12">
            <div ref={sliderRef} className="keen-slider rounded-xl overflow-hidden shadow-2xl">
              {[
                "https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
                "https://images.unsplash.com/photo-1501560379-05951a742668",
                "https://images.unsplash.com/photo-1551316679-9c6ae9dec224"
              ].map((src, idx) => (
                <div key={idx} className="keen-slider__slide">
                  <img src={src} alt={`Slide ${idx + 1}`} className="w-full h-[500px] object-cover" />
                </div>
              ))}
            </div>
            {loaded && instanceRef.current && (
              <div className="flex justify-center gap-2 mt-4">
                {[...Array(instanceRef.current.track.details.slides.length)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => instanceRef.current?.moveToIdx(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentSlide === idx ? "bg-film-secondary w-6" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="relative backdrop-blur-md bg-white/30 p-8 rounded-2xl max-w-4xl mx-auto mb-12">
            <p className="text-xl md:text-2xl mb-8 text-film-primary text-center">
              Хімічне нанесення кольору. Без вицвітання. Максимальна чіткість, глибина та збереження спогадів.
            </p>
            <div className="flex justify-between items-center flex-wrap gap-8">
              <div className="flex items-center gap-4">
                <span className="text-2xl line-through text-gray-500">від 17 грн</span>
                <span className="text-3xl font-bold text-film-secondary animate-pulse">від 10 грн</span>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-film-secondary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all flex items-center gap-2"
              >
                📦 Замовити зараз
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-film-primary to-film-dark text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="text-center p-6 rounded-lg backdrop-blur-sm bg-white/5">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-16 h-16 mx-auto mb-4 bg-film-secondary rounded-full flex items-center justify-center"
              >
                <Camera className="w-8 h-8" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">Професійна якість</h3>
              <p>Друк на професійному обладнанні з використанням найкращих матеріалів</p>
            </div>
            <div className="text-center p-6 rounded-lg backdrop-blur-sm bg-white/5">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-16 h-16 mx-auto mb-4 bg-film-accent rounded-full flex items-center justify-center"
              >
                <Clock className="w-8 h-8" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">Швидке виконання</h3>
              <p>Виготовлення та відправка протягом 24 годин</p>
            </div>
            <div className="text-center p-6 rounded-lg backdrop-blur-sm bg-white/5">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-16 h-16 mx-auto mb-4 bg-film-secondary rounded-full flex items-center justify-center"
              >
                <Shield className="w-8 h-8" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">100% гарантія</h3>
              <p>Повернення коштів, якщо якість вас не влаштує</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-12 text-film-primary"
          >
            Що таке друк на плівці і чому це варто обрати?
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg mb-8 text-film-primary">
                Друк на плівці — це не просто спосіб зберегти фотографії. Це технологія, яка зберігає колір, емоції та чіткість на 100 років. Ми використовуємо хімічне нанесення кольору, що виключає вицвітання чи стирання. Кожен кадр виглядає так, ніби зроблений вчора — навіть через десятиліття.
              </p>
              <div className="space-y-4">
                {[
                  "Збереження кольору 100 років",
                  "Хімічне нанесення – жодної \"цифрової плоскої\" якості",
                  "Без вицвітання навіть при зберіганні на світлі",
                  "Глибокий, кінематографічний вигляд",
                  "Натуральна структура зображення"
                ].map((text, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-film-secondary">✅</span>
                    <span>{text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1588492846515-fed960781e48?auto=format&fit=crop&q=80" 
                alt="Film print example" 
                className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Ціни на друк</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left">Кількість фото</th>
                    <th className="px-6 py-4 text-left">Ціна за 1 шт</th>
                    <th className="px-6 py-4 text-left">Загальна сума</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { qty: '100+', price: 10, total: '1000+' },
                    { qty: '80+', price: 11, total: '880+' },
                    { qty: '60+', price: 12, total: '720+' },
                    { qty: '50+', price: 13, total: '650+' },
                    { qty: '40+', price: 14, total: '560+' },
                    { qty: '20+', price: 15, total: '300+' },
                  ].map((row, i) => (
                    <tr key={i} className="border-t">
                      <td className="px-6 py-4">від {row.qty}</td>
                      <td className="px-6 py-4">{row.price} грн</td>
                      <td className="px-6 py-4">від {row.total} грн</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center mt-4 text-gray-600">
              Мінімальне замовлення — 20 фото.
            </p>
          </div>
        </div>
      </section>

      {/* How to Order Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Як зробити замовлення?
          </h2>
          <div className="grid md:grid-cols-5 gap-8 max-w-4xl mx-auto">
            {[
              { icon: <Upload className="w-8 h-8" />, text: "Завантаж свої фото через форму або надішли на email/Telegram" },
              { icon: <Camera className="w-8 h-8" />, text: "Обери кількість (мінімум 20 штук) та підтверди ціну" },
              { icon: <Star className="w-8 h-8" />, text: "Оплати замовлення (передоплата 100%)" },
              { icon: <Shield className="w-8 h-8" />, text: "Ми надрукуємо фото з хімічним нанесенням" },
              { icon: <Truck className="w-8 h-8" />, text: "Отримай своє замовлення Новою Поштою або самовивіз" },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {step.icon}
                </div>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Реальні приклади нашої роботи
          </h2>
          <div className="relative">
            <div ref={examplesSliderRef} className="keen-slider">
              {[
                "https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
                "https://images.unsplash.com/photo-1501560379-05951a742668",
                "https://images.unsplash.com/photo-1551316679-9c6ae9dec224",
                "https://images.unsplash.com/photo-1549880338-65ddcdfd017b",
                "https://images.unsplash.com/photo-1544198365-f5d60b6d8190",
                "https://images.unsplash.com/photo-1509023464722-18d996393ca8",
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
                "https://images.unsplash.com/photo-1520962880247-cfaf541c8724",
                "https://images.unsplash.com/photo-1519681393784-d120267933ba",
                "https://images.unsplash.com/photo-1542224566-6e85f2e6772f"
              ].map((src, idx) => (
                <div key={idx} className="keen-slider__slide">
                  <img 
                    src={src} 
                    alt={`Example ${idx + 1}`}
                    className="w-full h-[400px] object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-12"
          >
            Часті запитання
          </motion.h2>
          <div className="max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Що кажуть наші клієнти?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                text: "Я не вірив, що різниця буде настільки відчутною. Тепер замовлятиму тільки так!",
                author: "Ігор, Київ"
              },
              {
                text: "Ці фото — як з фільму. Просто вау. Жодного вигорання!",
                author: "Аліна, Львів"
              },
              {
                text: "Мама розплакалась, коли побачила наші старі знімки, надруковані по-новому.",
                author: "Олена, Харків"
              }
            ].map((review, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="mb-4">{review.text}</p>
                <p className="font-semibold">— {review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Зв'язок та замовлення
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
              <div className="flex justify-between items-center mb-8 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-gray-500 mb-1">Звичайна ціна</p>
                  <p className="text-2xl line-through text-gray-400">від 17 грн</p>
                </div>
                <div className="text-center">
                  <p className="text-film-secondary mb-1">Спеціальна пропозиція</p>
                  <p className="text-3xl font-bold text-film-secondary animate-pulse">від 10 грн</p>
                </div>
              </div>
              <form className="space-y-6">
                <div>
                  <label className="block mb-2 font-medium">Ім'я</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-film-secondary focus:border-transparent transition-all" 
                    placeholder="Введіть ваше ім'я"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Телефон</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-film-secondary focus:border-transparent transition-all" 
                    placeholder="+38 (___) ___-__-__"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Кількість фото</label>
                  <input 
                    type="number" 
                    min="20" 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-film-secondary focus:border-transparent transition-all" 
                    placeholder="Мінімум 20 фото"
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-film-secondary text-white py-4 rounded-lg hover:bg-opacity-90 transition-all font-semibold text-lg flex items-center justify-center gap-2"
                >
                  📦 Надіслати замовлення
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-4xl font-bold mb-8">Гарантія якості</h2>
          <p className="text-lg">
            Ми настільки впевнені в якості нашого друку, що даємо 100% гарантію збереження кольору. 
            Якщо фото вицвітуть — ми надрукуємо їх знову за наш рахунок. Але цього ще ніколи не було 😉
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-film-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Контакти</h3>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +38 (099) 000-00-00
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  filmprint@example.com
                </p>
                <p className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Telegram/Instagram: @filmprint_ua
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Працюємо: Пн–Сб, 10:00–18:00
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Навігація</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-film-secondary transition-colors">Головна</a></li>
                <li><a href="#" className="hover:text-film-secondary transition-colors">Про нас</a></li>
                <li><a href="#" className="hover:text-film-secondary transition-colors">Послуги</a></li>
                <li><a href="#" className="hover:text-film-secondary transition-colors">Контакти</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Документи</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-film-secondary transition-colors">Політика конфіденційності</a></li>
                <li><a href="#" className="hover:text-film-secondary transition-colors">Договір оферти</a></li>
                <li><a href="#" className="hover:text-film-secondary transition-colors">Умови використання</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-white/10">
            <p>© 2025 FilmPrint. Всі права захищені.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;