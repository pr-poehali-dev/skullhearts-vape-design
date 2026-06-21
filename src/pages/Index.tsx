import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const SKULL_IMG = 'https://cdn.poehali.dev/projects/285025e8-62a6-4ac3-89f7-fd6bcef5ad76/files/2a0a65e8-d4c2-4753-b496-6aa7983b818c.jpg';
const VAPE_IMG = 'https://cdn.poehali.dev/projects/285025e8-62a6-4ac3-89f7-fd6bcef5ad76/files/79dce641-5684-4f62-b018-30e65bdb7bed.jpg';

const TELEGRAM = '@Ekaterinamoneys';

type Tab = 'home' | 'catalog' | 'reviews' | 'about' | 'contacts' | 'faq';

const NAV: { id: Tab; label: string; icon: string }[] = [
  { id: 'home', label: 'Главная', icon: 'House' },
  { id: 'catalog', label: 'Товары', icon: 'Package' },
  { id: 'reviews', label: 'Отзывы', icon: 'Star' },
  { id: 'about', label: 'О бренде', icon: 'Skull' },
  { id: 'contacts', label: 'Контакты', icon: 'Send' },
  { id: 'faq', label: 'FAQ', icon: 'CircleHelp' },
];

const PRODUCTS = [
  { id: 1, name: 'SKULL Nova X', desc: 'Pod-система, 1500 мАч', price: '3 990 ₽' },
  { id: 2, name: 'HEARTS Pulse Pro', desc: 'Бокс-мод, 80W, OLED', price: '6 490 ₽' },
  { id: 3, name: 'Phantom Mini', desc: 'Компактный pod, 900 мАч', price: '2 790 ₽' },
  { id: 4, name: 'Neon Reaper', desc: 'Сабомный мод, 100W', price: '7 990 ₽' },
  { id: 5, name: 'Cyber Drag S', desc: 'Pod-мод, регулировка', price: '5 290 ₽' },
  { id: 6, name: 'Voidwalker MTL', desc: 'Бак для крепкого пара', price: '4 190 ₽' },
];

const FIRST_NAMES_M = ['Алексей', 'Дмитрий', 'Сергей', 'Артём', 'Максим', 'Иван', 'Андрей', 'Михаил', 'Никита', 'Егор', 'Роман', 'Павел', 'Денис', 'Кирилл', 'Владислав', 'Антон', 'Илья', 'Александр', 'Виктор', 'Глеб'];
const FIRST_NAMES_F = ['Мария', 'Екатерина', 'Анна', 'Наталья', 'Юлия', 'Ольга', 'Дарья', 'Елена', 'Виктория', 'Ксения', 'Полина', 'Алина', 'Татьяна', 'Ирина', 'Светлана', 'Марина', 'Кристина', 'Вероника', 'София', 'Любовь'];
const LAST_NAMES_M = ['Иванов', 'Кузнецов', 'Васильев', 'Михайлов', 'Фёдоров', 'Смирнов', 'Попов', 'Соколов', 'Лебедев', 'Козлов', 'Новиков', 'Морозов', 'Волков', 'Зайцев', 'Павлов', 'Семёнов', 'Голубев', 'Виноградов', 'Богданов', 'Воробьёв'];
const LAST_NAMES_F = ['Иванова', 'Смирнова', 'Петрова', 'Соколова', 'Новикова', 'Морозова', 'Васильева', 'Кузнецова', 'Попова', 'Лебедева', 'Козлова', 'Волкова', 'Зайцева', 'Павлова', 'Семёнова', 'Голубева', 'Богданова', 'Воробьёва', 'Фёдорова', 'Михайлова'];

