import React from "react"
import { CategoryChild, useNodeTree } from "../hooks/useBinnaryTree"
import { Card } from "./Card"

interface CategoryProps {
    node: CategoryChild
    // onChildEdit?: (name: string) => void
    onChildRemove?: (slug: string) => void
    onParentUpdate?: (child: CategoryChild) => void
    isRoot?: boolean
}

export const Category: React.FC<CategoryProps> = ({ node, onChildRemove, isRoot, onParentUpdate }) => {
    const {node: currentNode,addChildHandler,editCurrent,removeFromCurrent} = useNodeTree(node)

    // console.log(currentNode);

    const childsToRender = Object.values(currentNode.nodes)

    return (
        <div className={`grid-parent ${childsToRender.length > 0 ? 'with-childe' : ""}`}>
            <div className='row'>
                <Card
                    {...(!isRoot ? {
                        onRemove: () => onChildRemove?.(currentNode.slug),
                        onEdit: (name) => editCurrent(name),
                        topLine: true,
                        bottomLine: childsToRender.length > 0
                    } : {
                        topLine: false,
                        bottomLine: childsToRender.length > 0
                    })}
                    name={currentNode.name}
                    onAdd={(name) => addChildHandler(name)}
                />

            </div>

            {childsToRender.length > 0 && (
                <div className={`row grid-parent ${childsToRender.length > 1 ? "line" : ""}`}>
                    {childsToRender.map((cNode, i) => {

                        return (
                            <Category
                                key={cNode.slug}
                                node={cNode}
                                // onChildEdit={(name) => editChildHandler(cNode.slug, name)}
                                onChildRemove={(slug) => removeFromCurrent(slug)}
                                // onParentUpdate={updateParentNode}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}