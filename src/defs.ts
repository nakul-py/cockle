import type { IObservableDisposable } from '@lumino/disposable';

import { IHandleStdin, IStdinReply, IStdinRequest } from './buffered_io';
import { IOutputCallback } from './callback';
import { IExternalCommand } from './external_command';

export interface IShell extends IObservableDisposable {
  input(char: string): Promise<void>;
  setSize(rows: number, columns: number): Promise<void>;
  shellId: string;
  start(): Promise<void>;

  /**
   * Call just after theme change so the shell knows whether it is using dark or light mode.
   * If the dark/light mode is not specified then the shell will ask the terminal what the
   * background color is to determine it.
   */
  themeChange(isDark?: boolean): void;
}

export namespace IShell {
  export interface IOptions {
    shellId?: string; // Unique ID/name
    color?: boolean;
    mountpoint?: string;
    baseUrl: string;
    wasmBaseUrl: string;
    browsingContextId?: string;
    shellManager?: IShellManager; // If specified, register this shell with shellManager
    aliases?: { [key: string]: string };
    environment?: { [key: string]: string | undefined };
    externalCommands?: IExternalCommand.IOptions[];

    // Initial directories and files to create, for testing purposes.
    initialDirectories?: string[];
    initialFiles?: IShell.IFiles;

    outputCallback: IOutputCallback;
  }

  export type IFiles = { [key: string]: string };
}

export interface IShellManager {
  handleStdin(request: IStdinRequest): Promise<IStdinReply>;
  registerShell(shellId: string, shell: IShell, handleStdin: IHandleStdin): void;
  shellIds(): string[];
}
