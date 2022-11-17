export interface Event {
    appName: string;
    ownerAddress: string;
    eventName: string;
    template: Record<string, string>;
    metadata?: Record<string, string>;
}