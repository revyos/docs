export enum ProjectCategory {
  Kernel = 'Kernel',
  Firmware = 'Firmware',
  BuildScripts = 'BuildScripts',
  Documentation = 'Documentation',
  Electron = 'Electron',
  Benchmark = 'Benchmark',
  Uncategorized = 'Uncategorized',
}

export const ProjectCategoryLabels: Record<ProjectCategory, { zh: string; en: string }> = {
  [ProjectCategory.Kernel]: { zh: '内核', en: 'Kernel' },
  [ProjectCategory.Firmware]: { zh: '固件', en: 'Firmware' },
  [ProjectCategory.BuildScripts]: { zh: '构建脚本', en: 'Build Scripts' },
  [ProjectCategory.Documentation]: { zh: '文档', en: 'Documentation' },
  [ProjectCategory.Electron]: { zh: 'Electron', en: 'Electron' },
  [ProjectCategory.Benchmark]: { zh: '基准测试', en: 'Benchmark' },
  [ProjectCategory.Uncategorized]: { zh: '未分类', en: 'Uncategorized' },
};
