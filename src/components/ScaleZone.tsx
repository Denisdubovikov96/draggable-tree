import React from 'react'

type Props = {
    scale: number
    children: React.ReactNode
}

function ScaleZone({ children,scale }: Props) {

    return (
        <div style={{transform: `scale(${scale * 100}%)`}}>
            {children}
        </div>
    )
}

export default ScaleZone