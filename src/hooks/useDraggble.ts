import React from 'react'

export type Position = {
    x: number,
    y: number
}

export const useDraggable = () => {
    const [pressed, setPressed] = React.useState(false);

    const position = React.useRef<Position>({ x: 0, y: 0 });
    const ref = React.useRef<HTMLDivElement>(null);

    const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
        // @ts-ignore
        e.target.style.userSelect = "none";
        setPressed(true);
    }, []);

    React.useEffect(() => {
        if (!pressed) {
            return;
        }

        const handleMouseMove = (event: MouseEvent) => {
            if (!ref.current || !position.current) {
                return;
            }
            const pos = position.current;

            const elem = ref.current;

            position.current = {
                x: pos.x + event.movementX,
                y: pos.y + event.movementY
            };

            elem.style.left = `${pos.x}px` ;
            elem.style.top = `${pos.y}px`;
        };
        const handleMouseUp = (e: MouseEvent) => {
            // @ts-ignore
            e.target.style.userSelect = "initial";

            setPressed(false);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

    }, [pressed]);

    React.useEffect(()=> {
        position.current = {
            x: Number(ref.current?.style.left.replace('px','')),
            y: Number(ref.current?.style.top.replace('px',''))
        }
    },[ref.current?.style.top, ref.current?.style.left])

    return {ref, handleMouseDown};

};