import * as CSS from 'csstype'
import { t } from '../../templating'
import { TokenGroup } from '../../types'

type StorybookPresenter = (value: string) => string

const simplePresenter: StorybookPresenter = (value) => value

const colorPresenter: StorybookPresenter = (value) =>
  colorSquareWithText(value, {
    backgroundColor: value,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)',
    margin: '5px',
  })

const shadowPresenter: StorybookPresenter = (value) =>
  colorSquareWithText(value, {
    width: '80px',
    height: '80px',
    backgroundColor: '#fff',
    boxShadow: value,
    margin: '15px',
  })

export const STORYBOOK_PRESENTERS: Record<TokenGroup, StorybookPresenter> = {
  textColors: colorPresenter,
  bgColors: colorPresenter,
  shadows: shadowPresenter,
  lineHeights: simplePresenter,
  space: simplePresenter,
  fontSizes: simplePresenter,
}

const colorSquareWithText = (value: string, style: CSS.Properties): string =>
  t(
    'div',
    [
      t('div', null, {
        style: {
          width: '50px',
          height: '50px',
          borderRadius: '10px',
          ...style,
        },
      }),
      value,
    ],
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        fontSize: '14px',
      },
    }
  )
