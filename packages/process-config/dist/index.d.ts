declare type ProcessRenderer = "window" | "other";
declare const AvailableProcessesArray: readonly ["spotify", "code"];
declare type AvailableProcesses = typeof AvailableProcessesArray[number];
declare type ProcessConfig = {
    id?: string;
    rendererId?: string;
    type: AvailableProcesses;
    renderer: ProcessRenderer;
    name: string;
    description?: string;
    icon?: React.FC<{
        className?: string;
    }>;
    root: React.FC;
};
declare const config: ProcessConfig[];

export { AvailableProcesses, AvailableProcessesArray, ProcessConfig, ProcessRenderer, config };
