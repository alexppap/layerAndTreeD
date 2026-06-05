export interface DocMeta {
  /** URL 片段与 md 文件名（不含扩展名） */
  section: string;
  /** 侧边导航显示标题 */
  title: string;
}

export interface DocGroup {
  /** 分组标题 */
  label: string;
  items: DocMeta[];
}

export const docGroups: DocGroup[] = [
  {
    label: '入门',
    items: [
      { section: 'getting-started', title: '快速入门' },
      { section: 'installation', title: '安装指南' },
    ],
  },
  {
    label: '集成指南',
    items: [
      { section: 'openlayers', title: 'OpenLayers 集成' },
      { section: 'threejs', title: 'Three.js 集成' },
    ],
  },
  {
    label: '参考',
    items: [
      { section: 'api-reference', title: 'API 参考' },
      { section: 'faq', title: '常见问题' },
      { section: 'changelog', title: '更新日志' },
    ],
  },
];

/** 扁平化的全部文档项 */
export const docList: DocMeta[] = docGroups.flatMap((group) => group.items);

/** 默认打开的文档 */
export const defaultSection = 'getting-started';

export const findDoc = (section: string): DocMeta | undefined =>
  docList.find((item) => item.section === section);
