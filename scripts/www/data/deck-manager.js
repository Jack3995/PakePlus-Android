// data/deck-manager.js

// ========================================
// КОНСТАНТЫ КАРТ (структура колоды)
// ========================================

// Масти
export const SUITS = [
    { name: 'hearts', symbol: '♥', color: 'red', class: 'suit-heart' },
    { name: 'diamonds', symbol: '♦', color: 'red', class: 'suit-diamond' },
    { name: 'clubs', symbol: '♣', color: 'black', class: 'suit-club' },
    { name: 'spades', symbol: '♠', color: 'black', class: 'suit-spade' }
];

// Номиналы карт
export const CARD_VALUES = [
    { name: '2', value: 2, chips: 2, multiplier: 0 },
    { name: '3', value: 3, chips: 3, multiplier: 0 },
    { name: '4', value: 4, chips: 4, multiplier: 0 },
    { name: '5', value: 5, chips: 5, multiplier: 0 },
    { name: '6', value: 6, chips: 6, multiplier: 0 },
    { name: '7', value: 7, chips: 7, multiplier: 0 },
    { name: '8', value: 8, chips: 8, multiplier: 0 },
    { name: '9', value: 9, chips: 9, multiplier: 0 },
    { name: '10', value: 10, chips: 10, multiplier: 0 },
    { name: 'J', value: 11, chips: 10, multiplier: 0 },
    { name: 'Q', value: 12, chips: 10, multiplier: 0 },
    { name: 'K', value: 13, chips: 10, multiplier: 0 },
    { name: 'A', value: 14, chips: 11, multiplier: 0 }
    // value нужен для корректной сортировки карт по возрастанию и проверки Стрита
];

/**
 * @typedef {Object} CardRarity
 * @property {string} id              - Уникальный идентификатор эффекта карты
 * @property {string} name            - Имя эффекта карты
 * @property {number} impact          - Влияние эффекта карты, от -5 (очень вредная) до +5 (очень полезная)
 * @property {number} chipsBonus      - Модификатор базовых очков
 * @property {number} multiplierBonus - Модификатор базового множителя
 * @property {number} maxCount        - Максимальное количество таких карт в колоде
 * @property {string} description     - Описание эффекта карты для UI
 */

