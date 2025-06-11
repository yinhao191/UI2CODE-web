import type { DialogApi, DialogOptions, LoadingBarApi, MessageApi, MessageOptions, NotificationApi } from 'naive-ui'
import { useAppStore } from '@/store'
import { isNullOrUndef } from '@/utils'
import { createDiscreteApi, darkTheme } from 'naive-ui'
import { computed } from 'vue'

declare global {
  interface Window {
    $loadingBar: LoadingBarApi
    $notification: NotificationApi
    $message: ReturnType<typeof setupMessage>
    $dialog: ReturnType<typeof setupDialog>
  }
}

type MessageType = 'loading' | 'success' | 'error' | 'info' | 'warning'
type MessageContent = string | string[]

interface CustomMessageOption extends MessageOptions {
  key?: string
}

interface CustomDialogOption extends DialogOptions {
  type?: 'default' | 'info' | 'success' | 'warning' | 'error'
  confirm?: () => void
  cancel?: () => void
}

export function setupMessage(NMessage: MessageApi) {
  class Message {
    static instance: Message
    private message: Record<string, ReturnType<MessageApi['success']>> = {}
    private removeTimer: Record<string, NodeJS.Timeout> = {}
    constructor() {
      // 单例模式
      if (Message.instance)
        return Message.instance
      Message.instance = this
    }

    removeMessage(key: string, duration = 5000) {
      this.removeTimer[key] && clearTimeout(this.removeTimer[key])
      this.removeTimer[key] = setTimeout(() => {
        this.message[key]?.destroy()
      }, duration)
    }

    destroy(key: string, duration = 200) {
      setTimeout(() => {
        this.message[key]?.destroy()
      }, duration)
    }

    showMessage(type: MessageType, content: MessageContent, option: CustomMessageOption = {}) {
      if (Array.isArray(content)) {
        return content.forEach(msg => NMessage[type](msg, option))
      }

      if (!option.key) {
        return NMessage[type](content, option)
      }

      const currentMessage = this.message[option.key]
      if (currentMessage) {
        currentMessage.type = type
        currentMessage.content = content
      }
      else {
        this.message[option.key] = NMessage[type](content, {
          ...option,
          duration: 0,
          onAfterLeave: () => {
            delete this.message[option.key!]
          },
        })
      }
      this.removeMessage(option.key, option.duration)
    }

    loading(content: MessageContent, option?: CustomMessageOption) {
      this.showMessage('loading', content, option)
    }

    success(content: MessageContent, option?: CustomMessageOption) {
      this.showMessage('success', content, option)
    }

    error(content: MessageContent, option?: CustomMessageOption) {
      this.showMessage('error', content, option)
    }

    info(content: MessageContent, option?: CustomMessageOption) {
      this.showMessage('info', content, option)
    }

    warning(content: MessageContent, option?: CustomMessageOption) {
      this.showMessage('warning', content, option)
    }
  }

  return new Message()
}

export function setupDialog(NDialog: DialogApi) {
  NDialog.confirm = function (option: CustomDialogOption = {}) {
    const showIcon = !isNullOrUndef(option.title)
    return NDialog[option.type || 'warning']({
      showIcon,
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: option.confirm,
      onNegativeClick: option.cancel,
      onMaskClick: option.cancel,
      ...option,
    })
  }

  return NDialog
}

export function setupNaiveDiscreteApi() {
  const appStore = useAppStore()
  const configProviderProps = computed(() => ({
    theme: appStore.isDark ? darkTheme : undefined,
    themeOverrides: useAppStore().naiveThemeOverrides,
  }))
  const { message, dialog, notification, loadingBar } = createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar'],
    { configProviderProps },
  )

  window.$loadingBar = loadingBar
  window.$notification = notification
  window.$message = setupMessage(message)
  window.$dialog = setupDialog(dialog)
}
