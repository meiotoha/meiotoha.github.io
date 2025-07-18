import type Strings from '../i18n/strings'
import { enUs } from '../i18n/en-us'

export function GetSysLang(langstr: string): Strings {
  switch (langstr.toLocaleLowerCase()) {
    default:
      return enUs // 默认使用英文
  }
}
