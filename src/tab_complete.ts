/**
 * Enum to find possible matching file and/or directory names.
 */
export enum PathType {
  Any = 0,
  Directory = 1,
  File = 2
}

/**
 * Result of an ICommandRunner.tabComplete() call.
 */
export interface ITabCompleteResult {
  possibles?: string[];
  pathType?: PathType;
}
