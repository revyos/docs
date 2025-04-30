# 文档结构和维护说明

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## 更新镜像链接
修改此文件内容 [src/components/ImageLinks.tsx](src/components/ImageLinks.tsx)

## exported functions
`src/components/ImageLinks.tsx` 中包含所有适用的镜像最新版本和下载链接，引用最新版链接请使用 `mdx` 并使用相关函数（见： [此处用法](docs/intro.mdx)）

`src/components/LocaleImage.tsx` 中可以在 `en` 的 i18n 下使用 `file.en.ext` 的图片（如果存在），用法见[这里](i18n/en/docusaurus-plugin-content-docs/current/Installation/licheepi4a.mdx)，搜索 `<LocaleImage`

## mdx 文件
- 图片放在 `/static/img` 下，引用为 `/img/...`

## Sidebar
Sidebar 全自动索引，在每篇文章中通过 **第一个标题** 或 markdown meta
```
---
title: your title
sidebar_position: 1
---
```
确定标题和其所在的位置。

对于文件夹，可以在文件夹中放置 `_category_.json` 手动设定其标题和所在位置，见[此处](docs/adaptation/_category_.json)

## 项目列表
### 添加项目
`src/pages/projects.tsx` 下面可以添加，具体每一项意义见 `src/components/InfoCard.tsx` `InfoCardProps`

## Links
为了解决这个问题[facebook/docusaurus issues#3372](https://github.com/facebook/docusaurus/issues/3372)，默认为所有链接后面加上了一个 `/`， 因此跳转到其他页面需要向上一级走一次

## 开发
### 本地开发

中文：
```
$ yarn start
```

英文：
```
$ yarn start --locale en
```
只可以同时开发一种语言的文档

### 构建

```
$ yarn build
```

### 翻译
#### 内容
`i18n/en/docusaurus-plugin-content-docs/current` 下与 `docs/` 目录对应的文件就是英文版

#### 页面按钮
```
$ npm run write-translations -- --locale en
```
然后在 `i18n/en` 下的 `json` 文件中翻译
