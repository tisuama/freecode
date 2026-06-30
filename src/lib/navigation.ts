import {
  BadgeCheck,
  CreditCard,
  History,
  KeyRound,
  ReceiptText,
  Store,
  Ticket,
  UserRound,
} from 'lucide-react'

export const NAV_ITEMS = [
  {
    label: 'API秘钥',
    path: '/api-keys',
    icon: KeyRound,
    description: '管理用于调用模型服务的访问秘钥。',
  },
  {
    label: '使用记录',
    path: '/usage-records',
    icon: History,
    description: '查看接口调用、消耗和请求结果。',
  },
  {
    label: '模型广场',
    path: '/model-plaza',
    icon: Store,
    description: '浏览可用模型、价格和能力信息。',
  },
  {
    label: '我的订阅',
    path: '/subscriptions',
    icon: BadgeCheck,
    description: '查看当前订阅、额度周期和权益。',
  },
  {
    label: '订阅充值',
    path: '/subscription-recharge',
    icon: CreditCard,
    description: '购买订阅套餐或为账户充值。',
  },
  {
    label: '我的订单',
    path: '/orders',
    icon: ReceiptText,
    description: '查看充值、订阅和支付订单。',
  },
  {
    label: '卡密兑换',
    path: '/redeem-code',
    icon: Ticket,
    description: '输入兑换码，为账户增加额度或权益。',
  },
  {
    label: '个人资料',
    path: '/profile',
    icon: UserRound,
    description: '维护账户资料、安全设置和偏好。',
  },
] as const

export type NavPath = (typeof NAV_ITEMS)[number]['path']