export const CARD_RARITIES = [
    // ВРЕДНЫЕ (от самого вредного к менее вредным)
    { id: 'demonic', name: 'Демоническая карта', impact: -4, chipsBonus: -10, multiplierBonus: -2, maxCount: 1, description: 'Демоническая карта: -10 к базовым очкам карты' },
    { id: 'infernal', name: 'Адская карта', impact: -4, chipsBonus: -30, multiplierBonus: 0, maxCount: 1, description: 'Адская карта: -30 к очкам' },
    { id: 'shattered', name: 'Разбитая карта', impact: -4, chipsBonus: 0, multiplierBonus: -3, maxCount: 1, description: 'Разбитая карта: -3 множителя' },
    { id: 'plague', name: 'Чумная карта', impact: -3, chipsBonus: -5, multiplierBonus: 0, maxCount: 1, description: 'Чумная карта: -5 к базовым очкам карты' },
    { id: 'cursed', name: 'Проклятая карта', impact: -3, chipsBonus: -5, multiplierBonus: -2, maxCount: 1, description: 'Проклятая карта: -5 к базовым очкам карты' },
    { id: 'void', name: 'Пустотная карта', impact: -3, chipsBonus: 0, multiplierBonus: -2, maxCount: 1, description: 'Пустотная карта: -2 множителя' },
    { id: 'fractured', name: 'Треснутая карта', impact: -3, chipsBonus: -20, multiplierBonus: 0, maxCount: 1, description: 'Треснутая карта: -20 к очкам' },
    { id: 'brittle', name: 'Хрупкая карта', impact: -3, chipsBonus: -10, multiplierBonus: -1, maxCount: 1, description: 'Хрупкая карта: -10 очков -1 множитель' },
    { id: 'withered', name: 'Иссохшая карта', impact: -3, chipsBonus: -18, multiplierBonus: 0, maxCount: 1, description: 'Иссохшая карта: -18 к очкам' },
    { id: 'corrupted', name: 'Порченая карта', impact: -3, chipsBonus: -12, multiplierBonus: -1, maxCount: 1, description: 'Порченая карта: -12 очков -1 множитель' },
    { id: 'banshee', name: 'Карта-крикунья', impact: -3, chipsBonus: -22, multiplierBonus: 0, maxCount: 1, description: 'Карта-крикунья: -22 к очкам' },
    { id: 'poison', name: 'Ядовитая карта', impact: -2, chipsBonus: -3, multiplierBonus: 0, maxCount: 10, description: 'Ядовитая карта: -3 к базовым очкам карты' },
    { id: 'shadow', name: 'Теневая карта', impact: -2, chipsBonus: 0, multiplierBonus: -1, maxCount: 5, description: 'Теневая карта: -1 множитель' },
    { id: 'rusted', name: 'Ржавая карта', impact: -1, chipsBonus: -1, multiplierBonus: 0, maxCount: 20, description: 'Ржавая карта: -1 к базовым очкам карты' },

    // ПОЛЕЗНЫЕ (от менее полезных к самым сильным)
    { id: 'bronze', name: 'Бронзовая карта', impact: 1, chipsBonus: 10, multiplierBonus: 0, maxCount: 1, description: 'Бронзовая карта: +10 к базовым очкам карты' },
    { id: 'silver', name: 'Серебряная карта', impact: 2, chipsBonus: 30, multiplierBonus: 0, maxCount: 1, description: 'Серебряная карта: +30 к базовым очкам карты' },
    { id: 'crystal', name: 'Кристальная карта', impact: 2, chipsBonus: 15, multiplierBonus: 1, maxCount: 1, description: 'Кристальная карта: +15 очков +1 множитель' },
    { id: 'emerald', name: 'Изумрудная карта', impact: 2, chipsBonus: 25, multiplierBonus: 0, maxCount: 1, description: 'Изумрудная карта: +25 к очкам' },
    { id: 'ruby', name: 'Рубиновая карта', impact: 2, chipsBonus: 0, multiplierBonus: 3, maxCount: 1, description: 'Рубиновая карта: +3 множителя' },
    { id: 'blessed', name: 'Освящённая карта', impact: 2, chipsBonus: 18, multiplierBonus: 0, maxCount: 1, description: 'Освящённая карта: +18 к очкам' },
    { id: 'gold', name: 'Золотая карта', impact: 3, chipsBonus: 30, multiplierBonus: 2, maxCount: 1, description: 'Золотая карта: +30 к базовым очкам и +2 к базовому множителю карты' },
    { id: 'platinum', name: 'Платиновая карта', impact: 3, chipsBonus: 0, multiplierBonus: 4, maxCount: 1, description: 'Платиновая карта: +4 к базовому множителю карты' },
    { id: 'diamond', name: 'Алмазная карта', impact: 3, chipsBonus: 40, multiplierBonus: 0, maxCount: 1, description: 'Алмазная карта: +40 к очкам' },
    { id: 'arcane', name: 'Таинственная карта', impact: 3, chipsBonus: 12, multiplierBonus: 2, maxCount: 1, description: 'Таинственная карта: +12 очков +2 множителя' },
    { id: 'obsidian', name: 'Обсидиановая карта', impact: 3, chipsBonus: 35, multiplierBonus: 0, maxCount: 1, description: 'Обсидиановая карта: +35 к очкам' },
    { id: 'sapphire', name: 'Сапфировая карта', impact: 3, chipsBonus: 0, multiplierBonus: 4, maxCount: 1, description: 'Сапфировая карта: +4 множителя' },
    { id: 'stellar', name: 'Звёздная карта', impact: 3, chipsBonus: 22, multiplierBonus: 1, maxCount: 1, description: 'Звёздная карта: +22 очка +1 множитель' },
    { id: 'phoenix', name: 'Фениксовая карта', impact: 3, chipsBonus: 28, multiplierBonus: 0, maxCount: 1, description: 'Фениксовая карта: +28 к очкам' },
    { id: 'aether', name: 'Эфирная карта', impact: 4, chipsBonus: 15, multiplierBonus: 3, maxCount: 1, description: 'Эфирная карта: +15 очков +3 множителя' }
];

