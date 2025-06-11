import "./vue-repl.css";
import {
  defineComponent,
  computed,
  useTemplateRef,
  inject,
  reactive,
  createElementBlock,
  openBlock,
  normalizeClass,
  unref,
  createElementVNode,
  normalizeStyle,
  renderSlot,
  withModifiers,
  withDirectives,
  toDisplayString,
  vShow,
  ref,
  watch,
  createBlock,
  Transition,
  withCtx,
  createCommentVNode,
  toRefs,
  onMounted,
  onUnmounted,
  watchEffect,
  Fragment,
  createVNode,
  renderList,
  withKeys,
  vModelText,
  mergeModels,
  useModel,
  isRef,
  provide,
} from "vue";
import {
  i as injectKeyPreviewRef,
  a as injectKeyProps,
} from "./chunks/types-XqLqBVey.js";
import {
  MagicString,
  babelParse,
  extractIdentifiers,
  walkIdentifiers,
  isStaticProperty,
  isInDestructureAssignment,
  walk,
} from "vue/compiler-sfc";
import {
  i as importMapFile,
  t as tsconfigFile,
  s as stripSrcPrefix,
  u as useStore,
} from "./chunks/package-C8L7gUof.js";
export {
  F as File,
  c as compileFile,
  v as languageToolsVersion,
  m as mergeImportMap,
  a as useVueImportMap,
} from "./chunks/package-C8L7gUof.js";
import { d as debounce } from "./chunks/utils-BJf_b1Uq.js";

const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "SplitPane",
  props: {
    layout: {},
  },
  setup(__props) {
    const props = __props;
    const isVertical = computed(() => props.layout === "vertical");
    const containerRef = useTemplateRef("container");
    const previewRef = inject(injectKeyPreviewRef);
    const { store, layoutReverse, splitPaneOptions } = inject(injectKeyProps);
    const state = reactive({
      dragging: false,
      split: 50,
      viewHeight: 0,
      viewWidth: 0,
    });
    const boundSplit = computed(() => {
      const { split } = state;
      return split < 20 ? 20 : split > 80 ? 80 : split;
    });
    let startPosition = 0;
    let startSplit = 0;
    function dragStart(e) {
      state.dragging = true;
      startPosition = isVertical.value ? e.pageY : e.pageX;
      startSplit = boundSplit.value;
      changeViewSize();
    }
    function dragMove(e) {
      if (containerRef.value && state.dragging) {
        const position = isVertical.value ? e.pageY : e.pageX;
        const totalSize = isVertical.value
          ? containerRef.value.offsetHeight
          : containerRef.value.offsetWidth;
        const dp = position - startPosition;
        state.split = startSplit + +((dp / totalSize) * 100).toFixed(2);
        changeViewSize();
      }
    }
    function dragEnd() {
      state.dragging = false;
    }
    function changeViewSize() {
      const el = previewRef.value;
      if (!el) return;
      state.viewHeight = el.offsetHeight;
      state.viewWidth = el.offsetWidth;
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          "div",
          {
            ref: "container",
            class: normalizeClass([
              "split-pane",
              {
                dragging: state.dragging,
                "show-output": unref(store).showOutput,
                reverse: unref(layoutReverse),
                vertical: isVertical.value,
              },
            ]),
            onMousemove: dragMove,
            onMouseup: dragEnd,
            onMouseleave: dragEnd,
          },
          [
            createElementVNode(
              "div",
              {
                class: "left",
                style: normalizeStyle({
                  [isVertical.value ? "height" : "width"]:
                    boundSplit.value + "%",
                }),
              },
              [
                renderSlot(_ctx.$slots, "left", {}, void 0, true),
                createElementVNode(
                  "div",
                  {
                    class: "dragger",
                    onMousedown: withModifiers(dragStart, ["prevent"]),
                  },
                  null,
                  32,
                ),
              ],
              4,
            ),
            createElementVNode(
              "div",
              {
                class: "right",
                style: normalizeStyle({
                  [isVertical.value ? "height" : "width"]:
                    100 - boundSplit.value + "%",
                }),
              },
              [
                withDirectives(
                  createElementVNode(
                    "div",
                    { class: "view-size" },
                    toDisplayString(
                      `${state.viewWidth}px x ${state.viewHeight}px`,
                    ),
                    513,
                  ),
                  [[vShow, state.dragging]],
                ),
                renderSlot(_ctx.$slots, "right", {}, void 0, true),
              ],
              4,
            ),
            createElementVNode(
              "button",
              {
                class: "toggler",
                onClick:
                  _cache[0] ||
                  (_cache[0] = ($event) =>
                    (unref(store).showOutput = !unref(store).showOutput)),
              },
              toDisplayString(
                unref(store).showOutput
                  ? unref(splitPaneOptions)?.codeTogglerText || "< Code"
                  : unref(splitPaneOptions)?.outputTogglerText || "Output >",
              ),
              1,
            ),
          ],
          34,
        )
      );
    };
  },
});

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const SplitPane = /* @__PURE__ */ _export_sfc(_sfc_main$8, [
  ["__scopeId", "data-v-a9fd0472"],
]);

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "Message",
  props: {
    err: { type: [String, Error, Boolean] },
    warn: {},
  },
  setup(__props) {
    const props = __props;
    const dismissed = ref(false);
    watch(
      () => [props.err, props.warn],
      () => {
        dismissed.value = false;
      },
    );
    function formatMessage(err) {
      if (typeof err === "string") {
        return err;
      } else {
        let msg = err.message;
        const loc = err.loc;
        if (loc && loc.start) {
          msg = `(${loc.start.line}:${loc.start.column}) ` + msg;
        }
        return msg;
      }
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          Transition,
          { name: "fade" },
          {
            default: withCtx(() => [
              !dismissed.value && (_ctx.err || _ctx.warn)
                ? (openBlock(),
                  createElementBlock(
                    "div",
                    {
                      key: 0,
                      class: normalizeClass(["msg", _ctx.err ? "err" : "warn"]),
                    },
                    [
                      createElementVNode(
                        "pre",
                        null,
                        toDisplayString(formatMessage(_ctx.err || _ctx.warn)),
                        1,
                      ),
                      createElementVNode(
                        "button",
                        {
                          class: "dismiss",
                          onClick:
                            _cache[0] ||
                            (_cache[0] = ($event) => (dismissed.value = true)),
                        },
                        "✕",
                      ),
                    ],
                    2,
                  ))
                : createCommentVNode("", true),
            ]),
            _: 1,
          },
        )
      );
    };
  },
});

const Message = /* @__PURE__ */ _export_sfc(_sfc_main$7, [
  ["__scopeId", "data-v-024df844"],
]);

