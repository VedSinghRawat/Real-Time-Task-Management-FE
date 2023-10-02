import { FC, ReactNode } from 'react'
import { TooltipProps } from 'recharts'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'

export const CustomTooltip: FC<
  TooltipProps<ValueType, NameType> & {
    mainNode: (dataPoint: unknown) => ReactNode
    tickNode?: (tickVal: ValueType) => ReactNode
  }
> = ({ active, payload: ticks, mainNode, tickNode }) => {
  if (active && ticks && ticks[0]) {
    const dataPoint = ticks[0].payload as unknown

    return (
      <div className="max-w-[15rem] bg-primary-500 bg-opacity-80 p-2 text-secondary-500 rounded-sm">
        {tickNode && (
          <div className={`grid grid-cols-2 gap-x-2`}>
            {ticks.map((tick) => {
              if (tick.dataKey && tick.value) {
                return (
                  <p key={tick.color} style={{ color: tick.color }}>
                    {tickNode(tick.value)}
                  </p>
                )
              }

              return <></>
            })}
          </div>
        )}

        <p className="text-sm">{mainNode(dataPoint)}</p>
      </div>
    )
  }

  return null
}
