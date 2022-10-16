declare type ProcessRenderer = "window" | "popover";
declare const AvailableProcessesArray: readonly ["spotify", "code", "calendar", "browser", "network"];
declare type AvailableProcesses = typeof AvailableProcessesArray[number];
declare type ProcessConfig = {
    id?: string;
    rendererId?: string;
    type: AvailableProcesses;
    renderer: ProcessRenderer;
    name: string;
    dynamicName?: React.FC<any>;
    description?: string;
    dynamicDescription?: React.FC<any>;
    icon?: React.FC<{
        className?: string;
    }>;
    root: React.FC<{
        id: string;
    }>;
};
declare const config: ProcessConfig[];

export { AvailableProcesses, AvailableProcessesArray, ProcessConfig, ProcessRenderer, config };