const REVIEW_TEXTS = [
  'Заказал устройство — пришло за два дня. Пар плотный, вкус насыщенный, держит заряд весь день. Однозначно рекомендую!',
  'Очень довольна сервисом. Поддержка ответила моментально, помогли выбрать. Устройство красивое, в руке лежит идеально.',
  'Огонь, экран яркий, настройки гибкие. Снял звезду только за упаковку — пришла слегка помятой, но само устройство целое.',
  'Беру здесь уже третий раз. Качество стабильно высокое, цены адекватные. Доставка быстрая, всё как описано.',
  'Мощный зверь, мощности хватает с запасом. Батарея живучая. Спасибо за честный магазин!',
  'Идеален для города — маленький и незаметный. Вкус передаёт отлично. Хотелось бы больше расцветок.',
  'Лучший вейп-шоп, что встречал. Оригинал, гарантия, нормальные люди на связи. Буду заказывать ещё.',
  'Просто космос — настройки гибкие, дизайн готичный, как раз мой стиль. Всё работает без нареканий.',
  'Устройство хорошее, но доставка задержалась на день. По качеству вопросов нет, пар вкусный.',
  'Подарила парню — он в восторге! Тяга мягкая, вкус крепкий. Магазину доверяю на 100%.',
  'Качество сборки на высоте, материалы приятные. Заряжается быстро, держит долго. Рекомендую!',
  'Брал на пробу, остался очень доволен. Менеджер всё подробно объяснил, помог с выбором жидкости.',
  'Дизайн просто шикарный, выглядит дорого. Пар густой, вкус не пропадает. Спасибо за крутой товар!',
  'Доставка молниеносная, упаковка надёжная. Устройство работает идеально уже месяц. Всё супер.',
  'Цена-качество на высоте. Перепробовал много магазинов — этот лучший по сервису и ассортименту.',
  'Отличный вкус и плотный пар. Батареи хватает на весь день активного использования. Доволен!',
  'Заказывал ночью — утром уже подтвердили. Пришло в срок, всё работает. Буду рекомендовать друзьям.',
  'Стильное устройство, удобно лежит в руке. Кнопки чёткие, экран информативный. Покупкой доволен.',
  'Поддержка топ — ответили в течение минуты, решили вопрос с обменом без проблем. Респект!',
  'Брал в подарок — упаковали красиво, добавили приятный бонус. Качество отличное, всем советую.',
];

function makeReviews(count: number) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const isF = i % 2 === 0;
    const name = isF
      ? `${FIRST_NAMES_F[(i * 7) % FIRST_NAMES_F.length]} ${LAST_NAMES_F[(i * 3) % LAST_NAMES_F.length]}`
      : `${FIRST_NAMES_M[(i * 7) % FIRST_NAMES_M.length]} ${LAST_NAMES_M[(i * 3) % LAST_NAMES_M.length]}`;
    const r = i % 25 === 0 ? 3 : i % 9 === 0 ? 4 : 5;
    const day = String((i % 28) + 1).padStart(2, '0');
    const month = String((i % 12) + 1).padStart(2, '0');
    const year = 2025 + (i % 2);
    const hh = String((i * 13) % 24).padStart(2, '0');
    const mm = String((i * 7) % 60).padStart(2, '0');
    out.push({
      name,
      rating: r,
      date: `${day}.${month}.${year} ${hh}:${mm}`,
      text: REVIEW_TEXTS[i % REVIEW_TEXTS.length],
    });
  }
  return out;
}

const REVIEWS = makeReviews(500);

const RATING_STATS = [
  { stars: 5, pct: 78 },
  { stars: 4, pct: 16 },
  { stars: 3, pct: 4 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
];

const FAQ = [
  { q: 'Как происходит доставка?', a: 'Доставляем по всей России курьером и почтой. Сроки — от 1 до 5 дней в зависимости от региона. Трек-номер отправляем сразу после оформления.' },
  { q: 'Все товары оригинальные?', a: 'Да, мы работаем только с официальными поставщиками. На каждое устройство действует гарантия производителя.' },
  { q: 'Можно ли вернуть товар?', a: 'Возврат возможен в течение 14 дней при сохранении товарного вида и упаковки. Бракованные устройства меняем бесплатно.' },
  { q: 'Какие способы оплаты доступны?', a: 'Принимаем оплату картами Т-Банк, Альфа-Банк, СберБанк, ВТБ, а также через СБП по QR-коду.' },
  { q: 'Есть ли возрастное ограничение?', a: 'Продажа осуществляется только лицам старше 18 лет. При получении заказа может потребоваться подтверждение возраста.' },
];

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon
          key={i}
          name="Star"
          size={size}
          className={i <= rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-700'}
        />
      ))}
    </div>
  );
}

