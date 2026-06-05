import { computed, type Ref } from 'vue';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface RenderResult {
  html: string;
  toc: TocItem[];
}

/** 构建期加载全部 markdown 源文件（raw 字符串） */
const rawDocs = import.meta.glob('../docs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch {
        return '';
      }
    }
    return '';
  },
});

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w一-龥-]/g, '');

const getRaw = (section: string): string | undefined => rawDocs[`../docs/${section}.md`];

/** 解析单篇文档：注入 heading id 并收集 h2/h3 目录 */
export const renderDoc = (section: string): RenderResult => {
  const raw = getRaw(section);
  if (raw === undefined) {
    return { html: '', toc: [] };
  }

  const tokens = md.parse(raw, {});
  const toc: TocItem[] = [];
  const slugCount = new Map<string, number>();

  tokens.forEach((token, index) => {
    if (token.type !== 'heading_open') {
      return;
    }
    const level = Number(token.tag.slice(1));
    const inline = tokens[index + 1];
    const text = inline?.content ?? '';
    const base = slugify(text) || `heading-${index}`;
    const seen = slugCount.get(base) ?? 0;
    slugCount.set(base, seen + 1);
    const id = seen > 0 ? `${base}-${seen}` : base;
    token.attrSet('id', id);
    if (level === 2 || level === 3) {
      toc.push({ id, text, level });
    }
  });

  const html = md.renderer.render(tokens, md.options, {});
  return { html, toc };
};

/** 是否存在该文档 */
export const hasDoc = (section: string): boolean => getRaw(section) !== undefined;

/** 组合式：随 section 变化响应式渲染 */
export const useMarkdown = (section: Ref<string>) => {
  const result = computed<RenderResult>(() => renderDoc(section.value));
  const html = computed(() => result.value.html);
  const toc = computed(() => result.value.toc);
  const exists = computed(() => hasDoc(section.value));
  return { html, toc, exists };
};
