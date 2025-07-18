import zhCn from 'element-plus/es/locale/lang/zh-cn'

export function GetElementUILang(langstr: string) {
  switch (langstr.toLocaleLowerCase()) {
    case 'zh-cn':
    case 'zh-hans':
      return zhCn
    default:
      return undefined // 默认使用英文
  }
}
