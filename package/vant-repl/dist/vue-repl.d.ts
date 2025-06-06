import { Component } from 'vue';
import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { ComputedRef } from 'vue';
import { CreateComponentPublicInstanceWithMixins } from 'vue';
import * as defaultCompiler from 'vue/compiler-sfc';
import { DefineComponent } from 'vue';
import { editor } from 'monaco-editor-core';
import { GlobalComponents } from 'vue';
import { GlobalDirectives } from 'vue';
import { version as languageToolsVersion } from '@vue/language-service/package.json';
import type * as monaco from 'monaco-editor-core';
import { PublicProps } from 'vue';
import { Ref } from 'vue';
import { SFCAsyncStyleCompileOptions } from 'vue/compiler-sfc';
import { SFCScriptCompileOptions } from 'vue/compiler-sfc';
import { SFCTemplateCompileOptions } from 'vue/compiler-sfc';
import { ShallowRef } from 'vue';
import { ToRefs } from 'vue';
import { UnwrapRef } from 'vue';

declare type __VLS_Props = ReplProps;

declare type __VLS_Props_2 = {
    show: boolean;
    ssr: boolean;
};

declare type __VLS_PublicProps = {
    modelValue?: boolean;
} & __VLS_Props;

export declare function compileFile(store: Store, { filename, code, compiled }: File_2): Promise<(string | Error)[]>;

declare type EditorComponentType = Component<EditorProps>;

declare type EditorMode = 'js' | 'css' | 'ssr';

declare interface EditorProps {
    value: string;
    filename: string;
    readonly?: boolean;
    mode?: EditorMode;
}

declare class File_2 {
    filename: string;
    code: string;
    hidden: boolean;
    compiled: {
        js: string;
        css: string;
        ssr: string;
    };
    editorViewState: editor.ICodeEditorViewState | null;
    constructor(filename: string, code?: string, hidden?: boolean);
    get language(): "css" | "vue" | "typescript" | "html" | "javascript";
}
export { File_2 as File }

export declare interface ImportMap {
    imports?: Record<string, string | undefined>;
    scopes?: Record<string, Record<string, string>>;
}

export { languageToolsVersion }

export declare function mergeImportMap(a: ImportMap, b: ImportMap): ImportMap;

export declare type OutputModes = 'preview' | EditorMode;

