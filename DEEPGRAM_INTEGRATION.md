# Integración de Deepgram para Transcripción en Tiempo Real

## 📋 Resumen

Esta integración permite transcripción en tiempo real durante las videollamadas usando Deepgram, reemplazando la funcionalidad de transcripción de Stream.

## 🎯 Características

- ✅ **Transcripción en tiempo real** durante videollamadas
- ✅ **Identificación de hablantes (diarización)**: distingue entre doctor y paciente
- ✅ **Subtítulos en vivo**: muestra las transcripciones en tiempo real en la interfaz
- ✅ **Guardado automático**: las transcripciones finales se guardan en el backend
- ✅ **Modelo Nova-2**: utiliza el modelo más reciente de Deepgram para español

## 🚀 Configuración

### 1. Obtener API Key de Deepgram

1. Crear una cuenta en [Deepgram](https://deepgram.com/)
2. Obtener tu API Key desde el dashboard
3. Agregar la variable de entorno:

```bash
DEEPGRAM_SECRET=tu_api_key_aqui
```

### 2. Archivos Creados

#### Backend (API Routes)

- **`src/apps/app/src/app/api/deepgram/token/route.ts`**
  - Genera tokens temporales para clientes de Deepgram
  - Seguridad: tokens con expiración de 1 hora

- **`src/apps/app/src/app/api/deepgram/save-transcript/route.ts`**
  - Guarda transcripciones finales en el backend
  - TODO: Integrar con base de datos

#### Frontend (Hooks y Componentes)

- **`src/apps/app/src/hooks/useDeepgramTranscription.ts`**
  - Hook personalizado para manejar la conexión WebSocket con Deepgram
  - Gestiona el ciclo de vida de la transcripción
  - Envía audio en tiempo real y recibe transcripciones

- **`src/apps/app/src/components/call/live-transcription-display.tsx`**
  - Componente que muestra subtítulos en tiempo real
  - Animaciones suaves con Framer Motion
  - Auto-scroll y limitación a últimos 5 segmentos

#### Modificaciones

- **`src/apps/app/src/components/call/index.tsx`**
  - Integrado hook de transcripción en `MyUILayout`
  - Modificado `TranscriptionButton` para usar Deepgram
  - Agregado componente de visualización de transcripciones

## 🔧 Arquitectura

### Flujo de Transcripción

```
1. Usuario hace clic en botón de transcripción
   ↓
2. Frontend solicita token temporal a /api/deepgram/token
   ↓
3. Se establece conexión WebSocket con Deepgram
   ↓
4. MediaRecorder captura audio del micrófono cada 250ms
   ↓
5. Audio se envía a Deepgram vía WebSocket
   ↓
6. Deepgram responde con transcripciones (interim + final)
   ↓
7. Transcripciones se muestran en tiempo real en la UI
   ↓
8. Transcripciones finales se guardan en /api/deepgram/save-transcript
```

### Configuración de Deepgram

```typescript
{
  model: 'nova-2',           // Modelo más reciente
  language: 'es',            // Español
  smart_format: true,        // Formato inteligente
  punctuate: true,           // Puntuación automática
  diarize: true,             // Identificación de hablantes
  interim_results: true,     // Resultados intermedios
  encoding: 'linear16',      // Formato de audio
  sample_rate: 16000         // Frecuencia de muestreo
}
```

## 📊 Tipos de Datos

### TranscriptSegment

```typescript
{
  text: string;           // Texto transcrito
  speaker: number;        // ID del hablante (0=Doctor, 1=Paciente)
  timestamp: number;      // Timestamp en ms
  isFinal: boolean;       // Si es transcripción final o intermedia
  words?: TranscriptWord[]; // Palabras individuales con metadata
}
```

### TranscriptWord

```typescript
{
  word: string;           // Palabra
  start: number;          // Tiempo de inicio
  end: number;            // Tiempo de fin
  confidence: number;     // Confianza (0-1)
  speaker?: number;       // ID del hablante
}
```

## 🎨 UI/UX

- **Botón de transcripción**: Icono `AudioLines` que pulsa en rojo cuando está activo
- **Panel de subtítulos**: Aparece en la parte inferior de la pantalla durante la llamada
- **Diferenciación visual**: 
  - Transcripciones finales: blanco sólido
  - Transcripciones intermedias: gris itálico
- **Indicador de hablante**: "Doctor" o "Paciente" en color violeta

## 📝 Próximos Pasos (TODO)

1. **Modelo de Base de Datos**: Crear tabla `Transcription` para persistir transcripciones
2. **Endpoint de Consulta**: Modificar `/api/functions/get-transcription` para leer desde DB
3. **Historial de Transcripciones**: Mostrar transcripciones guardadas en el componente History
4. **Exportar Transcripciones**: Permitir descargar transcripciones en formato TXT/PDF
5. **Configuración de Idioma**: Permitir cambiar idioma de transcripción
6. **Análisis de Sentimiento**: Integrar análisis de sentimiento en las transcripciones

## 🐛 Troubleshooting

### Error: "DEEPGRAM_SECRET not configured"
- Verificar que la variable de entorno esté configurada en `.env.local`

### No se obtiene audio
- Verificar permisos del navegador para acceder al micrófono
- Comprobar que el participante local tenga `audioStream` activo

### WebSocket se desconecta
- El keep-alive envía pings cada 5 segundos para mantener la conexión
- Verificar conectividad de red

## 📚 Referencias

- [Documentación de Deepgram](https://developers.deepgram.com/)
- [Deepgram SDK para JavaScript](https://github.com/deepgram/deepgram-js-sdk)
- [Live Streaming Audio](https://developers.deepgram.com/docs/live-streaming-audio)