const srcdoc =
  "<!doctype html>\n<html>\n  <head>\n    <style>\n      html.dark {\n        color-scheme: dark;\n      }\n      body {\n        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,\n          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n      }\n    </style>\n    <!-- PREVIEW-OPTIONS-HEAD-HTML -->\n    <script>\n      ;(() => {\n        let scriptEls = []\n\n        window.process = { env: {} }\n        window.__modules__ = {}\n\n        window.__export__ = (mod, key, get) => {\n          Object.defineProperty(mod, key, {\n            enumerable: true,\n            configurable: true,\n            get,\n          })\n        }\n\n        window.__dynamic_import__ = (key) => {\n          return Promise.resolve(window.__modules__[key])\n        }\n\n        async function handle_message(ev) {\n          let { action, cmd_id } = ev.data\n          const send_message = (payload) =>\n            parent.postMessage({ ...payload }, ev.origin)\n          const send_reply = (payload) => send_message({ ...payload, cmd_id })\n          const send_ok = () => send_reply({ action: 'cmd_ok' })\n          const send_error = (message, stack) =>\n            send_reply({ action: 'cmd_error', message, stack })\n\n          if (action === 'eval') {\n            try {\n              if (scriptEls.length) {\n                scriptEls.forEach((el) => {\n                  document.head.removeChild(el)\n                })\n                scriptEls.length = 0\n              }\n\n              let { script: scripts } = ev.data.args\n              if (typeof scripts === 'string') scripts = [scripts]\n\n              for (const script of scripts) {\n                const scriptEl = document.createElement('script')\n                scriptEl.setAttribute('type', 'module')\n                // send ok in the module script to ensure sequential evaluation\n                // of multiple proxy.eval() calls\n                const done = new Promise((resolve) => {\n                  window.__next__ = resolve\n                })\n                scriptEl.innerHTML = script + `\\nwindow.__next__()`\n                document.head.appendChild(scriptEl)\n                scriptEl.onerror = (err) => send_error(err.message, err.stack)\n                scriptEls.push(scriptEl)\n                await done\n              }\n              send_ok()\n            } catch (e) {\n              send_error(e.message, e.stack)\n            }\n          }\n\n          if (action === 'catch_clicks') {\n            try {\n              const top_origin = ev.origin\n              document.body.addEventListener('click', (event) => {\n                if (event.which !== 1) return\n                if (event.metaKey || event.ctrlKey || event.shiftKey) return\n                if (event.defaultPrevented) return\n\n                // ensure target is a link\n                let el = event.target\n                while (el && el.nodeName !== 'A') el = el.parentNode\n                if (!el || el.nodeName !== 'A') return\n\n                if (\n                  el.hasAttribute('download') ||\n                  el.getAttribute('rel') === 'external' ||\n                  el.target ||\n                  el.href.startsWith('javascript:') ||\n                  !el.href\n                )\n                  return\n\n                event.preventDefault()\n\n                if (el.href.startsWith(top_origin)) {\n                  const url = new URL(el.href)\n                  if (url.hash[0] === '#') {\n                    window.location.hash = url.hash\n                    return\n                  }\n                }\n\n                window.open(el.href, '_blank')\n              })\n              send_ok()\n            } catch (e) {\n              send_error(e.message, e.stack)\n            }\n          }\n        }\n\n        window.addEventListener('message', handle_message, false)\n\n        window.onerror = function (msg, url, lineNo, columnNo, error) {\n          // ignore errors from import map polyfill - these are necessary for\n          // it to detect browser support\n          if (msg.includes('module specifier “vue”')) {\n            // firefox only error, ignore\n            return false\n          }\n          if (msg.includes(\"Module specifier, 'vue\")) {\n            // Safari only\n            return false\n          }\n          try {\n            parent.postMessage({ action: 'error', value: error }, '*')\n          } catch (e) {\n            parent.postMessage({ action: 'error', value: msg }, '*')\n          }\n        }\n\n        window.addEventListener('unhandledrejection', (event) => {\n          if (\n            event.reason.message &&\n            event.reason.message.includes('Cross-origin')\n          ) {\n            event.preventDefault()\n            return\n          }\n          try {\n            parent.postMessage(\n              { action: 'unhandledrejection', value: event.reason },\n              '*',\n            )\n          } catch (e) {\n            parent.postMessage(\n              { action: 'unhandledrejection', value: event.reason.message },\n              '*',\n            )\n          }\n        })\n\n        let previous = { level: null, args: null }\n\n        ;['clear', 'log', 'info', 'dir', 'warn', 'error', 'table'].forEach(\n          (level) => {\n            const original = console[level]\n            console[level] = (...args) => {\n              const msg = args[0]\n              if (typeof msg === 'string') {\n                if (\n                  msg.includes('You are running a development build of Vue') ||\n                  msg.includes('You are running the esm-bundler build of Vue')\n                ) {\n                  return\n                }\n              }\n\n              original(...args)\n\n              const stringifiedArgs = stringify(args)\n              if (\n                previous.level === level &&\n                previous.args &&\n                previous.args === stringifiedArgs\n              ) {\n                parent.postMessage(\n                  { action: 'console', level, duplicate: true },\n                  '*',\n                )\n              } else {\n                previous = { level, args: stringifiedArgs }\n\n                try {\n                  parent.postMessage({ action: 'console', level, args }, '*')\n                } catch (err) {\n                  parent.postMessage(\n                    { action: 'console', level, args: args.map(toString) },\n                    '*',\n                  )\n                }\n              }\n            }\n          },\n        )\n        ;[\n          { method: 'group', action: 'console_group' },\n          { method: 'groupEnd', action: 'console_group_end' },\n          { method: 'groupCollapsed', action: 'console_group_collapsed' },\n        ].forEach((group_action) => {\n          const original = console[group_action.method]\n          console[group_action.method] = (label) => {\n            parent.postMessage({ action: group_action.action, label }, '*')\n\n            original(label)\n          }\n        })\n\n        const timers = new Map()\n        const original_time = console.time\n        const original_timelog = console.timeLog\n        const original_timeend = console.timeEnd\n\n        console.time = (label = 'default') => {\n          original_time(label)\n          timers.set(label, performance.now())\n        }\n        console.timeLog = (label = 'default') => {\n          original_timelog(label)\n          const now = performance.now()\n          if (timers.has(label)) {\n            parent.postMessage(\n              {\n                action: 'console',\n                level: 'system-log',\n                args: [`${label}: ${now - timers.get(label)}ms`],\n              },\n              '*',\n            )\n          } else {\n            parent.postMessage(\n              {\n                action: 'console',\n                level: 'system-warn',\n                args: [`Timer '${label}' does not exist`],\n              },\n              '*',\n            )\n          }\n        }\n        console.timeEnd = (label = 'default') => {\n          original_timeend(label)\n          const now = performance.now()\n          if (timers.has(label)) {\n            parent.postMessage(\n              {\n                action: 'console',\n                level: 'system-log',\n                args: [`${label}: ${now - timers.get(label)}ms`],\n              },\n              '*',\n            )\n          } else {\n            parent.postMessage(\n              {\n                action: 'console',\n                level: 'system-warn',\n                args: [`Timer '${label}' does not exist`],\n              },\n              '*',\n            )\n          }\n          timers.delete(label)\n        }\n\n        const original_assert = console.assert\n        console.assert = (condition, ...args) => {\n          if (condition) {\n            const stack = new Error().stack\n            parent.postMessage(\n              { action: 'console', level: 'assert', args, stack },\n              '*',\n            )\n          }\n          original_assert(condition, ...args)\n        }\n\n        const counter = new Map()\n        const original_count = console.count\n        const original_countreset = console.countReset\n\n        console.count = (label = 'default') => {\n          counter.set(label, (counter.get(label) || 0) + 1)\n          parent.postMessage(\n            {\n              action: 'console',\n              level: 'system-log',\n              args: `${label}: ${counter.get(label)}`,\n            },\n            '*',\n          )\n          original_count(label)\n        }\n\n        console.countReset = (label = 'default') => {\n          if (counter.has(label)) {\n            counter.set(label, 0)\n          } else {\n            parent.postMessage(\n              {\n                action: 'console',\n                level: 'system-warn',\n                args: `Count for '${label}' does not exist`,\n              },\n              '*',\n            )\n          }\n          original_countreset(label)\n        }\n\n        const original_trace = console.trace\n\n        console.trace = (...args) => {\n          const stack = new Error().stack\n          parent.postMessage(\n            { action: 'console', level: 'trace', args, stack },\n            '*',\n          )\n          original_trace(...args)\n        }\n\n        function toString(value) {\n          if (value instanceof Error) {\n            return value.message\n          }\n          for (const fn of [\n            String,\n            (v) => Object.prototype.toString.call(v),\n            (v) => typeof v,\n          ]) {\n            try {\n              return fn(value)\n            } catch (err) {}\n          }\n        }\n\n        function isComponentProxy(value) {\n          return (\n            value &&\n            typeof value === 'object' &&\n            value.__v_skip === true &&\n            typeof value.$nextTick === 'function' &&\n            value.$ &&\n            value._\n          )\n        }\n\n        function stringify(args) {\n          try {\n            return JSON.stringify(args, (key, value) => {\n              return isComponentProxy(value) ? '{component proxy}' : value\n            })\n          } catch (error) {\n            return null\n          }\n        }\n      })()\n    </script>\n\n    <!-- ES Module Shims: Import maps polyfill for modules browsers without import maps support (all except Chrome 89+) -->\n    <script\n      async\n      src=\"https://cdn.jsdelivr.net/npm/es-module-shims@1.5.18/dist/es-module-shims.wasm.js\"\n    ></script>\n    <script type=\"importmap\">\n      <!--IMPORT_MAP-->\n    </script>\n  </head>\n  <body>\n    <!--PREVIEW-OPTIONS-PLACEHOLDER-HTML-->\n  </body>\n</html>\n";

