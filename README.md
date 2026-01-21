# 🧠 AI Chat Assistant

Современный чат-интерфейс с поддержкой **локальных AI-моделей**, историей переписок, streaming-генерацией и интуитивным UX.  
Работает **без интернета** и **без API-ключей** благодаря [Ollama](https://ollama.com/).

![AI Chat Screenshot](https://sun9-83.userapi.com/s/v1/ig2/DimCRvw4RS-SoqwWpEEapfvzWk-NNKtNUpj8FUiBaOmfWAAn-3PXnqdvs9Ce-FVVqm7Ndy877Nbd2hbEeS7bgS2x.jpg?quality=95&as=32x23,48x35,72x52,108x78,160x116,240x174,360x261,480x348,540x391,640x464,720x522,1080x782,1280x927,1440x1043,1520x1101&from=bu&u=9ZfVFfmXIvaDGD0j08P-FIOK_MYGeYkupL9wNcWU5tw&cs=1520x0](https://sun9-67.userapi.com/s/v1/ig2/GTrksCYehCfwjr-RfFGEMcqttZ22Zw1pgPSQZTmHIT8ctOeUYMjQjL6-m_NWKFUXNjiffiSucc9buuX8eSTmZyep.jpg?quality=95&as=32x24,48x37,72x55,108x82,160x122,240x183,360x274,480x365,540x411,640x487,720x548,1080x822,1280x974,1440x1096,1487x1132&from=bu&cs=1487x0))

## ✨ Основные возможности

- **Локальная AI-модель** через Ollama (`phi3`, `llama3`, `mistral` и др.)
- **Streaming-ответы** — текст появляется в реальном времени
- **История чатов** с автозаголовками и удалением
- **Остановка генерации** в любой момент
- **Полное сохранение** истории между сессиями (localStorage)
- **Модульная архитектура**: React + TypeScript + Zustand + Tailwind CSS
- **Адаптивный дизайн** — работает на всех устройствах

## 🛠️ Технологии

- **Frontend**: React 18, TypeScript, Vite
- **State Management**: Zustand (с persist middleware)
- **UI**: Tailwind CSS, собственные UI-компоненты (`Button`, `Card`, `Textarea`)
- **AI Backend**: Ollama (локальный сервер на `http://localhost:11434`)
- **Linting**: ESLint + TypeScript strict mode

## 🚀 Быстрый запуск

### 1. Установите зависимости
```bash
npm install
