// data.js
export const HAND_SIZE = 8; // Размер руки
export const CARDS_CLEAR_DELAY = 3000; // Тайминг показа разыгранных карт
export const MAX_HANDS_PER_ROUND = 5; // Количество рук в раунде
export const MAX_DISCARDS_PER_ROUND = 3; // Количество сбросов в раунде
export const INITIAL_SPARKS = 10; // Начальный баланс искр
export const MAX_CARDS_PER_PLAY = 5; // Максимум разыгрываемых/сбрасываемых карт за 1 раз

// Карточные комбинации
export const COMBO_BONUSES = {
    highCard: { chips: 5, multiplier: 1, name: 'Старшая карта', minCards: 1 },
    pair: { chips: 10, multiplier: 2, name: 'Пара', minCards: 2 },
    twoPair: { chips: 20, multiplier: 2, name: 'Две пары', minCards: 4 },
    three: { chips: 30, multiplier: 3, name: 'Сет', minCards: 3 },
    straight: { chips: 30, multiplier: 4, name: 'Стрит', minCards: 5 },
    flush: { chips: 35, multiplier: 4, name: 'Флеш', minCards: 5 },
    fullHouse: { chips: 40, multiplier: 4, name: 'Фулл-хаус', minCards: 5 },
    four: { chips: 60, multiplier: 7, name: 'Каре', minCards: 4 },
    straightFlush: { chips: 100, multiplier: 8, name: 'Стрит-флеш', minCards: 5 }
};

// ========================================
// СТРУКТУРА КРУГОВ АДА (основная структура)
// ========================================
// Каждый круг: имя, массив миньонов, босс. Люцифер — отдельно.
// Нелинейная структура — легко добавлять/удалять миньонов и боссов.
export const CIRCLES = {
  1: {
    name: 'Харон',
    minions: [
      { goal: 100, sparksReward: 10 },
      { goal: 120, sparksReward: 12 },
      { goal: 90, sparksReward: 6 },
    ],
    boss: { goal: 150, sparksReward: 15 },
  },
  2: {
    name: 'Минос',
    minions: [
      { goal: 170, sparksReward: 17 },
      { goal: 185, sparksReward: 18 },
    ],
    boss: { goal: 200, sparksReward: 20 },
  },
  3: {
    name: 'Цербер',
    minions: [
      { goal: 200, sparksReward: 25 },
      { goal: 250, sparksReward: 25 },
    ],
    boss: { goal: 250, sparksReward: 30 },
  },
  4: {
    name: 'Плутос',
    minions: [
      { goal: 300, sparksReward: 35 },
      { goal: 350, sparksReward: 40 },
    ],
    boss: { goal: 350, sparksReward: 50 },
  },
  5: {
    name: 'Флегий',
    minions: [
      { goal: 400, sparksReward: 55 },
      { goal: 450, sparksReward: 65 },
    ],
    boss: { goal: 550, sparksReward: 75 },
  },
  6: {
    name: 'Фурии',
    minions: [
      { goal: 600, sparksReward: 85 },
      { goal: 650, sparksReward: 100 },
    ],
    boss: { goal: 750, sparksReward: 115 },
  },
  7: {
    name: 'Минотавр',
    minions: [
      { goal: 850, sparksReward: 135 },
      { goal: 950, sparksReward: 155 },
    ],
    boss: { goal: 1100, sparksReward: 180 },
  },
  8: {
    name: 'Герион',
    minions: [
      { goal: 1200, sparksReward: 210 },
      { goal: 1400, sparksReward: 240 },
    ],
    boss: { goal: 1550, sparksReward: 280 },
  },
  9: {
    name: 'Антэй',
    minions: [
      { goal: 1750, sparksReward: 325 },
      { goal: 1950, sparksReward: 375 },
      { goal: 2100, sparksReward: 400 },
    ],
    boss: { goal: 2200, sparksReward: 430 },
  },
};

export const LUCIFER_DATA = {
  name: 'Люцифер',
  goal: 2500,
  sparksReward: 500,
};

// Общее количество раундов (миньоны + боссы + люцифер)
export const MAX_ROUNDS =
  Object.values(CIRCLES).reduce((sum, c) => sum + c.minions.length + 1, 0) + 1;