let uid = 1;
class PreviewProxy {
  constructor(iframe, handlers) {
    this.iframe = iframe;
    this.handlers = handlers;
    this.pending_cmds = /* @__PURE__ */ new Map();
    this.handle_event = (e) => this.handle_repl_message(e);
    window.addEventListener("message", this.handle_event, false);
  }
  destroy() {
    window.removeEventListener("message", this.handle_event);
  }
  iframe_command(action, args) {
    return new Promise((resolve, reject) => {
      const cmd_id = uid++;
      this.pending_cmds.set(cmd_id, { resolve, reject });
      this.iframe.contentWindow.postMessage({ action, cmd_id, args }, "*");
    });
  }
  handle_command_message(cmd_data) {
    let action = cmd_data.action;
    let id = cmd_data.cmd_id;
    let handler = this.pending_cmds.get(id);
    if (handler) {
      this.pending_cmds.delete(id);
      if (action === "cmd_error") {
        let { message, stack } = cmd_data;
        let e = new Error(message);
        e.stack = stack;
        handler.reject(e);
      }
      if (action === "cmd_ok") {
        handler.resolve(cmd_data.args);
      }
    } else if (action !== "cmd_error" && action !== "cmd_ok") {
      console.error("command not found", id, cmd_data, [
        ...this.pending_cmds.keys(),
      ]);
    }
  }
  handle_repl_message(event) {
    if (event.source !== this.iframe.contentWindow) return;
    const { action, args } = event.data;
    switch (action) {
      case "cmd_error":
      case "cmd_ok":
        return this.handle_command_message(event.data);
      case "fetch_progress":
        return this.handlers.on_fetch_progress(args.remaining);
      case "error":
        return this.handlers.on_error(event.data);
      case "unhandledrejection":
        return this.handlers.on_unhandled_rejection(event.data);
      case "console":
        return this.handlers.on_console(event.data);
      case "console_group":
        return this.handlers.on_console_group(event.data);
      case "console_group_collapsed":
        return this.handlers.on_console_group_collapsed(event.data);
      case "console_group_end":
        return this.handlers.on_console_group_end(event.data);
    }
  }
  eval(script) {
    return this.iframe_command("eval", { script });
  }
  handle_links() {
    return this.iframe_command("catch_clicks", {});
  }
}

