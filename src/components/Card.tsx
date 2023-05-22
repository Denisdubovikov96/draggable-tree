import React from "react"
import { ReactComponent as Plus } from "../icons/plus.svg"
import { ReactComponent as Remove } from "../icons/close.svg"
import { ReactComponent as Edit } from "../icons/edit2.svg"
import { ReactComponent as Check } from "../icons/check.svg"

type CardProps = {
    name: string
    onEdit?: (name: string) => void
    onAdd: (name: string) => void
    onRemove?: () => void
    skipFocusOnMount?: boolean
    topLine: boolean
    bottomLine: boolean
}

export const Card: React.FC<CardProps> = ({
    name,
    onEdit,
    onAdd,
    onRemove,
    skipFocusOnMount,
    topLine,
    bottomLine
}) => {
    const [isEditMode, setIsEdit] = React.useState<boolean>(true)
    const inputRef = React.useRef<HTMLInputElement>(null)


    React.useEffect(() => {
        if (!skipFocusOnMount) {
            inputRef.current?.focus()
        } else {
            console.log('here');

            setIsEdit(false)
        }
    }, [skipFocusOnMount])

    return (
        <div
            className={`card ${topLine ? 'top-line' : ""} ${bottomLine ? 'bottom-line' : ""}`}
        >
            <div className='card-content'>
                {isEditMode ? (
                    <input className='input' type="text" name='name' ref={inputRef} defaultValue={name} />

                ) : (
                    <span className='input'>
                        {name}
                    </span>
                )}
            </div>


            <div className='controls'>
                {isEditMode ? (
                    <>
                        <button
                            className='btn warning'
                            onClick={() => {
                                setIsEdit(false)
                            }}
                        >
                            <Remove />
                        </button>
                        <button
                            className='btn success'
                            onClick={() => {
                                const name = inputRef.current?.value || ''
                                onEdit?.(name)
                                setIsEdit(false)
                            }}
                        >
                            <Check />
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className='btn '
                            onClick={() => {
                                const name = inputRef.current?.value || ''
                                onAdd(name)
                            }}
                        >
                            <Plus />
                        </button>


                        {onEdit && (
                            <button
                                className='btn'
                                onClick={() => setIsEdit(true)}
                            >
                                <Edit />
                            </button>
                        )}

                        {onRemove && (
                            <button
                                className='btn error'
                                onClick={onRemove}
                            >
                                <Remove />
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}