// ========================================
// УПРАВЛЕНИЕ КОЛОДОЙ
// ========================================

const STARTER_DECK_CONFIG = {
    /* ПРОКЛЯТИЯ */
    maxCursesImpact: -2,  // Максимальный impact для стартовых проклятий (то есть диапазон -2..0)
    cursesCount: { min: 10, max: 15 }, // ДИАПАЗОН Количество уникальных проклятий, накладываемых на колоду
    cursesRepeat: { min: 1, max: 5 }, // ДИАПАЗОН Количество повторений каждого уникального проклятия 

    /* БЛАГОСЛОВЕНИЯ */
    maxBlessingsImpact: 2, // Максимальный impact для стартовых благословений (то есть диапазон 0..2)
    blessingsCount: { min: 0, max: 1 }, // ДИАПАЗОН Количество уникальных благословений, накладываемых на колоду
    blessingsRepeat: { min: 1, max: 1 } // ДИАПАЗОН Количество повторений каждого уникального благословения
};


// Базовая КОЛОДА (константа) — 52 карты без эффектов (масть + номинал)
export const BASE_DECK = createBaseDeck();

/**
 * Массив ЭФФЕКТОВ КОЛОДЫ игрока (стартовые + приобретённые)
 * id - соответствует CARD_RARITIES[].id
 * countInDeck - количество карт с этим эффектом в колоде игрока
 */
export const PLAYER_DECK_EFFECTS = [];

/**
 * Создание базовой колоды 52 карт (масть + номинал)
 * Вызывается один раз при инициализации модуля
 */
function createBaseDeck() {
    const deck = [];
    let idCounter = 0;

    for (const suit of SUITS) {
        for (const cardValue of CARD_VALUES) {
            deck.push({
                suit,
                value: { ...cardValue }, // Клонируем, чтобы не мутировать оригинал
                id: `${cardValue.name}-${suit.name}-${idCounter++}`
            });
        }
    }

    console.log('🃏 Базовая колода создана (чистые 52 карты, без эффектов)');
    return deck;
}

/**
 * Получить свежую копию колоды для партии с применёнными эффектами
 * Вызывается в начале каждой партии (battle)
 */
export function prepareDeckForBattle() {
    console.groupCollapsed('⚔️ Подготовка колоды для партии');

    // Создаём глубокую копию базовой колоды
    const battleDeck = BASE_DECK.map(card => ({
        ...card,
        suit: card.suit,
        value: { ...card.value }, // Клонируем value, чтобы не мутировать оригинал
        id: card.id
    }));

    console.log('[DECK] Базовая колода скопирована (52 карты)');

    // Тасуем колоду
    shuffleArray(battleDeck);
    console.log('[DECK] Колода перетасована');

    // Применяем эффекты из PLAYER_DECK_EFFECTS
    applyPlayerEffectsToDeck(battleDeck);

    console.log('✅ [DECK] Колода готова к партии');
    console.groupEnd();

    return battleDeck;
}