function compileModulesForPreview(store, isSSR = false) {
  const seen = /* @__PURE__ */ new Set();
  const processed = [];
  processFile(store, store.files[store.mainFile], processed, seen, isSSR);
  if (!isSSR) {
    for (const filename in store.files) {
      if (filename.endsWith(".css")) {
        const file = store.files[filename];
        if (!seen.has(file)) {
          processed.push(
            `
window.__css__.push(${JSON.stringify(file.compiled.css)})`,
          );
        }
      }
    }
  }
  return processed;
}
const modulesKey = `__modules__`;
const exportKey = `__export__`;
const dynamicImportKey = `__dynamic_import__`;
const moduleKey = `__module__`;
function processFile(store, file, processed, seen, isSSR) {
  if (seen.has(file)) {
    return [];
  }
  seen.add(file);
  if (!isSSR && file.filename.endsWith(".html")) {
    return processHtmlFile(store, file.code, file.filename, processed, seen);
  }
  let {
    code: js,
    importedFiles,
    hasDynamicImport,
  } = processModule(
    store,
    isSSR ? file.compiled.ssr : file.compiled.js,
    file.filename,
  );
  processChildFiles(
    store,
    importedFiles,
    hasDynamicImport,
    processed,
    seen,
    isSSR,
  );
  if (file.compiled.css && !isSSR) {
    js += `
window.__css__.push(${JSON.stringify(file.compiled.css)})`;
  }
  processed.push(js);
}
function processChildFiles(
  store,
  importedFiles,
  hasDynamicImport,
  processed,
  seen,
  isSSR,
) {
  if (hasDynamicImport) {
    for (const file of Object.values(store.files)) {
      if (seen.has(file)) continue;
      processFile(store, file, processed, seen, isSSR);
    }
  } else if (importedFiles.size > 0) {
    for (const imported of importedFiles) {
      processFile(store, store.files[imported], processed, seen, isSSR);
    }
  }
}
function processModule(store, src, filename) {
  const s = new MagicString(src);
  const ast = babelParse(src, {
    sourceFilename: filename,
    sourceType: "module",
  }).program.body;
  const idToImportMap = /* @__PURE__ */ new Map();
  const declaredConst = /* @__PURE__ */ new Set();
  const importedFiles = /* @__PURE__ */ new Set();
  const importToIdMap = /* @__PURE__ */ new Map();
  function resolveImport(raw) {
    const files = store.files;
    let resolved = raw;
    const file =
      files[resolved] ||
      files[(resolved = raw + ".ts")] ||
      files[(resolved = raw + ".js")];
    return file ? resolved : void 0;
  }
  function defineImport(node, source) {
    const filename2 = resolveImport(source.replace(/^\.\/+/, "src/"));
    if (!filename2) {
      throw new Error(`File "${source}" does not exist.`);
    }
    if (importedFiles.has(filename2)) {
      return importToIdMap.get(filename2);
    }
    importedFiles.add(filename2);
    const id = `__import_${importedFiles.size}__`;
    importToIdMap.set(filename2, id);
    s.appendLeft(
      node.start,
      `const ${id} = ${modulesKey}[${JSON.stringify(filename2)}]
`,
    );
    return id;
  }
  function defineExport(name, local = name) {
    s.append(`
${exportKey}(${moduleKey}, "${name}", () => ${local})`);
  }
  s.prepend(
    `const ${moduleKey} = ${modulesKey}[${JSON.stringify(
      filename,
    )}] = { [Symbol.toStringTag]: "Module" }

`,
  );
  for (const node of ast) {
    if (node.type === "ImportDeclaration") {
      const source = node.source.value;
      if (source.startsWith("./")) {
        const importId = defineImport(node, node.source.value);
        for (const spec of node.specifiers) {
          if (spec.type === "ImportSpecifier") {
            idToImportMap.set(
              spec.local.name,
              `${importId}.${spec.imported.name}`,
            );
          } else if (spec.type === "ImportDefaultSpecifier") {
            idToImportMap.set(spec.local.name, `${importId}.default`);
          } else {
            idToImportMap.set(spec.local.name, importId);
          }
        }
        s.remove(node.start, node.end);
      }
    }
  }
  for (const node of ast) {
    if (node.type === "ExportNamedDeclaration") {
      if (node.declaration) {
        if (
          node.declaration.type === "FunctionDeclaration" ||
          node.declaration.type === "ClassDeclaration"
        ) {
          defineExport(node.declaration.id.name);
        } else if (node.declaration.type === "VariableDeclaration") {
          for (const decl of node.declaration.declarations) {
            for (const id of extractIdentifiers(decl.id)) {
              defineExport(id.name);
            }
          }
        }
        s.remove(node.start, node.declaration.start);
      } else if (node.source) {
        const importId = defineImport(node, node.source.value);
        for (const spec of node.specifiers) {
          defineExport(spec.exported.name, `${importId}.${spec.local.name}`);
        }
        s.remove(node.start, node.end);
      } else {
        for (const spec of node.specifiers) {
          const local = spec.local.name;
          const binding = idToImportMap.get(local);
          defineExport(spec.exported.name, binding || local);
        }
        s.remove(node.start, node.end);
      }
    }
    if (node.type === "ExportDefaultDeclaration") {
      if ("id" in node.declaration && node.declaration.id) {
        const { name } = node.declaration.id;
        s.remove(node.start, node.start + 15);
        s.append(`
${exportKey}(${moduleKey}, "default", () => ${name})`);
      } else {
        s.overwrite(node.start, node.start + 14, `${moduleKey}.default =`);
      }
    }
    if (node.type === "ExportAllDeclaration") {
      const importId = defineImport(node, node.source.value);
      s.remove(node.start, node.end);
      s.append(`
for (const key in ${importId}) {
        if (key !== 'default') {
          ${exportKey}(${moduleKey}, key, () => ${importId}[key])
        }
      }`);
    }
  }
  for (const node of ast) {
    if (node.type === "ImportDeclaration") continue;
    walkIdentifiers(node, (id, parent, parentStack) => {
      const binding = idToImportMap.get(id.name);
      if (!binding) {
        return;
      }
      if (parent && isStaticProperty(parent) && parent.shorthand) {
        if (
          !parent.inPattern ||
          isInDestructureAssignment(parent, parentStack)
        ) {
          s.appendLeft(id.end, `: ${binding}`);
        }
      } else if (
        parent &&
        parent.type === "ClassDeclaration" &&
        id === parent.superClass
      ) {
        if (!declaredConst.has(id.name)) {
          declaredConst.add(id.name);
          const topNode = parentStack[1];
          s.prependRight(
            topNode.start,
            `const ${id.name} = ${binding};
`,
          );
        }
      } else {
        s.overwrite(id.start, id.end, binding);
      }
    });
  }
  let hasDynamicImport = false;
  walk(ast, {
    enter(node, parent) {
      if (node.type === "Import" && parent.type === "CallExpression") {
        const arg = parent.arguments[0];
        if (arg.type === "StringLiteral" && arg.value.startsWith("./")) {
          hasDynamicImport = true;
          s.overwrite(node.start, node.start + 6, dynamicImportKey);
          s.overwrite(
            arg.start,
            arg.end,
            JSON.stringify(arg.value.replace(/^\.\/+/, "src/")),
          );
        }
      }
    },
  });
  return {
    code: s.toString(),
    importedFiles,
    hasDynamicImport,
  };
}
const scriptRE = /<script\b(?:\s[^>]*>|>)([^]*?)<\/script>/gi;
const scriptModuleRE =
  /<script\b[^>]*type\s*=\s*(?:"module"|'module')[^>]*>([^]*?)<\/script>/gi;
