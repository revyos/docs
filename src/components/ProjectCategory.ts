export enum ProjectCategory {
  Ecosystem = 'Ecosystem',
  Kernel = 'Kernel',
  Firmware = 'Firmware',
  BuildScripts = 'BuildScripts',
  Documentation = 'Documentation',
  Electron = 'Electron',
  Benchmark = 'Benchmark',
  Uncategorized = 'Uncategorized',
}

export const ProjectCategoryLabels: Record<
  ProjectCategory,
  { zh: string; en: string; icon: string }
> = {
  [ProjectCategory.Ecosystem]: { zh: '软件生态', en: 'Ecosystem', icon: 'EC' },
  [ProjectCategory.Kernel]: { zh: '内核', en: 'Kernel', icon: 'KN' },
  [ProjectCategory.Firmware]: { zh: '固件', en: 'Firmware', icon: 'FW' },
  [ProjectCategory.BuildScripts]: { zh: '构建脚本', en: 'Build Scripts', icon: 'BL' },
  [ProjectCategory.Documentation]: { zh: '文档', en: 'Documentation', icon: 'DO' },
  [ProjectCategory.Electron]: { zh: 'Electron', en: 'Electron', icon: 'EL' },
  [ProjectCategory.Benchmark]: { zh: '基准测试', en: 'Benchmark', icon: 'BM' },
  [ProjectCategory.Uncategorized]: { zh: '未分类', en: 'Uncategorized', icon: '?' },
};