export declare const Preview: DefineComponent<__VLS_Props_2, {
reload: () => void | undefined;
container: ComputedRef<HTMLDivElement | null | undefined>;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<__VLS_Props_2> & Readonly<{}>, {}, {}, {}, {}, string, ComponentProvideOptions, false, {
sandbox: CreateComponentPublicInstanceWithMixins<Readonly<SandboxProps> & Readonly<{}>, {
reload: () => void;
container: Readonly<ShallowRef<HTMLDivElement | null>>;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, PublicProps, {
ssr: boolean;
theme: "dark" | "light";
clearConsole: boolean;
previewOptions: {
headHTML?: string;
bodyHTML?: string;
placeholderHTML?: string;
customCode?: {
importCode?: string;
useCode?: string;
};
showRuntimeError?: boolean;
showRuntimeWarning?: boolean;
};
show: boolean;
autoStoreInit: boolean;
}, false, {}, {}, GlobalComponents, GlobalDirectives, string, {
container: HTMLDivElement;
}, any, ComponentProvideOptions, {
P: {};
B: {};
D: {};
C: {};
M: {};
Defaults: {};
}, Readonly<SandboxProps> & Readonly<{}>, {
reload: () => void;
container: Readonly<ShallowRef<HTMLDivElement | null>>;
}, {}, {}, {}, {
ssr: boolean;
theme: "dark" | "light";
clearConsole: boolean;
previewOptions: {
headHTML?: string;
bodyHTML?: string;
placeholderHTML?: string;
customCode?: {
importCode?: string;
useCode?: string;
};
showRuntimeError?: boolean;
showRuntimeWarning?: boolean;
};
show: boolean;
autoStoreInit: boolean;
}> | null;
}, any>;

/**
 * Reload the preview iframe
 */
declare function reload(): void;

/**
 * Reload the preview iframe
 */
declare function reload_2(): void;

export declare const Repl: DefineComponent<__VLS_PublicProps, {
reload: typeof reload;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: boolean) => any;
}, string, PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
"onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}>, {
ssr: boolean;
layout: "horizontal" | "vertical";
store: Store;
layoutReverse: boolean;
splitPaneOptions: {
codeTogglerText?: string;
outputTogglerText?: string;
};
theme: "dark" | "light";
previewTheme: boolean;
autoResize: boolean;
showCompileOutput: boolean;
showImportMap: boolean;
showTsConfig: boolean;
clearConsole: boolean;
previewOptions: {
headHTML?: string;
bodyHTML?: string;
placeholderHTML?: string;
customCode?: {
importCode?: string;
useCode?: string;
};
showRuntimeError?: boolean;
showRuntimeWarning?: boolean;
};
editorOptions: {
showErrorText?: string | false;
autoSaveText?: string | false;
monacoOptions?: monaco.editor.IStandaloneEditorConstructionOptions;
};
}, {}, {}, {}, string, ComponentProvideOptions, false, {
output: CreateComponentPublicInstanceWithMixins<Readonly<{
editorComponent: EditorComponentType;
showCompileOutput?: boolean;
ssr: boolean;
}> & Readonly<{}>, {
reload: () => void;
previewRef: Readonly<ShallowRef<CreateComponentPublicInstanceWithMixins<Readonly<{
show: boolean;
ssr: boolean;
}> & Readonly<{}>, {
reload: () => void | undefined;
container: ComputedRef<HTMLDivElement | null | undefined>;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, PublicProps, {}, false, {}, {}, GlobalComponents, GlobalDirectives, string, {
sandbox: CreateComponentPublicInstanceWithMixins<Readonly<SandboxProps> & Readonly<{}>, {
reload: () => void;
container: Readonly<ShallowRef<HTMLDivElement | null>>;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, PublicProps, {
ssr: boolean;
theme: "dark" | "light";
clearConsole: boolean;
previewOptions: {
headHTML?: string;
bodyHTML?: string;
placeholderHTML?: string;
customCode?: {
importCode?: string;
useCode?: string;
};
showRuntimeError?: boolean;
showRuntimeWarning?: boolean;
};
show: boolean;
autoStoreInit: boolean;
}, false, {}, {}, GlobalComponents, GlobalDirectives, string, {
container: HTMLDivElement;
}, any, ComponentProvideOptions, {
P: {};
B: {};
D: {};
C: {};
M: {};
Defaults: {};
}, Readonly<SandboxProps> & Readonly<{}>, {
reload: () => void;
container: Readonly<ShallowRef<HTMLDivElement | null>>;
}, {}, {}, {}, {
ssr: boolean;
theme: "dark" | "light";
clearConsole: boolean;
previewOptions: {
headHTML?: string;
bodyHTML?: string;
placeholderHTML?: string;
customCode?: {
importCode?: string;
useCode?: string;
};
showRuntimeError?: boolean;
showRuntimeWarning?: boolean;
};
show: boolean;
autoStoreInit: boolean;
}> | null;
}, any, ComponentProvideOptions, {
P: {};
B: {};
D: {};
C: {};
M: {};
Defaults: {};
}, Readonly<{
show: boolean;
ssr: boolean;
}> & Readonly<{}>, {
reload: () => void | undefined;
container: ComputedRef<HTMLDivElement | null | undefined>;
}, {}, {}, {}, {}> | null>>;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, PublicProps, {}, false, {}, {}, GlobalComponents, GlobalDirectives, string, {
preview: CreateComponentPublicInstanceWithMixins<Readonly<{
show: boolean;
ssr: boolean;
}> & Readonly<{}>, {
reload: () => void | undefined;
container: ComputedRef<HTMLDivElement | null | undefined>;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, PublicProps, {}, false, {}, {}, GlobalComponents, GlobalDirectives, string, {
sandbox: CreateComponentPublicInstanceWithMixins<Readonly<SandboxProps> & Readonly<{}>, {
reload: () => void;
container: Readonly<ShallowRef<HTMLDivElement | null>>;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, PublicProps, {
ssr: boolean;
theme: "dark" | "light";
clearConsole: boolean;
previewOptions: {
headHTML?: string;
bodyHTML?: string;
placeholderHTML?: string;
customCode?: {
importCode?: string;
useCode?: string;
};
showRuntimeError?: boolean;
showRuntimeWarning?: boolean;
};
show: boolean;
autoStoreInit: boolean;
}, false, {}, {}, GlobalComponents, GlobalDirectives, string, {
container: HTMLDivElement;
}, any, ComponentProvideOptions, {
P: {};
B: {};
D: {};
C: {};
M: {};
Defaults: {};
}, Readonly<SandboxProps> & Readonly<{}>, {
reload: () => void;
container: Readonly<ShallowRef<HTMLDivElement | null>>;
}, {}, {}, {}, {
ssr: boolean;
theme: "dark" | "light";
clearConsole: boolean;
previewOptions: {
headHTML?: string;
bodyHTML?: string;
placeholderHTML?: string;
customCode?: {
importCode?: string;
useCode?: string;
};
showRuntimeError?: boolean;
showRuntimeWarning?: boolean;
};
show: boolean;
autoStoreInit: boolean;
}> | null;
}, any, ComponentProvideOptions, {
P: {};
B: {};
D: {};
C: {};
M: {};
Defaults: {};
}, Readonly<{
show: boolean;
ssr: boolean;
}> & Readonly<{}>, {
reload: () => void | undefined;
container: ComputedRef<HTMLDivElement | null | undefined>;
}, {}, {}, {}, {}> | null;
}, any, ComponentProvideOptions, {
P: {};
B: {};
D: {};
C: {};
M: {};
Defaults: {};
}, Readonly<{
editorComponent: EditorComponentType;
showCompileOutput?: boolean;
ssr: boolean;
}> & Readonly<{}>, {
reload: () => void;
previewRef: Readonly<ShallowRef<CreateComponentPublicInstanceWithMixins<Readonly<{
show: boolean;
ssr: boolean;
}> & Readonly<{}>, {
reload: () => void | undefined;
container: ComputedRef<HTMLDivElement | null | undefined>;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, PublicProps, {}, false, {}, {}, GlobalComponents, GlobalDirectives, string, {
sandbox: CreateComponentPublicInstanceWithMixins<Readonly<SandboxProps> & Readonly<{}>, {
reload: () => void;
container: Readonly<ShallowRef<HTMLDivElement | null>>;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, PublicProps, {
ssr: boolean;
theme: "dark" | "light";
clearConsole: boolean;
previewOptions: {
headHTML?: string;
bodyHTML?: string;
placeholderHTML?: string;
customCode?: {
importCode?: string;
useCode?: string;
};
showRuntimeError?: boolean;
showRuntimeWarning?: boolean;
};
show: boolean;
autoStoreInit: boolean;
}, false, {}, {}, GlobalComponents, GlobalDirectives, string, {
container: HTMLDivElement;
}, any, ComponentProvideOptions, {
P: {};
B: {};
D: {};
C: {};
M: {};
Defaults: {};
}, Readonly<SandboxProps> & Readonly<{}>, {
reload: () => void;
container: Readonly<ShallowRef<HTMLDivElement | null>>;
}, {}, {}, {}, {
ssr: boolean;
theme: "dark" | "light";
clearConsole: boolean;
previewOptions: {
headHTML?: string;
bodyHTML?: string;
placeholderHTML?: string;
customCode?: {
importCode?: string;
useCode?: string;
};
showRuntimeError?: boolean;
showRuntimeWarning?: boolean;
};
show: boolean;
autoStoreInit: boolean;
}> | null;
}, any, ComponentProvideOptions, {
P: {};
B: {};
D: {};
C: {};
M: {};
Defaults: {};
}, Readonly<{
show: boolean;
ssr: boolean;
}> & Readonly<{}>, {
reload: () => void | undefined;
container: ComputedRef<HTMLDivElement | null | undefined>;
}, {}, {}, {}, {}> | null>>;
}, {}, {}, {}, {}> | null;
}, HTMLDivElement>;

export declare interface ReplProps {
    theme?: 'dark' | 'light';
    previewTheme?: boolean;
    editor: EditorComponentType;
    store?: Store;
    autoResize?: boolean;
    showCompileOutput?: boolean;
    showImportMap?: boolean;
    showTsConfig?: boolean;
    clearConsole?: boolean;
    layout?: 'horizontal' | 'vertical';
    layoutReverse?: boolean;
    ssr?: boolean;
    previewOptions?: {
        headHTML?: string;
        bodyHTML?: string;
        placeholderHTML?: string;
        customCode?: {
            importCode?: string;
            useCode?: string;
        };
        showRuntimeError?: boolean;
        showRuntimeWarning?: boolean;
    };
    editorOptions?: {
        showErrorText?: string | false;
        autoSaveText?: string | false;
        monacoOptions?: monaco.editor.IStandaloneEditorConstructionOptions;
    };
    splitPaneOptions?: {
        codeTogglerText?: string;
        outputTogglerText?: string;
    };
}

export declare interface ReplStore extends UnwrapRef<StoreState> {
    activeFile: File_2;
    /** Loading compiler */
    loading: boolean;
    init(): void;
    setActive(filename: string): void;
    addFile(filename: string | File_2): void;
    deleteFile(filename: string): void;
    renameFile(oldFilename: string, newFilename: string): void;
    getImportMap(): ImportMap;
    setImportMap(map: ImportMap, merge?: boolean): void;
    getTsConfig(): Record<string, any>;
    serialize(): string;
    /**
     * Deserializes the given string to restore the REPL store state.
     * @param serializedState - The serialized state string.
     * @param checkBuiltinImportMap - Whether to check the built-in import map. Default to true
     */
    deserialize(serializedState: string, checkBuiltinImportMap?: boolean): void;
    getFiles(): Record<string, string>;
    setFiles(newFiles: Record<string, string>, mainFile?: string): Promise<void>;
}

export declare const Sandbox: DefineComponent<SandboxProps, {
reload: typeof reload_2;
container: Readonly<ShallowRef<HTMLDivElement | null>>;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<SandboxProps> & Readonly<{}>, {
ssr: boolean;
theme: "dark" | "light";
clearConsole: boolean;
previewOptions: {
headHTML?: string;
bodyHTML?: string;
placeholderHTML?: string;
customCode?: {
importCode?: string;
useCode?: string;
};
showRuntimeError?: boolean;
showRuntimeWarning?: boolean;
};
show: boolean;
autoStoreInit: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
container: HTMLDivElement;
}, any>;

export declare interface SandboxProps {
    store: Store;
    show?: boolean;
    ssr?: boolean;
    clearConsole?: boolean;
    theme?: 'dark' | 'light';
    previewOptions?: {
        headHTML?: string;
        bodyHTML?: string;
        placeholderHTML?: string;
        customCode?: {
            importCode?: string;
            useCode?: string;
        };
        showRuntimeError?: boolean;
        showRuntimeWarning?: boolean;
    };
    /** @default true */
    autoStoreInit?: boolean;
}

export declare interface SFCOptions {
    script?: Partial<SFCScriptCompileOptions>;
    style?: Partial<SFCAsyncStyleCompileOptions>;
    template?: Partial<SFCTemplateCompileOptions>;
}

export declare type Store = Pick<ReplStore, 'files' | 'activeFile' | 'mainFile' | 'errors' | 'showOutput' | 'outputMode' | 'sfcOptions' | 'compiler' | 'vueVersion' | 'locale' | 'typescriptVersion' | 'dependencyVersion' | 'reloadLanguageTools' | 'init' | 'setActive' | 'addFile' | 'deleteFile' | 'renameFile' | 'getImportMap' | 'getTsConfig'>;

export declare type StoreState = ToRefs<{
    files: Record<string, File_2>;
    activeFilename: string;
    mainFile: string;
    template: {
        welcomeSFC?: string;
        newSFC?: string;
    };
    builtinImportMap: ImportMap;
    errors: (string | Error)[];
    showOutput: boolean;
    outputMode: OutputModes;
    sfcOptions: SFCOptions;
    /** `@vue/compiler-sfc` */
    compiler: typeof defaultCompiler;
    vueVersion: string | null;
    vantVersion: string | null;
    locale: string | undefined;
    typescriptVersion: string;
    /** \{ dependencyName: version \} */
    dependencyVersion: Record<string, string>;
    reloadLanguageTools?: (() => void) | undefined;
}>;

export declare function useStore({ files, activeFilename, // set later
    mainFile, template, builtinImportMap, // set later
    errors, showOutput, outputMode, sfcOptions, compiler, vueVersion, vantVersion, locale, typescriptVersion, dependencyVersion, reloadLanguageTools, }?: Partial<StoreState>, serializedState?: string): ReplStore;

export declare function useVueImportMap(defaults?: {
    runtimeDev?: string | (() => string);
    runtimeProd?: string | (() => string);
    serverRenderer?: string | (() => string);
    vueVersion?: string | null;
    vantVersion?: string | null;
}): {
    productionMode: Ref<boolean, boolean>;
    importMap: ComputedRef<ImportMap>;
    vueVersion: Ref<string | null, string | null>;
    defaultVersion: string;
};

export { }