function processHtmlFile(store, src, filename, processed, seen) {
  const deps = [];
  let jsCode = "";
  const html = src
    .replace(scriptModuleRE, (_, content) => {
      const { code, importedFiles, hasDynamicImport } = processModule(
        store,
        content,
        filename,
      );
      processChildFiles(
        store,
        importedFiles,
        hasDynamicImport,
        deps,
        seen,
        false,
      );
      jsCode += "\n" + code;
      return "";
    })
    .replace(scriptRE, (_, content) => {
      jsCode += "\n" + content;
      return "";
    });
  processed.push(`document.body.innerHTML = ${JSON.stringify(html)}`);
  processed.push(...deps);
  processed.push(jsCode);
}

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Sandbox",
  props: {
    store: {},
    show: { type: Boolean, default: true },
    ssr: { type: Boolean, default: false },
    clearConsole: { type: Boolean, default: true },
    theme: { default: "light" },
    previewOptions: { default: () => ({}) },
    autoStoreInit: { type: Boolean, default: true },
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { store, theme, clearConsole, previewOptions } = toRefs(props);
    const keyProps = inject(injectKeyProps);
    if (keyProps === void 0 && props.autoStoreInit) {
      props.store?.init?.();
    }
    const containerRef = useTemplateRef("container");
    const runtimeError = ref();
    const runtimeWarning = ref();
    let sandbox;
    let proxy;
    let stopUpdateWatcher;
    onMounted(createSandbox);
    watch(
      () => store.value.getImportMap(),
      () => {
        try {
          createSandbox();
        } catch (e) {
          store.value.errors = [e];
          return;
        }
      },
    );
    function switchPreviewTheme() {
      const html = sandbox.contentDocument?.documentElement;
      if (html) {
        html.className = theme.value;
      } else {
        createSandbox();
      }
    }
    watch(theme, switchPreviewTheme);
    onUnmounted(() => {
      proxy.destroy();
      stopUpdateWatcher && stopUpdateWatcher();
    });
    function createSandbox() {
      if (sandbox) {
        proxy.destroy();
        stopUpdateWatcher && stopUpdateWatcher();
        containerRef.value?.removeChild(sandbox);
      }
      sandbox = document.createElement("iframe");
      sandbox.setAttribute(
        "sandbox",
        [
          "allow-forms",
          "allow-modals",
          "allow-pointer-lock",
          "allow-popups",
          "allow-same-origin",
          "allow-scripts",
          "allow-top-navigation-by-user-activation",
        ].join(" "),
      );
      const importMap = store.value.getImportMap();
      const sandboxSrc = srcdoc
        .replace(/<html>/, `<html class="${theme.value}">`)
        .replace(/<!--IMPORT_MAP-->/, JSON.stringify(importMap))
        .replace(
          /<!-- PREVIEW-OPTIONS-HEAD-HTML -->/,
          previewOptions.value?.headHTML || "",
        )
        .replace(
          /<!--PREVIEW-OPTIONS-PLACEHOLDER-HTML-->/,
          previewOptions.value?.placeholderHTML || "",
        );
      sandbox.srcdoc = sandboxSrc;
      containerRef.value?.appendChild(sandbox);
      proxy = new PreviewProxy(sandbox, {
        on_fetch_progress: (progress) => {},
        on_error: (event) => {
          const msg =
            event.value instanceof Error ? event.value.message : event.value;
          if (
            msg.includes("Failed to resolve module specifier") ||
            msg.includes("Error resolving module specifier")
          ) {
            runtimeError.value =
              msg.replace(/\. Relative references must.*$/, "") +
              `.
Tip: edit the "Import Map" tab to specify import paths for dependencies.`;
          } else {
            runtimeError.value = event.value;
          }
        },
        on_unhandled_rejection: (event) => {
          let error = event.value;
          if (typeof error === "string") {
            error = { message: error };
          }
          runtimeError.value = "Uncaught (in promise): " + error.message;
        },
        on_console: (log) => {
          if (log.duplicate) {
            return;
          }
          if (log.level === "error") {
            if (log.args[0] instanceof Error) {
              runtimeError.value = log.args[0].message;
            } else {
              runtimeError.value = log.args[0];
            }
          } else if (log.level === "warn") {
            if (log.args[0].toString().includes("[Vue warn]")) {
              runtimeWarning.value = log.args
                .join("")
                .replace(/\[Vue warn\]:/, "")
                .trim();
            }
          }
        },
        on_console_group: (action) => {},
        on_console_group_end: () => {},
        on_console_group_collapsed: (action) => {},
      });
      sandbox.addEventListener("load", () => {
        proxy.handle_links();
        stopUpdateWatcher = watchEffect(updatePreview);
        switchPreviewTheme();
      });
    }
    async function updatePreview() {
      if (clearConsole.value) {
        console.clear();
      }
      runtimeError.value = void 0;
      runtimeWarning.value = void 0;
      let isSSR = props.ssr;
      if (store.value.vueVersion) {
        const [major, minor, patch] = store.value.vueVersion
          .split(".")
          .map((v) => parseInt(v, 10));
        if (major === 3 && (minor < 2 || (minor === 2 && patch < 27))) {
          alert(
            `The selected version of Vue (${store.value.vueVersion}) does not support in-browser SSR. Rendering in client mode instead.`,
          );
          isSSR = false;
        }
      }
      try {
        const { mainFile } = store.value;
        if (isSSR && mainFile.endsWith(".vue")) {
          const ssrModules = compileModulesForPreview(store.value, true);
          console.info(
            `[@vue/repl] successfully compiled ${ssrModules.length} modules for SSR.`,
          );
          await proxy.eval([
            `const __modules__ = {};`,
            ...ssrModules,
            `import { renderToString as _renderToString } from 'vue/server-renderer'
         import { createSSRApp as _createApp } from 'vue'
         const AppComponent = __modules__["${mainFile}"].default
         AppComponent.name = 'Repl'
         const app = _createApp(AppComponent)
         if (!app.config.hasOwnProperty('unwrapInjectedRef')) {
           app.config.unwrapInjectedRef = true
         }
         app.config.warnHandler = () => {}
         window.__ssr_promise__ = _renderToString(app).then(html => {
           document.body.innerHTML = '<div id="app">' + html + '</div>' + \`${previewOptions.value?.bodyHTML || ""}\`
         }).catch(err => {
           console.error("SSR Error", err)
         })
        `,
          ]);
        }
        const modules = compileModulesForPreview(store.value);
        console.info(
          `[@vue/repl] successfully compiled ${modules.length} module${modules.length > 1 ? `s` : ``}.`,
        );
        const codeToEval = [
          `window.__modules__ = {};window.__css__ = [];if (window.__app__) window.__app__.$destroy();` +
            (isSSR
              ? ``
              : `document.body.innerHTML = '<div id="app"></div>' + \`${previewOptions.value?.bodyHTML || ""}\``),
          ...modules,
          `document.querySelectorAll('style[css]').forEach(el => el.remove())
        document.head.insertAdjacentHTML('beforeend', window.__css__.map(s => \`<style css>\${s}</style>\`).join('\\n'))`,
        ];
        if (mainFile.endsWith(".vue")) {
          codeToEval.push(
            `import Vue from "vue"
        ${previewOptions.value?.customCode?.importCode || ""}
        const _mount = () => {
          const AppComponent = __modules__["${mainFile}"].default
          AppComponent.name = 'Repl'
          const app = window.__app__ = new Vue(AppComponent).$mount('#app')
          
          Vue.config.errorHandler = e => console.error(e)
          ${previewOptions.value?.customCode?.useCode || ""}
        }
        if (window.__ssr_promise__) {
          window.__ssr_promise__.then(_mount)
        } else {
          _mount()
        }`,
          );
        }
        await proxy.eval(codeToEval);
      } catch (e) {
        console.error(e);
        runtimeError.value = e.message;
      }
    }
    function reload() {
      sandbox.contentWindow?.location.reload();
    }
    __expose({ reload, container: containerRef });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            withDirectives(
              createElementVNode(
                "div",
                {
                  ref: "container",
                  class: normalizeClass(["iframe-container", unref(theme)]),
                },
                null,
                2,
              ),
              [[vShow, props.show]],
            ),
            createVNode(
              Message,
              {
                err:
                  (unref(previewOptions)?.showRuntimeError ?? true) &&
                  runtimeError.value,
              },
              null,
              8,
              ["err"],
            ),
            !runtimeError.value &&
            (unref(previewOptions)?.showRuntimeWarning ?? true)
              ? (openBlock(),
                createBlock(
                  Message,
                  {
                    key: 0,
                    warn: runtimeWarning.value,
                  },
                  null,
                  8,
                  ["warn"],
                ))
              : createCommentVNode("", true),
          ],
          64,
        )
      );
    };
  },
});

