import { TUI_ENGLISH_LANGUAGE } from '@taiga-ui/i18n';

// 以下を上書きする
// node_modules/@taiga-ui/i18n/languages/english/taiga-ui-i18n-languages-english.metadata.json

export const TUI_JAPANESE_LANGUAGE = {
    ...TUI_ENGLISH_LANGUAGE,
    months: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
    ],
    shortWeekDays: [
        '月',
        '火',
        '水',
        '木',
        '金',
        '土',
        '日'
    ]
}