// Применение эффектов к колоде игрока (рандом)
function applyPlayerEffectsToDeck(deck) {
    console.groupCollapsed('[EFFECTS] Применение эффектов игрока к колоде');
    console.log('[EFFECTS] Эффекты в колоде игрока:', PLAYER_DECK_EFFECTS);

    // Индексы карт, которые ещё не получили эффект (чтобы не дублировать)
    const availableIndexes = deck.map((_, index) => index);

    PLAYER_DECK_EFFECTS.forEach(playerEffect => {
        const rarityData = CARD_RARITIES.find(r => r.id === playerEffect.id);

        if (!rarityData) {
            console.warn(`⚠️ Эффект "${playerEffect.id}" не найден в CARD_RARITIES`);
            return;
        }

        let cardsToAssign = playerEffect.countInDeck;

        console.log(`[EFFECTS] Применяем "${rarityData.name}" к ${cardsToAssign} картам`);

        while (cardsToAssign > 0 && availableIndexes.length > 0) {
            // Выбираем случайную карту из доступных
            const randomIndexInPool = Math.floor(Math.random() * availableIndexes.length);
            const cardIndex = availableIndexes.splice(randomIndexInPool, 1)[0];
            const card = deck[cardIndex];

            // Применяем эффект
            card.value.chips += rarityData.chipsBonus;
            card.value.multiplier += rarityData.multiplierBonus || 0;
            card.rarity = rarityData.id;
            card.rarityDescription = rarityData.description;

            console.log(
                `  → ${card.value.name}${card.suit.symbol} получила "${rarityData.id}" ` +
                `(chips: ${card.value.chips}, mult: ${card.value.multiplier})`
            );

            cardsToAssign--;
        }
    });

    console.groupEnd();
}

/**
 * Тасовка массива (Fisher-Yates)
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Инициализация стартовой колоды с случайными эффектами
 */
export function initStarterDeck() {
    console.groupCollapsed('🎲 Генерация стартовой колоды');

    PLAYER_DECK_EFFECTS.length = 0;

    const curses = CARD_RARITIES.filter(r => r.impact < 0 && r.impact >= STARTER_DECK_CONFIG.maxCursesImpact); // Диапазон "сложности" назначаемых эффектов (отсеиваем по impact от 0 до -2)
    const blessings = CARD_RARITIES.filter(r => r.impact > 0 && r.impact <= STARTER_DECK_CONFIG.maxBlessingsImpact); // Диапазон "полезности" назначаемых эффектов (отсеиваем по impact от 0 до 2)

    // Добавляем проклятия
    const cursesCount = randomInt(STARTER_DECK_CONFIG.cursesCount.min, STARTER_DECK_CONFIG.cursesCount.max); // Количество уникальных проклятий, накладываемых на колоду
    const selectedCurses = getRandomItems(curses, cursesCount);

    selectedCurses.forEach(curse => {
        const cursesRepeat = randomInt(STARTER_DECK_CONFIG.cursesRepeat.min, STARTER_DECK_CONFIG.cursesRepeat.max); // Количество повторений каждого уникального проклятия 
        const count = Math.min(curse.maxCount, cursesRepeat);
        PLAYER_DECK_EFFECTS.push({ id: curse.id, countInDeck: count });
        console.log(`💀 Добавлено проклятие: ${curse.name} (${count} шт.)`);
    });

    // Добавляем благословения
    const blessingsCount = randomInt(STARTER_DECK_CONFIG.blessingsCount.min, STARTER_DECK_CONFIG.blessingsCount.max); // Количество уникальных благословений, накладываемых на колоду
    const selectedBlessings = getRandomItems(blessings, blessingsCount);

    selectedBlessings.forEach(blessing => {
        const blessingsRepeat = randomInt(STARTER_DECK_CONFIG.blessingsRepeat.min, STARTER_DECK_CONFIG.blessingsRepeat.max); // Количество повторений каждого уникального благословения
        const count = Math.min(blessing.maxCount, blessingsRepeat);
        PLAYER_DECK_EFFECTS.push({ id: blessing.id, countInDeck: count });
        console.log(`✨ Добавлено благословение: ${blessing.name} (${count} шт.)`);
    });

    // Выводим итоговую статистику
    const stats = getDeckStats();
    console.log('📊 Итоговая статистика колоды:');
    console.log(`   💀 Проклятий: ${stats.cursesCount} (проклятых карт: ${stats.cursedCardsCount})`);
    console.log(`   ✨ Благословений: ${stats.blessingsCount} (благословенных карт: ${stats.blessedCardsCount})`);
    console.log('🃏 Стартовые эффекты сгенерированы:', PLAYER_DECK_EFFECTS);
    console.groupEnd();

    return PLAYER_DECK_EFFECTS;
}