const Sandbox = /* @__PURE__ */ _export_sfc(_sfc_main$6, [
  ["__scopeId", "data-v-eca3ad75"],
]);

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Preview",
  props: {
    show: { type: Boolean },
    ssr: { type: Boolean },
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { store, clearConsole, theme, previewTheme, previewOptions } =
      inject(injectKeyProps);
    const sandboxTheme = computed(() =>
      previewTheme.value ? theme.value : void 0,
    );
    const sandboxRef = useTemplateRef("sandbox");
    const container = computed(() => sandboxRef.value?.container);
    __expose({
      reload: () => sandboxRef.value?.reload(),
      container,
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          Sandbox,
          {
            ref: "sandbox",
            show: props.show,
            store: unref(store),
            theme: sandboxTheme.value,
            "preview-options": unref(previewOptions),
            ssr: props.ssr,
            "clear-console": unref(clearConsole),
          },
          null,
          8,
          ["show", "store", "theme", "preview-options", "ssr", "clear-console"],
        )
      );
    };
  },
});

const _hoisted_1$3 = { class: "tab-buttons" };
const _hoisted_2$2 = ["onClick"];
const _hoisted_3$1 = { class: "output-container" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Output",
  props: {
    editorComponent: {},
    showCompileOutput: { type: Boolean },
    ssr: { type: Boolean },
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { store } = inject(injectKeyProps);
    const previewRef = useTemplateRef("preview");
    const modes = computed(() =>
      props.showCompileOutput ? ["preview", "js", "css", "ssr"] : ["preview"],
    );
    const mode = computed({
      get: () =>
        modes.value.includes(store.value.outputMode)
          ? store.value.outputMode
          : "preview",
      set(value) {
        if (modes.value.includes(store.value.outputMode)) {
          store.value.outputMode = value;
        }
      },
    });
    function reload() {
      previewRef.value?.reload();
    }
    __expose({ reload, previewRef });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createElementVNode("div", _hoisted_1$3, [
              (openBlock(true),
              createElementBlock(
                Fragment,
                null,
                renderList(modes.value, (m) => {
                  return (
                    openBlock(),
                    createElementBlock(
                      "button",
                      {
                        key: m,
                        class: normalizeClass({ active: mode.value === m }),
                        onClick: ($event) => (mode.value = m),
                      },
                      [createElementVNode("span", null, toDisplayString(m), 1)],
                      10,
                      _hoisted_2$2,
                    )
                  );
                }),
                128,
              )),
            ]),
            createElementVNode("div", _hoisted_3$1, [
              createVNode(
                _sfc_main$5,
                {
                  ref: "preview",
                  show: mode.value === "preview",
                  ssr: _ctx.ssr,
                },
                null,
                8,
                ["show", "ssr"],
              ),
              mode.value !== "preview"
                ? (openBlock(),
                  createBlock(
                    props.editorComponent,
                    {
                      key: 0,
                      readonly: "",
                      filename: unref(store).activeFile.filename,
                      value: unref(store).activeFile.compiled[mode.value],
                      mode: mode.value,
                    },
                    null,
                    8,
                    ["filename", "value", "mode"],
                  ))
                : createCommentVNode("", true),
            ]),
          ],
          64,
        )
      );
    };
  },
});

const Output = /* @__PURE__ */ _export_sfc(_sfc_main$4, [
  ["__scopeId", "data-v-5893ae30"],
]);

