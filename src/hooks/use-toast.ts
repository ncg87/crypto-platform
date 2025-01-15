"use client"

import * as React from "react"
import type { ToastActionElement, ToastProps } from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

export const ToastActionType = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

type Action =
  | {
      type: typeof ToastActionType.ADD_TOAST
      toast: ToasterToast
    }
  | {
      type: typeof ToastActionType.UPDATE_TOAST
      toast: Partial<ToasterToast>
    }
  | {
      type: typeof ToastActionType.DISMISS_TOAST
      toastId?: ToasterToast["id"]
    }
  | {
      type: typeof ToastActionType.REMOVE_TOAST
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: ToastActionType.REMOVE_TOAST,
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ToastActionType.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case ToastActionType.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case ToastActionType.DISMISS_TOAST: {
      const { toastId } = action
      const newState = {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
      if (toastId) {
        addToRemoveQueue(toastId)
      }
      return newState
    }

    case ToastActionType.REMOVE_TOAST: {
      const { toastId } = action
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== toastId),
      }
    }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

export function toast({ ...props }: Omit<ToasterToast, "id">) {
  const id = genId()

  dispatch({
    type: ToastActionType.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
    },
  })
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
  }
}

function genId() {
  return Math.random().toString(36).substr(2, 9)
}