// ========================================
// ДЕМОНЫ-ПРИСПЕШНИКИ (МИНИОНЫ)
// ========================================
// 📝 ИНСТРУКЦИЯ: Как добавить новый портрет миньона
// 1. Добавь изображение в папку assets/characters/ с именем Demon-minion-X.png
// 2. Добавь строку ниже по аналогии с существующими
// 3. Игра автоматически подтянет новый портрет при следующей новой игре!
//
// Пример:
// { id: 'minion-3', image: 'assets/characters/Demon-minion-3.png' },
//
// При каждой новой игре для каждого круга случайно выбираются 2 миньона из этого списка.
// Они могут повторяться на разных кругах.

export const MINION_DEMONS = [
    { id: 'minion-1', image: 'assets/characters/Demon-minion-1.png' },
    { id: 'minion-2', image: 'assets/characters/Demon-minion-2.png' },
    // Добавляй новые строки ниже:
    // { id: 'minion-3', image: 'assets/characters/Demon-minion-3.png' },
];

// ========================================
// ИМЕНА МИНЬОНОВ (случайные при каждой новой игре)
// ========================================
// Три типажа для разнообразия:
//   1. Адские/фэнтезийные — Заргул, Морфит, Шур'гул
//   2. Человеческие неформальные — Миша, Андрюха, Петрович
//   3. Инопланетные в стиле КР — Прок Лятый, Тупица Билл, Жополицый
export const MINION_NAMES = [
    // Адские / фэнтезийные (20)
    'Заргул', 'Морфит', 'Бельфегорик', 'Каинит', 'Вепрест',
    'Молтак', 'Шур\'гул', 'Даз\'ра', 'Ифритон', 'Набб',
    'Кхор', 'Скрулос', 'Виз\'Нат', 'Грум', 'Пал\'Тах',
    'Зоргон', 'Морг', 'Ур-Шул', 'Некс', 'Хазз',
    // Человеческие неформальные (15)
    'Миша', 'Андрюха', 'Петрович', 'Юрка', 'Васян',
    'Славик', 'Гена', 'Витька', 'Алёшка', 'Димон',
    'Колян', 'Валера', 'Тёма', 'Пашка', 'Серёга',
    // Инопланетные в стиле КР (15)
    'Прок Лятый', 'Тупица Билл', 'Жополицый', 'Косматый', 'Гнилой Бутс',
    'Шрам Космоса', 'Драный Изгои', 'Пузырь', 'Мокрые Перчатки', 'Драный',
    'Задрипанный', 'Усатый Лоботряс', 'Асбестовый', 'Мокрый', 'Зубодрочил',
];

// Получить случайное имя миньона
export function getRandomMinionName() {
    return MINION_NAMES[Math.floor(Math.random() * MINION_NAMES.length)];
}

// Получить N уникальных имён без повторов
export function getRandomMinionNames(count) {
    const shuffled = [...MINION_NAMES].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// Получить случайных N миньонов для назначения
export function getRandomMinions(count) {
    const result = [];
    const available = [...MINION_DEMONS];

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * available.length);
        result.push(available[randomIndex]);
    }

    return result;
}

// ИМЕНА БОССОВ КРУГОВ (согласно Данте)
export const CIRCLE_BOSS_NAMES = {
    1: 'Харон',           // Лимб — перевозчик душ
    2: 'Минос',           // Сладострастие — судья Ада
    3: 'Цербер',          // Чревоугодие — трёхголовый пёс
    4: 'Плутос',          // Жадность — страж скупости
    5: 'Флегий',          // Гнев — правитель болота Стикс
    6: 'Фурии',           // Еретики — три сестры-мстительницы
    7: 'Минотавр',        // Насильники — полу человек, бык
    8: 'Герион',          // Обман — крылатое чудовище
    9: 'Антэй',           // Предатели — гигант, страж ледяного озера
};

// ========================================
// СТРАЖ ВРАТ — ПЛАТА И ПРОКЛЯТИЯ
// ========================================
// Каждый круг: плата за вход + диапазон сложности проклятий (по impact)
// impact: от -5 (очень вредное) до +5 (очень полезное)
// Проклятия выбираются случайно из CARD_RARITIES с impact в указанном диапазоне

// ========================================
// НЕВЫНОСИМЫЕ УСЛОВИЯ БОССА (при пропуске миньонов)
// ========================================
export const BOSS_CONDITIONS = [
    { id: 'extraGoal50', type: 'extraGoal', value: 0.5, description: '+50% к цели раунда' },
    { id: 'minusHand1', type: 'minusHand', value: 1, description: '−1 рука на эту партию' },
    { id: 'minusDiscard1', type: 'minusDiscard', value: 1, description: '−1 сброс на эту партию' },
    { id: 'cursedSuit', type: 'cursedSuit', value: null, description: 'Случайная масть = Проклятая (0 очков)' },
    { id: 'smallerHand', type: 'smallerHand', value: null, description: 'Размер руки уменьшен до 6' },
];

