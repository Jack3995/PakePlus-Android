// data/save-manager.js
import {
  PLAYER_DECK_EFFECTS
} from './deck-manager.js';

import { APP_VERSION } from './version.js';

const SAVE_KEY = 'save_your_soul_save';

// ЛОГИРОВАНИЕ
function logSaveData(saveData, title = 'СОСТОЯНИЕ СОХРАНЕНИЯ') {
  if (!saveData?.state) {
    console.log('📭 Нет данных для логирования');
    return;
  }

  console.log('🖥️ Последний экран:', saveData.state.currentScreen || 'не установлен');
  console.log('🔴 Круг/Раунд:', saveData.state.currentCircle || 0, '/', saveData.state.currentRound || 0);
  console.log('⚔️ Партий сыграно:', saveData.state.totalBattlesPlayed || 0);
  console.log('✨ Искры душ:', saveData.state.sparks || 0);
  console.log('🎭 Эффекты колоды:', saveData.state.deckEffects || 0);
  console.groupEnd();
}

export const SaveManager = {
save(state) {
    const saveData = {
      version: APP_VERSION,
      timestamp: Date.now(),
      state: {
        currentScreen: state.currentScreen,
        currentCircle: state.currentCircle,
        currentRound: state.currentRound,
        totalBattlesPlayed: state.totalBattlesPlayed,
        sparks: state.sparks,
        deckEffects: [...PLAYER_DECK_EFFECTS],
        minionAssignments: state.minionAssignments ? [...state.minionAssignments] : [],
        minionState: state.minionState ? JSON.parse(JSON.stringify(state.minionState)) : {},
        bossDefeated: state.bossDefeated ? [...state.bossDefeated] : [],
        allMinionsDefeated: state.allMinionsDefeated ? [...state.allMinionsDefeated] : [],
      }
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));

    console.groupCollapsed('💾 СОХРАНЕНИЕ ВЫПОЛНЕНО');
    logSaveData(saveData, 'СОХРАНЕНО В LOCALSTORAGE');
    console.groupEnd();
    return true;
  },

  load(state) {
    try {
      const savedData = localStorage.getItem(SAVE_KEY);
      if (!savedData) {
        console.log('📭 СОХРАНЕНИЕ НЕ НАЙДЕНО');
        return null;
      }

      const saveData = JSON.parse(savedData);
      console.groupCollapsed('💾 СОХРАНЕНИЕ ЗАГРУЖАЕТСЯ');
      logSaveData(saveData, 'НАЙДЕНО В LOCALSTORAGE');
      console.groupEnd();
      state.currentScreen = saveData.state.currentScreen;
      state.currentCircle = saveData.state.currentCircle;
      state.currentRound = saveData.state.currentRound;
      state.totalBattlesPlayed = saveData.state.totalBattlesPlayed;
      state.sparks = saveData.state.sparks;

      // ВОССТАНАВЛИВАЕМ ГЛОБАЛЬНЫЙ массив!
      if (saveData.state.deckEffects?.length > 0) {
        PLAYER_DECK_EFFECTS.splice(0, PLAYER_DECK_EFFECTS.length, ...saveData.state.deckEffects);
        console.log('✅ Колода эффектов восстановлена');
      }

// ВОССТАНАВЛИВАЕМ назначения миньонов
      if (saveData.state.minionAssignments && saveData.state.minionAssignments.length > 0) {
        state.minionAssignments = saveData.state.minionAssignments;
        console.log('✅ Назначения миньонов восстановлены:', state.minionAssignments);
      }

      // ВОССТАНАВЛИВАЕМ состояние миньонов
      if (saveData.state.minionState) {
        state.minionState = saveData.state.minionState;
        console.log('✅ Состояние миньонов восстановлено');
      } else {
        state.minionState = {};
      }

      // ВОССТАНАВЛИВАЕМ флаги боссов
      if (saveData.state.bossDefeated) {
        state.bossDefeated = saveData.state.bossDefeated;
      } else {
        state.bossDefeated = new Array(10).fill(false);
      }

      if (saveData.state.allMinionsDefeated) {
        state.allMinionsDefeated = saveData.state.allMinionsDefeated;
      } else {
        state.allMinionsDefeated = new Array(10).fill(false);
      }

      return saveData;
    } catch (error) {
      console.error('❌ Ошибка загрузки:', error);
      return null;
    }
  },

  hasSave() {
    const has = localStorage.getItem(SAVE_KEY) !== null;
    console.log('🔍 Проверка сохранения:', has ? '✅ Есть' : '❌ Нет');
    return has;
  },

  delete() {
    if (this.hasSave()) {
      const hadSave = this.hasSave();
      localStorage.removeItem(SAVE_KEY);
      console.groupCollapsed('🗑️ СОХРАНЕНИЕ УДАЛЕНО');
      console.log('Было сохранение:', hadSave);
      console.log('localStorage очищен');
      console.groupEnd();
    }
  },

  getInfo() {
    try {
      const data = localStorage.getItem(SAVE_KEY);
      if (!data) {
        console.log('📭 Инфо: сохранение отсутствует');
        return null;
      }

      const saveData = JSON.parse(data);
      logSaveData(saveData, 'Найдено в LOCALSTORAGE');

      const date = new Date(saveData.timestamp);
      return {
        circle: saveData.state.currentCircle || 1,
        round: saveData.state.currentRound || 0,
        totalBattles: saveData.state.totalBattlesPlayed || 0,
        sparks: saveData.state.sparks || 0,
        deckEffects: saveData.state.deckEffects?.length || 0,
        date: date.toLocaleString('ru-RU')
      };
    } catch (error) {
      console.error('❌ Ошибка чтения инфы:', error);
      return null;
    }
  }
};

// Делаем глобально доступным
window.SaveManager = SaveManager;