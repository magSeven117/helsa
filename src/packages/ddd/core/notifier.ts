export interface Notifier {
  notify(event: string, userId: string, data?: any): Promise<void>;
}