export function getRandomBossCondition() {
    return BOSS_CONDITIONS[Math.floor(Math.random() * BOSS_CONDITIONS.length)];
}

// ========================================
// ПРОКЛЯТИЯ ОТ МИНЬОНОВ при поражении
// ========================================
// Каждый элемент: { effectId, count, description } — ID из CARD_RARITIES и количество карт
export const MINION_CURSE_POOL = [
    { effectId: 'poison', count: 3, description: '+3 Ядовитых карты' },
    { effectId: 'shadow', count: 2, description: '+2 Теневые карты' },
    { effectId: 'shadow', count: 3, description: '+3 Теневые карты' },
    { effectId: 'poison', count: 5, description: '+5 Ядовитых карт' },
    { effectId: 'rusted', count: 4, description: '+4 Ржавых карты' },
    { effectId: 'rusted', count: 7, description: '+7 Ржавых карт' },
    { effectId: 'poison', count: 2, description: '+2 Ядовитых карты' },
    { effectId: 'shadow', count: 4, description: '+4 Теневые карты' },
    { effectId: 'cursed', count: 1, description: '+1 Проклятая карта' },
    { effectId: 'brittle', count: 1, description: '+1 Хрупкая карта' },
];

export function getRandomMinionCurse() {
    return MINION_CURSE_POOL[Math.floor(Math.random() * MINION_CURSE_POOL.length)];
}

// ========================================
// КОНСТАНТЫ ДЛЯ АНТИ-ФАРМА И БОССА
// ========================================
export const MAX_MINION_PLAYS = 3; // Максимум партий с одним миньоном
export const MINION_STAKE_STEP_2_PLAYER_WIN = 0.7; // Ставка ×0.7 если игрок выиграл первую
export const MINION_STAKE_STEP_2_MINION_WIN = 1.3; // Ставка ×1.3 если миньон выиграл первую
export const MINION_STAKE_STEP_3_PLAYER_WIN = 0.3; // Ставка ×0.3 при второй победе игрока
export const MINION_STAKE_STEP_3_MINION_WIN = 1.5; // Ставка ×1.5 при второй победе миньона
export const MINION_REFUSE_CHANCE_AFTER_2_WINS = 0.5; // 50% шанс отказа после 2 побед игрока
export const BOSS_UNLOCK_MIN_PERCENT = 0.51; // 51% миньонов должны быть побеждены для разблокировки босса
export const BOSS_BRIBE_MULTIPLIER = 2; // Плата боссу = sparksReward × 2

// ========================================
// ПОЛУЧЕНИЕ ДАННЫХ РАУНДА ДЛЯ КРУГА И СЛОТА
// ========================================
// slot = 0, 1, ... для миньонов; 'boss' для демона круга; 'lucifer' для финала

export function getCircleRoundData(circle, slot) {
    const circleData = CIRCLES[circle];
    if (!circleData) return null;

    if (slot === 'boss') {
        return circleData.boss || null;
    }
    if (slot === 'lucifer') {
        return LUCIFER_DATA;
    }
    // Миньоны: берём по индексу массива
    return circleData.minions[slot] || null;
}

// Получить данные люцифера
export function getLuciferData() {
    return LUCIFER_DATA;
}

// ========================================
// ШАБЛОННЫЕ ФРАЗЫ МИНЬОНОВ (АНТИ-ФАРМ)
// ========================================
// Функция getRandomPhrase(phrases) возвращает случайную фразу из массива
export function getRandomPhrase(phrases) {
    return phrases[Math.floor(Math.random() * phrases.length)];
}

