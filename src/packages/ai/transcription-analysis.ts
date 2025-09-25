import { openai } from './index';
import { generateText } from 'ai';

export interface TranscriptionAnalysis {
  summary: string;
  keyPoints: string[];
  medicalTerms: string[];
  recommendations: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  urgency: 'low' | 'medium' | 'high';
}

export interface TranscriptionData {
  text: string;
  timestamp: string;
  speaker?: string;
}

export interface RealTimeAnalysis {
  keyInsight: string;
  medicalTerm: string | null;
  urgency: 'low' | 'medium' | 'high';
  sentiment: 'positive' | 'neutral' | 'negative';
}

export class TranscriptionAnalysisService {
  private readonly model = 'gpt-4o-mini'; // Modelo más económico para análisis en tiempo real

  async analyzeTranscription(transcriptions: TranscriptionData[]): Promise<TranscriptionAnalysis> {
    try {
      // Combinar todas las transcripciones en un texto continuo
      const fullText = transcriptions
        .map(t => `[${t.timestamp}] ${t.speaker || 'Paciente'}: ${t.text}`)
        .join('\n');

      const prompt = `
Eres un asistente médico especializado en análisis de consultas médicas. Analiza la siguiente transcripción de una consulta médica y proporciona un análisis estructurado.

TRANSCRIPCIÓN:
${fullText}

Por favor, proporciona un análisis en el siguiente formato JSON:

{
  "summary": "Resumen conciso de la consulta (máximo 150 palabras)",
  "keyPoints": ["Punto clave 1", "Punto clave 2", "Punto clave 3"],
  "medicalTerms": ["Término médico 1", "Término médico 2"],
  "recommendations": ["Recomendación 1", "Recomendación 2"],
  "sentiment": "positive|neutral|negative",
  "urgency": "low|medium|high"
}

IMPORTANTE:
- El análisis debe ser profesional y médico
- Identifica síntomas, diagnósticos y tratamientos mencionados
- Evalúa la urgencia basándote en los síntomas descritos
- Mantén la confidencialidad médica
- Responde SOLO con el JSON válido, sin texto adicional
`;

      const { text } = await generateText({
        model: openai(this.model),
        prompt,
        temperature: 0.3, // Baja temperatura para respuestas más consistentes
        maxTokens: 1000,
      });

      // Parsear la respuesta JSON
      const analysis = JSON.parse(text) as TranscriptionAnalysis;
      
      return analysis;
    } catch (error) {
      console.error('Error analyzing transcription:', error);
      
      // Retornar análisis por defecto en caso de error
      return {
        summary: 'Error al analizar la transcripción. Por favor, revise manualmente.',
        keyPoints: [],
        medicalTerms: [],
        recommendations: ['Revisar transcripción manualmente'],
        sentiment: 'neutral',
        urgency: 'medium',
      };
    }
  }

  async analyzeRealTime(transcription: TranscriptionData): Promise<RealTimeAnalysis> {
    try {
      const prompt = `
Analiza esta nueva línea de transcripción médica y proporciona insights rápidos:

TRANSCRIPCIÓN: [${transcription.timestamp}] ${transcription.speaker || 'Paciente'}: ${transcription.text}

Responde con un JSON simple:
{
  "keyInsight": "Insight clave de esta línea",
  "medicalTerm": "Término médico si lo hay, o null",
  "urgency": "low|medium|high",
  "sentiment": "positive|neutral|negative"
}
`;

      const { text } = await generateText({
        model: openai(this.model),
        prompt,
        temperature: 0.2,
        maxTokens: 200,
      });

      return JSON.parse(text) as RealTimeAnalysis;
    } catch (error) {
      console.error('Error in real-time analysis:', error);
      return {
        keyInsight: 'Error en análisis',
        medicalTerm: null,
        urgency: 'medium',
        sentiment: 'neutral',
      };
    }
  }

  async generateMedicalSummary(transcriptions: TranscriptionData[]): Promise<string> {
    try {
      const fullText = transcriptions
        .map(t => `[${t.timestamp}] ${t.speaker || 'Paciente'}: ${t.text}`)
        .join('\n');

      const prompt = `
Genera un resumen médico profesional de la siguiente consulta:

${fullText}

El resumen debe incluir:
1. Motivo de consulta
2. Síntomas principales
3. Examen físico (si se menciona)
4. Diagnóstico o impresión diagnóstica
5. Plan de tratamiento
6. Recomendaciones

Formato: Párrafo estructurado y profesional para historial médico.
`;

      const { text } = await generateText({
        model: openai(this.model),
        prompt,
        temperature: 0.3,
        maxTokens: 500,
      });

      return text;
    } catch (error) {
      console.error('Error generating medical summary:', error);
      return 'Error al generar resumen médico. Por favor, revise manualmente.';
    }
  }
}

export const transcriptionAnalysisService = new TranscriptionAnalysisService();
