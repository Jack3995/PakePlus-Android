// data/utils.js — общие утилиты, используемые несколькими модулями

import { CIRCLES, MAX_ROUNDS } from './data.js';

// ========================================
// ФОН КРУГА АДА
// ========================================

// Очистка фона круга с body
export function clearCircleBackground() {
    for (let i = 1; i <= 9; i++) {
        document.body.classList.remove(`circle-bg-${i}`);
    }
    document.body.classList.remove('has-circle-bg');
}

// Применение фона текущего круга + включение видимости
export function applyCircleBackground(circleNum) {
    for (let i = 1; i <= 9; i++) {
        document.body.classList.remove(`circle-bg-${i}`);
    }
    document.body.classList.add(`circle-bg-${circleNum}`, 'has-circle-bg');
    console.log(`🎨 Фон: круг ${circleNum}`);
}

// ========================================
// РАУНДЫ И КРУГИ
// ========================================

// Количество раундов в круге из CIRCLES
export function getRoundsInCircle(circleNum) {
    const circle = CIRCLES[circleNum];
    if (!circle) return 0;
    return circle.minions.length + 1; // миньоны + босс
}

// Количество миньонов (minion-раундов) в круге
export function getMinionCountForCircle(circleNum) {
    const circle = CIRCLES[circleNum];
    return circle ? circle.minions.length : 0;
}

// Сколько раундов-боссов в круге (1 для demon-of-circle, 0 если нет)
export function getBossCountForCircle(circleNum) {
    const circle = CIRCLES[circleNum];
    return circle && circle.boss ? 1 : 0;
}

// ========================================
// ФОРМАТИРОВАНИЕ КАРТ ДЛЯ ЛОГОВ
// ========================================

// Преобразует объект карты в компактную строковую нотацию вида K♠
export function formatCard(card) {
    const valueName = card.value.name;
    const suitSymbol = card.suit.symbol;
    return `${valueName}${suitSymbol}`;
}

// Преобразует массив карт в удобную строку для консольного логирования
export function formatCardsArray(cards, label = '') {
    const header = label ? `${label}: ` : '';
    return header + cards.map(formatCard).join(', ');
}

// ========================================
// ПРОКЛЯТИЯ — ДОБАВЛЕНИЕ В КОЛОДУ
// ========================================

/**
 * applyCurseToDeck — добавляет указанное количество проклятых карт в PLAYER_DECK_EFFECTS.
 * Если колода полностью занята (все 52 карты уже имеют эффекты), заменяет самые «слабые»
 * проклятия (с наименьшим |impact|) новыми, более сильными.
 *
 * Принимает ссылки на модуль deck-manager для избежания циклических зависимостей.
 *
 * @param {string} effectId           — ID эффекта из CARD_RARITIES
 * @param {number} count              — количество карт для добавления
 * @param {object} deckManager        — объект с { CARD_RARITIES, PLAYER_DECK_EFFECTS, addEffectToDeck }
 */
export function applyCurseToDeck(effectId, count, deckManager) {
    const { CARD_RARITIES, PLAYER_DECK_EFFECTS, addEffectToDeck } = deckManager;
    const MAX_DECK = 52;

    const curseData = CARD_RARITIES.find(r => r.id === effectId);
    if (!curseData || curseData.impact >= 0) {
        console.warn(`[CURSE] "${effectId}" не является проклятием или не найдено`);
        return false;
    }

    // Считаем, сколько карт в колоде уже занято эффектами
    const usedSlots = PLAYER_DECK_EFFECTS.reduce((sum, e) => sum + e.countInDeck, 0);
    const freeSlots = MAX_DECK - usedSlots;

    console.groupCollapsed(`💀 applyCurseToDeck: ${curseData.name} ×${count}`);
    console.log(`   Занято слотов: ${usedSlots}/${MAX_DECK}, свободно: ${freeSlots}`);

    let remaining = count;

    // 1. Сначала занимаем свободные слоты
    if (freeSlots > 0) {
        const toAdd = Math.min(remaining, freeSlots, curseData.maxCount);
        if (toAdd > 0) {
            addEffectToDeck(effectId, toAdd);
            remaining -= toAdd;
            console.log(`   → Добавлено в свободные слоты: ${toAdd}`);
        }
    }

    // 2. Если всё ещё нужно место — заменяем самые слабые проклятия
    while (remaining > 0) {
        const cursesInDeck = PLAYER_DECK_EFFECTS
            .map(e => {
                const r = CARD_RARITIES.find(rr => rr.id === e.id);
                return { ...e, impact: r ? r.impact : 0, maxCount: r ? r.maxCount : 0 };
            })
            .filter(e => e.impact < 0)
            .sort((a, b) => Math.abs(a.impact) - Math.abs(b.impact));

        if (cursesInDeck.length === 0) {
            console.warn('   ⚠️ Нет проклятий для замены — больше некуда добавлять');
            break;
        }

        const weakest = cursesInDeck[0];
        const curseAbsImpact = Math.abs(curseData.impact);

        if (curseAbsImpact <= Math.abs(weakest.impact)) {
            console.warn(`   ⚠️ Новое проклятие не сильнее самого слабого (${curseData.name}: ${curseAbsImpact} vs ${weakest.id}: ${Math.abs(weakest.impact)})`);
            break;
        }

        const replaceCount = Math.min(remaining, weakest.countInDeck);
        console.log(`   🔄 Замена: убираем ${replaceCount}×${weakest.id}, добавляем ${replaceCount}×${effectId}`);

        weakest.countInDeck -= replaceCount;
        if (weakest.countInDeck <= 0) {
            const idx = PLAYER_DECK_EFFECTS.findIndex(e => e.id === weakest.id);
            if (idx !== -1) PLAYER_DECK_EFFECTS.splice(idx, 1);
        }

        addEffectToDeck(effectId, replaceCount);
        remaining -= replaceCount;
    }

    console.groupEnd();
    return true;
}