// Рандомайзер выдаёт случайное число в диапазоне от MIN до MAX (включительно)
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Добавить эффект в колоду игрока
 */
export function addEffectToDeck(effectId, count = 1) {
    const rarityData = CARD_RARITIES.find(r => r.id === effectId);

    if (!rarityData) {
        console.error(`❌ Эффект "${effectId}" не найден`);
        return false;
    }

    const existing = PLAYER_DECK_EFFECTS.find(e => e.id === effectId);

    if (existing) {
        const newCount = Math.min(existing.countInDeck + count, rarityData.maxCount);
        const added = newCount - existing.countInDeck;
        existing.countInDeck = newCount;
        console.log(`➕ Добавлено ${added} карт "${rarityData.name}" (теперь ${newCount})`);
    } else {
        const actualCount = Math.min(count, rarityData.maxCount);
        PLAYER_DECK_EFFECTS.push({ id: effectId, countInDeck: actualCount });
        console.log(`➕ Добавлен эффект "${rarityData.name}" (${actualCount} карт)`);
    }

    return true;
}

// Подсчёт статистики колоды на основе PLAYER_DECK_EFFECTS
export function getDeckStats() {
    let cursesCount = 0;
    let blessingsCount = 0;
    let cursedCardsCount = 0;
    let blessedCardsCount = 0;

    PLAYER_DECK_EFFECTS.forEach(effect => {
        const rarityData = CARD_RARITIES.find(r => r.id === effect.id);
        if (!rarityData) return;

        if (rarityData.impact < 0) {
            cursesCount++;
            cursedCardsCount += effect.countInDeck;
        } else if (rarityData.impact > 0) {
            blessingsCount++;
            blessedCardsCount += effect.countInDeck;
        }
    });

    return { cursesCount, blessingsCount, cursedCardsCount, blessedCardsCount };
}

// Получить количество проклятий в колоде
export function getCursesCount() { return getDeckStats().cursesCount; }

// Получить количество благословений в колоде
export function getBlessingsCount() { return getDeckStats().blessingsCount; }

// Получить количество проклятых карт в колоде
export function getCursedCardsCount() { return getDeckStats().cursedCardsCount; }

// Получить количество благословенных карт в колоде
export function getBlessedCardsCount() { return getDeckStats().blessedCardsCount; }

function getRandomItems(array, count) {
    const copy = [...array];
    shuffleArray(copy);
    return copy.slice(0, count);
}

export function resetDeck() {
    PLAYER_DECK_EFFECTS.length = 0;
    console.log('🔄 Колода игрока сброшена');
}

/**
 * Удалить проклятие из колоды игрока
 * @param {string} effectId - ID проклятия
 * @returns {boolean} true если успешно удалено
 */
export function removeCurseFromDeck(effectId) {
    const existing = PLAYER_DECK_EFFECTS.find(e => e.id === effectId);
    
    if (!existing) {
        console.error(`❌ Проклятие "${effectId}" не найдено в PLAYER_DECK_EFFECTS`);
        return false;
    }
    
    const rarityData = CARD_RARITIES.find(r => r.id === effectId);
    if (!rarityData) {
        console.error(`❌ Проклятие "${effectId}" не найдено в CARD_RARITIES`);
        return false;
    }
    
    if (rarityData.impact >= 0) {
        console.error(`❌ "${effectId}" не является проклятием (impact >= 0)`);
        return false;
    }
    
    // Удаляем эффект полностью (in-place, без переназначения)
    const filtered = PLAYER_DECK_EFFECTS.filter(e => e.id !== effectId);
    PLAYER_DECK_EFFECTS.splice(0, PLAYER_DECK_EFFECTS.length, ...filtered);
    
    console.log(`✅ Проклятие "${rarityData.name}" удалено из колоды игрока`);
    console.log(`   Оставшиеся эффекты:`, PLAYER_DECK_EFFECTS);
    
    return true;
}
