export interface SaveResult {
    changed: boolean;
    data?: any;
  }
  
export interface ModalRefAttribute {
    show: (data?: any, type?: string) => Promise<SaveResult>;
    close: VoidFunction;
  }