const _hoisted_1$2 = ["onClick", "onDblclick"];
const _hoisted_2$1 = { class: "label" };
const _hoisted_3 = ["onClick"];
const _hoisted_4 = { class: "file pending" };
const _hoisted_5 = { class: "import-map-wrapper" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "FileSelector",
  setup(__props) {
    const { store, showTsConfig, showImportMap } = inject(injectKeyProps);
    const pending = ref(false);
    const pendingFilename = ref("Comp.vue");
    const files = computed(() =>
      Object.entries(store.value.files)
        .filter(
          ([name, file]) =>
            name !== importMapFile && name !== tsconfigFile && !file.hidden,
        )
        .map(([name]) => name),
    );
    function startAddFile() {
      let i = 0;
      let name = `Comp.vue`;
      while (true) {
        let hasConflict = false;
        for (const filename in store.value.files) {
          if (stripSrcPrefix(filename) === name) {
            hasConflict = true;
            name = `Comp${++i}.vue`;
            break;
          }
        }
        if (!hasConflict) {
          break;
        }
      }
      pendingFilename.value = name;
      pending.value = true;
    }
    function cancelNameFile() {
      pending.value = false;
    }
    function focus({ el }) {
      el.focus();
    }
    function doneNameFile() {
      if (!pending.value) return;
      if (!pendingFilename.value) {
        pending.value = false;
        return;
      }
      const filename = "src/" + pendingFilename.value;
      const oldFilename = pending.value === true ? "" : pending.value;
      if (!/\.(vue|jsx?|tsx?|css|json)$/.test(filename)) {
        store.value.errors = [
          `Playground only supports *.vue, *.jsx?, *.tsx?, *.css, *.json files.`,
        ];
        return;
      }
      if (filename !== oldFilename && filename in store.value.files) {
        store.value.errors = [`File "${filename}" already exists.`];
        return;
      }
      store.value.errors = [];
      cancelNameFile();
      if (filename === oldFilename) {
        return;
      }
      if (oldFilename) {
        store.value.renameFile(oldFilename, filename);
      } else {
        store.value.addFile(filename);
      }
    }
    function editFileName(file) {
      pendingFilename.value = stripSrcPrefix(file);
      pending.value = file;
    }
    const fileSelector = useTemplateRef("fileSelector");
    function horizontalScroll(e) {
      e.preventDefault();
      const el = fileSelector.value;
      const direction =
        Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const distance = 30 * (direction > 0 ? 1 : -1);
      el.scrollTo({
        left: el.scrollLeft + distance,
      });
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          "div",
          {
            ref_key: "fileSelector",
            ref: fileSelector,
            class: normalizeClass([
              "file-selector",
              { "has-import-map": unref(showImportMap) },
            ]),
            onWheel: horizontalScroll,
          },
          [
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(files.value, (file, i) => {
                return (
                  openBlock(),
                  createElementBlock(
                    Fragment,
                    { key: file },
                    [
                      pending.value !== file
                        ? (openBlock(),
                          createElementBlock(
                            "div",
                            {
                              key: 0,
                              class: normalizeClass([
                                "file",
                                {
                                  active:
                                    unref(store).activeFile.filename === file,
                                },
                              ]),
                              onClick: ($event) => unref(store).setActive(file),
                              onDblclick: ($event) =>
                                i > 0 && editFileName(file),
                            },
                            [
                              createElementVNode(
                                "span",
                                _hoisted_2$1,
                                toDisplayString(unref(stripSrcPrefix)(file)),
                                1,
                              ),
                              i > 0
                                ? (openBlock(),
                                  createElementBlock(
                                    "span",
                                    {
                                      key: 0,
                                      class: "remove",
                                      onClick: withModifiers(
                                        ($event) =>
                                          unref(store).deleteFile(file),
                                        ["stop"],
                                      ),
                                    },
                                    _cache[3] ||
                                      (_cache[3] = [
                                        createElementVNode(
                                          "svg",
                                          {
                                            class: "icon",
                                            width: "12",
                                            height: "12",
                                            viewBox: "0 0 24 24",
                                          },
                                          [
                                            createElementVNode("line", {
                                              stroke: "#999",
                                              x1: "18",
                                              y1: "6",
                                              x2: "6",
                                              y2: "18",
                                            }),
                                            createElementVNode("line", {
                                              stroke: "#999",
                                              x1: "6",
                                              y1: "6",
                                              x2: "18",
                                              y2: "18",
                                            }),
                                          ],
                                          -1,
                                        ),
                                      ]),
                                    8,
                                    _hoisted_3,
                                  ))
                                : createCommentVNode("", true),
                            ],
                            42,
                            _hoisted_1$2,
                          ))
                        : createCommentVNode("", true),
                      (pending.value === true &&
                        i === files.value.length - 1) ||
                      pending.value === file
                        ? (openBlock(),
                          createElementBlock(
                            "div",
                            {
                              key: 1,
                              class: normalizeClass([
                                "file pending",
                                { active: pending.value === file },
                              ]),
                            },
                            [
                              createElementVNode(
                                "span",
                                _hoisted_4,
                                toDisplayString(pendingFilename.value),
                                1,
                              ),
                              withDirectives(
                                createElementVNode(
                                  "input",
                                  {
                                    "onUpdate:modelValue":
                                      _cache[0] ||
                                      (_cache[0] = ($event) =>
                                        (pendingFilename.value = $event)),
                                    spellcheck: "false",
                                    onBlur: doneNameFile,
                                    onKeyup: [
                                      withKeys(doneNameFile, ["enter"]),
                                      withKeys(cancelNameFile, ["esc"]),
                                    ],
                                    onVnodeMounted: focus,
                                  },
                                  null,
                                  544,
                                ),
                                [[vModelText, pendingFilename.value]],
                              ),
                            ],
                            2,
                          ))
                        : createCommentVNode("", true),
                    ],
                    64,
                  )
                );
              }),
              128,
            )),
            createElementVNode(
              "button",
              {
                class: "add",
                onClick: startAddFile,
              },
              "+",
            ),
            createElementVNode("div", _hoisted_5, [
              unref(showTsConfig) && unref(store).files[unref(tsconfigFile)]
                ? (openBlock(),
                  createElementBlock(
                    "div",
                    {
                      key: 0,
                      class: normalizeClass([
                        "file",
                        {
                          active:
                            unref(store).activeFile.filename ===
                            unref(tsconfigFile),
                        },
                      ]),
                      onClick:
                        _cache[1] ||
                        (_cache[1] = ($event) =>
                          unref(store).setActive(unref(tsconfigFile))),
                    },
                    _cache[4] ||
                      (_cache[4] = [
                        createElementVNode(
                          "span",
                          { class: "label" },
                          "tsconfig.json",
                          -1,
                        ),
                      ]),
                    2,
                  ))
                : createCommentVNode("", true),
              unref(showImportMap)
                ? (openBlock(),
                  createElementBlock(
                    "div",
                    {
                      key: 1,
                      class: normalizeClass([
                        "file",
                        {
                          active:
                            unref(store).activeFile.filename ===
                            unref(importMapFile),
                        },
                      ]),
                      onClick:
                        _cache[2] ||
                        (_cache[2] = ($event) =>
                          unref(store).setActive(unref(importMapFile))),
                    },
                    _cache[5] ||
                      (_cache[5] = [
                        createElementVNode(
                          "span",
                          { class: "label" },
                          "Import Map",
                          -1,
                        ),
                      ]),
                    2,
                  ))
                : createCommentVNode("", true),
            ]),
          ],
          34,
        )
      );
    };
  },
});

