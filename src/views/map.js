import { FullscreenPage } from '@components/layout'
import { Mapper, ControlPanel } from '@components/mapper'
import { useAppContext } from '@context'

export const MapView = () => {
  const { windowSize } = useAppContext()

  return (
    <FullscreenPage>
      {
        !windowSize.height || !windowSize.width
        ? 'LOADING'
        : (
          <Mapper
            height={ windowSize.height }
            width={ windowSize.width }
          />
        )
      }
      <ControlPanel />
    </FullscreenPage>
  )
}