export const MINION_PHRASES = {
    // 1-я партия (ставка по умолчанию)
    firstGame: [
        'Ещё один отчаянный! Сейчас развлечёмся!',
        'Готов поторговаться? Или сразу покажешь, на что твоя душа способна?',
        'Твоя душа пахнет риском. Мне нравится.',
        'Ну давай, покажи, на что способен.',
    ],
    // 2-я партия, игрок выиграл первую (раздосадован, ставка ×0.7)
    secondAfterPlayerWin: [
        'Тебе повезло в первый раз. Не привыкай. Реванш, но ставка меньше — я не благотворитель.',
        'Хм, выиграл? Ладно, ещё разок. Но дешевле — ты и так забрал моё.',
        'Раздосадован? Да. Но я всё равно обыграю тебя. Ставка поменьше, зато шанс отомстить.',
    ],
    // 2-я партия, миньон выиграл первую (воодушевлён, ставка ×1.3)
    secondAfterMinionWin: [
        'Ха-ха! Первая искра моя! Давай ещё — ставлю больше, ты же не струсишь?',
        'В приподнятом настроении! Ещё партию? Ставка растёт, как мой аппетит!',
        'Одна победа — это мало. Хочу больше! И ставку поднимаю — рискуй или уходи.',
    ],
    // 3-я партия, игрок выиграл вторую (50% шанс отказа, ставка ×0.3)
    thirdAfterPlayerWin: [
        'Снова ты выиграл? Ладно, последняя. Но ставка копеечная — мне это уже неинтересно.',
        'Ты слишком хорош... почти. Последний раз, по минимуму. Не обижайся.',
    ],
    // 3-я партия, миньон выиграл вторую (ставка ×1.5)
    thirdAfterMinionWin: [
        'Я на коне! Ещё разок, и ставка максимум — ты же не сдашься?',
        'Две победы подряд! Давай третью — ставлю по полной. Или струсишь?',
        'Я чувствую твою душу. Она почти моя. Последняя партия — ставка ×1.5!',
    ],
    // Отказ после 2 побед игрока (50% шанс)
    refuseAfterTwoWins: [
        'Да пошёл ты! Я больше с тобой не играю. Доволен собой? Катись отсюда!',
        'Хватит! Ты ободрал меня как липку. Ищи другого лоха!',
        'Нет. Просто нет. Иди к боссу, может он тебя обыграет. А я — пас.',
    ],
    // Насмешка при поражении игрока
    playerDefeat: [
        'Поздравляю! Ты проиграл демону! Да-да, тому, кого даже черви не хотят слушать.',
        'Ха-ха! Ты думал, у тебя есть шанс? Смешно. Так смешно, что я плачу от смеха!',
        'Ты проиграл. Смирись. И постарайся не забыть это чувство — оно тебя ускорит.',
        'О, боже! Ты реально проиграл?! Я не шучу, это так смешно! Нет, серьёзно — иди уже к боссу, там тебе дадут то, что ты заслужил.',
        'Ты — посмешище Ада! Даже мои ботинки лучше играют!',
    ],
    // Закрывающая фраза, последняя партия выиграна игроком
    closePlayerWon: [
        'Да пошёл ты к чёрту! Везунчик. Больше не хочешь — и не надо!',
        'Тьфу. Забрал всё. Проваливай, пока я не передумал!',
        'Раздражаешь. Уходи. В следующий раз буду умнее.',
    ],
    // Закрывающая фраза, последняя партия выиграна миньоном
    closeMinionWon: [
        'Ты меня утомил. Иди тренируйся на лягушках!',
        'Ха-ха! Как и ожидалось. Беги к боссу, пусть он тебя добьёт.',
        'Скучно. Ты не стоишь даже этой искры. Прощай, неудачник.',
    ],
};

export const GATEKEEPER_COSTS = {
    1: {
        entranceFee: 5,    // Искры душ за вход
        curseImpactMin: -2, // Минимальная сложность проклятия
        curseImpactMax: -1, // Максимальная сложность проклятия
    },
    2: {
        entranceFee: 8,
        curseImpactMin: -2,
        curseImpactMax: -1,
    },
    3: {
        entranceFee: 12,
        curseImpactMin: -3,
        curseImpactMax: -1,
    },
    4: {
        entranceFee: 15,
        curseImpactMin: -3,
        curseImpactMax: -2,
    },
    5: {
        entranceFee: 20,
        curseImpactMin: -3,
        curseImpactMax: -2,
    },
    6: {
        entranceFee: 25,
        curseImpactMin: -4,
        curseImpactMax: -2,
    },
    7: {
        entranceFee: 30,
        curseImpactMin: -4,
        curseImpactMax: -3,
    },
    8: {
        entranceFee: 40,
        curseImpactMin: -5,
        curseImpactMax: -3,
    },
    9: {
        entranceFee: 50,
        curseImpactMin: -5,
        curseImpactMax: -4,
    },
};