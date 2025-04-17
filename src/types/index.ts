
import type { _ViewProps, _TextProps, _ImageProps, _ButtonProps } from '@dcloudio/types'

// Declare component types for uni-app
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    view: _ViewProps
    text: _TextProps
    image: _ImageProps
    button: _ButtonProps
  }
}