function Smoke() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-gradient-to-t from-neon-magenta/20 to-neon-purple/10 blur-2xl animate-smoke"
          style={{
            left: `${10 + i * 16}%`,
            width: `${80 + i * 20}px`,
            height: `${80 + i * 20}px`,
            animationDelay: `${i * 1.3}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Index() {
  const [tab, setTab] = useState<Tab>('home');
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(6);
  const [payOpen, setPayOpen] = useState(false);
  const [payProduct, setPayProduct] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const suggestions = useMemo(() => {
    if (!search.trim()) return [];
    return PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 5);
  }, [search]);

  const filtered = useMemo(() => {
    if (!search.trim()) return PRODUCTS;
    return PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const openPay = (name: string) => {
    setPayProduct(name);
    setPayOpen(true);
  };

  const copyTg = () => {
    navigator.clipboard?.writeText(TELEGRAM);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen carbon-texture text-zinc-100">
      {/* NAV */}
      <header className="sticky top-0 z-40 glass border-b border-neon-purple/20">
        <div className="container flex items-center justify-between py-3">
          <button onClick={() => setTab('home')} className="flex items-center gap-3">
            <img src={SKULL_IMG} alt="logo" className="h-10 w-10 rounded-full object-cover ring-2 ring-neon-cyan/40" />
            <span className="font-display text-xl font-bold tracking-widest metallic-text">
              SKULLHEARTS
            </span>
          </button>
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => setTab(n.id)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  tab === n.id
                    ? 'bg-neon-purple/20 text-neon-cyan'
                    : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                <Icon name={n.icon} size={16} />
                {n.label}
                {n.id === 'reviews' && (
                  <span className="text-xs text-neon-magenta">500</span>
                )}
              </button>
            ))}
          </nav>
        </div>
        {/* mobile nav */}
        <div className="md:hidden flex overflow-x-auto gap-1 px-3 pb-2">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium ${
                tab === n.id ? 'bg-neon-purple/20 text-neon-cyan' : 'text-zinc-400'
              }`}
            >
              {n.label}
            </button>
          ))}
        </div>
      </header>

      <main className="container py-10">
        {/* HOME */}
        {tab === 'home' && (
          <section className="relative animate-fade-in">
            <Smoke />
            <div className="relative flex flex-col items-center py-16 text-center">
              <img
                src={SKULL_IMG}
                alt="skull"
                className="mb-8 h-32 w-32 rounded-full object-cover ring-4 ring-neon-cyan/30 animate-float shadow-[0_0_50px_rgba(34,211,238,0.4)]"
              />
              <h1 className="font-display text-6xl sm:text-8xl font-bold tracking-[0.15em] metallic-text">
                SKULLHEARTS
              </h1>
              <p className="mt-6 max-w-xl font-serif text-2xl text-zinc-300">
                Премиальные вейп-устройства. Тёмная эстетика. Безупречное качество.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Button
                  onClick={() => setTab('catalog')}
                  className="gradient-btn h-12 px-8 text-base font-semibold text-white border-0"
                >
                  <Icon name="Package" size={18} className="mr-2" />
                  Смотреть товары
                </Button>
                <Button
                  onClick={() => setTab('reviews')}
                  variant="outline"
                  className="h-12 px-8 text-base border-neon-purple/40 bg-transparent text-zinc-200 hover:bg-neon-purple/10"
                >
                  <Icon name="Star" size={18} className="mr-2 text-amber-400" />
                  Отзывы (500)
                </Button>
              </div>
              <div className="mt-16 grid w-full max-w-3xl grid-cols-3 gap-4">
                {[
                  { v: '4.8★', l: 'Средний рейтинг' },
                  { v: '500', l: 'Отзывов' },
                  { v: '24/7', l: 'Поддержка' },
                ].map((s) => (
                  <div key={s.l} className="glass glass-hover rounded-2xl p-5">
                    <div className="font-display text-3xl font-bold neon-text-cyan">{s.v}</div>
                    <div className="mt-1 text-sm text-zinc-400">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CATALOG */}
        {tab === 'catalog' && (
          <section className="animate-fade-in">
            <h2 className="font-display text-4xl font-bold tracking-wider metallic-text">ТОВАРЫ</h2>
            {/* search with autocomplete */}
            <div className="relative mt-6 max-w-md">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-cyan" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                placeholder="Поиск по названию..."
                className="glass h-12 border-neon-purple/30 pl-10 text-zinc-100 placeholder:text-zinc-500"
              />
              {focused && suggestions.length > 0 && (
                <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl glass animate-scale-in">
                  {suggestions.map((s) => (
                    <button
                      key={s.id}
                      onMouseDown={() => setSearch(s.name)}
                      className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm hover:bg-neon-purple/15"
                    >
                      <Icon name="Search" size={14} className="text-zinc-500" />
                      <span className="text-zinc-200">{s.name}</span>
                      <span className="ml-auto text-neon-magenta">{s.price}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((p) => (
                <div key={p.id} className="glass glass-hover overflow-hidden rounded-2xl">
                  <div className="relative h-48 overflow-hidden bg-black/40">
                    <img src={VAPE_IMG} alt={p.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg font-semibold text-zinc-100">{p.name}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{p.desc}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="rounded-lg bg-neon-purple/20 px-3 py-1 font-display text-lg font-bold text-neon-cyan shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                        {p.price}
                      </span>
                      <Button
                        onClick={() => openPay(p.name)}
                        className="gradient-btn h-9 border-0 px-4 text-sm font-semibold text-white"
                      >
                        Заказать
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="mt-10 text-center text-zinc-500">Ничего не найдено по запросу «{search}»</p>
            )}
          </section>
        )}

        {/* REVIEWS */}
        {tab === 'reviews' && (
          <section className="animate-fade-in">
            <h2 className="font-display text-4xl font-bold tracking-wider metallic-text">ОТЗЫВЫ</h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
              <div className="glass rounded-2xl p-6 text-center h-fit">
                <div className="font-display text-6xl font-bold neon-text-cyan">4.8</div>
                <div className="mt-2 flex justify-center"><Stars rating={5} size={20} /></div>
                <div className="mt-1 text-sm text-zinc-400">500 отзывов</div>
                <div className="mt-5 space-y-2">
                  {RATING_STATS.map((r) => (
                    <div key={r.stars} className="flex items-center gap-2 text-sm">
                      <span className="w-3 text-zinc-400">{r.stars}</span>
                      <Icon name="Star" size={12} className="text-amber-400 fill-amber-400" />
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-neon-purple to-neon-magenta"
                          style={{ width: `${r.pct}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-zinc-500">{r.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="grid gap-4 md:grid-cols-2">
                  {REVIEWS.slice(0, visibleReviews).map((r, i) => (
                    <div key={i} className="glass glass-hover rounded-2xl p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-neon-purple to-neon-magenta font-semibold text-white">
                          {r.name[0]}
                        </div>
                        <div>
                          <div className="font-medium text-zinc-100">{r.name}</div>
                          <div className="text-xs text-zinc-500">{r.date}</div>
                        </div>
                      </div>
                      <div className="mt-3"><Stars rating={r.rating} /></div>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-300">{r.text}</p>
                    </div>
                  ))}
                </div>
                {visibleReviews < REVIEWS.length && (
                  <div className="mt-6 text-center">
                    <Button
                      onClick={() => setVisibleReviews((v) => v + 20)}
                      variant="outline"
                      className="border-neon-purple/40 bg-transparent text-zinc-200 hover:bg-neon-purple/10"
                    >
                      Показать ещё 20 отзывов
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ABOUT */}
        {tab === 'about' && (
          <section className="animate-fade-in mx-auto max-w-3xl">
            <h2 className="font-display text-4xl font-bold tracking-wider metallic-text">О БРЕНДЕ</h2>
            <div className="glass mt-6 rounded-2xl p-8">
              <img src={SKULL_IMG} alt="skull" className="mx-auto mb-6 h-24 w-24 rounded-full object-cover ring-2 ring-neon-cyan/40 animate-float" />
              <p className="font-serif text-xl leading-relaxed text-zinc-300">
                SKULLHEARTS — это не просто вейп-шоп. Это культура тёмной эстетики и
                бескомпромиссного качества. Мы отбираем устройства, которые сочетают
                премиальные материалы, мощную начинку и узнаваемый готик-киберпанк дизайн.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: 'ShieldCheck', t: 'Оригинал', d: 'Только официальные поставки' },
                  { icon: 'Zap', t: 'Качество', d: 'Тестируем каждое устройство' },
                  { icon: 'Heart', t: 'Забота', d: 'Поддержка 24/7' },
                ].map((f) => (
                  <div key={f.t} className="rounded-xl border border-neon-purple/20 p-4 text-center">
                    <Icon name={f.icon} size={28} className="mx-auto text-neon-cyan" />
                    <div className="mt-2 font-display font-semibold text-zinc-100">{f.t}</div>
                    <div className="mt-1 text-sm text-zinc-400">{f.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CONTACTS */}
        {tab === 'contacts' && (
          <section className="animate-fade-in mx-auto max-w-xl">
            <h2 className="font-display text-4xl font-bold tracking-wider metallic-text">КОНТАКТЫ</h2>
            <div className="glass mt-6 rounded-2xl p-8 text-center">
              <Icon name="Send" size={40} className="mx-auto text-neon-green" />
              <p className="mt-4 text-zinc-300">Свяжитесь с нами в Telegram для заказа и консультации</p>
              <button
                onClick={copyTg}
                className="group mt-6 inline-flex items-center gap-3 rounded-xl border border-neon-green/30 bg-black/30 px-6 py-4 transition-all hover:border-neon-green/60"
              >
                <span className="font-display text-2xl font-bold neon-text-green">{TELEGRAM}</span>
                <Icon
                  name={copied ? 'Check' : 'Copy'}
                  size={20}
                  className={copied ? 'text-neon-green' : 'text-zinc-400 group-hover:text-neon-green'}
                />
              </button>
              {copied && <p className="mt-3 text-sm text-neon-green animate-fade-in">Скопировано!</p>}
            </div>
          </section>
        )}

        {/* FAQ */}
        {tab === 'faq' && (
          <section className="animate-fade-in mx-auto max-w-2xl">
            <h2 className="font-display text-4xl font-bold tracking-wider metallic-text">ВОПРОСЫ И ОТВЕТЫ</h2>
            <Accordion type="single" collapsible className="glass mt-6 rounded-2xl px-6">
              {FAQ.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-neon-purple/15">
                  <AccordionTrigger className="text-left font-display text-lg text-zinc-100 hover:text-neon-cyan hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-400">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}
      </main>

      <footer className="border-t border-neon-purple/15 py-8 text-center text-sm text-zinc-500">
        <p className="font-display tracking-widest metallic-text text-lg">SKULLHEARTS</p>
        <p className="mt-2">© 2026 · Только для лиц старше 18 лет</p>
      </footer>

      {/* PAYMENT MODAL */}
      <Dialog open={payOpen} onOpenChange={setPayOpen}>
        <DialogContent className="glass border-neon-purple/30 text-zinc-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl tracking-wider metallic-text">
              Оплата заказа
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-neon-purple/30 to-neon-magenta/30 ring-1 ring-neon-green/40">
              <Icon name="Send" size={30} className="text-neon-green" />
            </div>
            <p className="mt-4 text-zinc-200">
              <span className="font-semibold text-neon-cyan">{payProduct}</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Для оформления заказа и получения реквизитов для оплаты напишите нам в Telegram —
              менеджер пришлёт актуальные данные и поможет с доставкой.
            </p>
            <a
              href={`https://t.me/${TELEGRAM.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full"
            >
              <Button className="gradient-btn h-12 w-full border-0 text-base font-semibold text-white">
                <Icon name="Send" size={18} className="mr-2" />
                Написать в Telegram {TELEGRAM}
              </Button>
            </a>
            <button
              onClick={copyTg}
              className="mt-3 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-neon-green"
            >
              <Icon name={copied ? 'Check' : 'Copy'} size={15} />
              {copied ? 'Скопировано!' : 'Скопировать ник'}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}