const FileSelector = /* @__PURE__ */ _export_sfc(_sfc_main$3, [
  ["__scopeId", "data-v-13b607d1"],
]);

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ToggleButton",
  props: /* @__PURE__ */ mergeModels(
    {
      text: {},
    },
    {
      modelValue: { type: Boolean },
      modelModifiers: {},
    },
  ),
  emits: ["update:modelValue"],
  setup(__props) {
    const active = useModel(__props, "modelValue");
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          "div",
          {
            class: "wrapper",
            onClick:
              _cache[0] ||
              (_cache[0] = ($event) => (active.value = !active.value)),
          },
          [
            createElementVNode("span", null, toDisplayString(_ctx.text), 1),
            createElementVNode(
              "div",
              {
                class: normalizeClass([
                  "toggle",
                  [{ active: __props.modelValue }],
                ]),
              },
              _cache[1] ||
                (_cache[1] = [
                  createElementVNode("div", { class: "indicator" }, null, -1),
                ]),
              2,
            ),
          ],
        )
      );
    };
  },
});

const ToggleButton = /* @__PURE__ */ _export_sfc(_sfc_main$2, [
  ["__scopeId", "data-v-17ef6099"],
]);

const _hoisted_1$1 = { class: "editor-container" };
const _hoisted_2 = { class: "editor-floating" };
const SHOW_ERROR_KEY = "repl_show_error";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "EditorContainer",
  props: {
    editorComponent: {},
  },
  setup(__props) {
    const props = __props;
    const { store, autoSave, editorOptions } = inject(injectKeyProps);
    const showMessage = ref(getItem());
    const onChange = debounce((code) => {
      store.value.activeFile.code = code;
    }, 250);
    function setItem() {
      localStorage.setItem(
        SHOW_ERROR_KEY,
        showMessage.value ? "true" : "false",
      );
    }
    function getItem() {
      const item = localStorage.getItem(SHOW_ERROR_KEY);
      return !(item === "false");
    }
    watch(showMessage, () => {
      setItem();
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createVNode(FileSelector),
            createElementVNode("div", _hoisted_1$1, [
              createVNode(
                props.editorComponent,
                {
                  value: unref(store).activeFile.code,
                  filename: unref(store).activeFile.filename,
                  onChange: unref(onChange),
                },
                null,
                8,
                ["value", "filename", "onChange"],
              ),
              withDirectives(
                createVNode(
                  Message,
                  {
                    err: unref(store).errors[0],
                  },
                  null,
                  8,
                  ["err"],
                ),
                [[vShow, showMessage.value]],
              ),
              createElementVNode("div", _hoisted_2, [
                unref(editorOptions)?.showErrorText !== false
                  ? (openBlock(),
                    createBlock(
                      ToggleButton,
                      {
                        key: 0,
                        modelValue: showMessage.value,
                        "onUpdate:modelValue":
                          _cache[0] ||
                          (_cache[0] = ($event) =>
                            (showMessage.value = $event)),
                        text:
                          unref(editorOptions)?.showErrorText || "Show Error",
                      },
                      null,
                      8,
                      ["modelValue", "text"],
                    ))
                  : createCommentVNode("", true),
                unref(editorOptions)?.autoSaveText !== false
                  ? (openBlock(),
                    createBlock(
                      ToggleButton,
                      {
                        key: 1,
                        modelValue: unref(autoSave),
                        "onUpdate:modelValue":
                          _cache[1] ||
                          (_cache[1] = ($event) =>
                            isRef(autoSave) ? (autoSave.value = $event) : null),
                        text: unref(editorOptions)?.autoSaveText || "Auto Save",
                      },
                      null,
                      8,
                      ["modelValue", "text"],
                    ))
                  : createCommentVNode("", true),
              ]),
            ]),
          ],
          64,
        )
      );
    };
  },
});

const EditorContainer = /* @__PURE__ */ _export_sfc(_sfc_main$1, [
  ["__scopeId", "data-v-f4f45a3c"],
]);

const _hoisted_1 = { class: "vue-repl" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Repl",
  props: /* @__PURE__ */ mergeModels(
    {
      theme: { default: "light" },
      previewTheme: { type: Boolean, default: false },
      editor: {},
      store: { default: () => useStore() },
      autoResize: { type: Boolean, default: true },
      showCompileOutput: { type: Boolean, default: true },
      showImportMap: { type: Boolean, default: true },
      showTsConfig: { type: Boolean, default: true },
      clearConsole: { type: Boolean, default: true },
      layout: { default: "horizontal" },
      layoutReverse: { type: Boolean, default: false },
      ssr: { type: Boolean, default: false },
      previewOptions: { default: () => ({}) },
      editorOptions: { default: () => ({}) },
      splitPaneOptions: { default: () => ({}) },
    },
    {
      modelValue: { type: Boolean, ...{ default: true } },
      modelModifiers: {},
    },
  ),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const autoSave = useModel(__props, "modelValue");
    const props = __props;
    if (!props.editor) {
      throw new Error('The "editor" prop is now required.');
    }
    const outputRef = useTemplateRef("output");
    props.store.init();
    const editorSlotName = computed(() =>
      props.layoutReverse ? "right" : "left",
    );
    const outputSlotName = computed(() =>
      props.layoutReverse ? "left" : "right",
    );
    provide(injectKeyProps, {
      ...toRefs(props),
      autoSave,
    });
    provide(
      injectKeyPreviewRef,
      computed(() => outputRef.value?.previewRef?.container ?? null),
    );
    function reload() {
      outputRef.value?.reload();
    }
    __expose({ reload });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock("div", _hoisted_1, [
          createVNode(
            SplitPane,
            { layout: _ctx.layout },
            {
              [editorSlotName.value]: withCtx(() => [
                createVNode(
                  EditorContainer,
                  { "editor-component": _ctx.editor },
                  null,
                  8,
                  ["editor-component"],
                ),
              ]),
              [outputSlotName.value]: withCtx(() => [
                createVNode(
                  Output,
                  {
                    ref: "output",
                    "editor-component": _ctx.editor,
                    "show-compile-output": props.showCompileOutput,
                    ssr: !!props.ssr,
                  },
                  null,
                  8,
                  ["editor-component", "show-compile-output", "ssr"],
                ),
              ]),
              _: 2,
            },
            1032,
            ["layout"],
          ),
        ])
      );
    };
  },
});

export { _sfc_main$5 as Preview, _sfc_main as Repl, Sandbox, useStore };
