// shims-vue.d.ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<Record<string, unknown>, {}, unknown>;
  export default component;
}
