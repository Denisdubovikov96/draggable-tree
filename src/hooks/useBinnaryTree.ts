import React from "react"

type Nodes = Record<string, CategoryChild>

export type CategoryChild = {
    type: "category" | "service",
} & RootCategory

type RootCategory = {
    slug: string,
    name: string,
    nodes: Nodes,
}

export const filterNodesBySlug = (slug: string, nodes: Nodes): Nodes => {
    const parsed = Object.entries(nodes).filter(([key, _]) => key !== slug)

    return Object.fromEntries(parsed)
}


export const useNodeTree = (initial: CategoryChild) => {
    const [nodeState, setNode] = React.useState<CategoryChild>(initial)

    const addChildHandler = (name: string) => {
        const newChild: CategoryChild = {
            slug: new Date().getMilliseconds().toString(),
            type: "category",
            nodes: {},
            name: name
        }

        const updateNode = {
            ...nodeState,
            nodes: {
                ...nodeState.nodes,
                [newChild.slug]: newChild
            }
        }

        setNode(updateNode)
    }

    const editCurrent = (name: string) => {
        const updateNode = {
            ...nodeState,
            name
        }
        setNode(updateNode)
    }

    const removeFromCurrent = (slug: string) => {
        const updatedNode = {
            ...nodeState,
            nodes: filterNodesBySlug(slug, nodeState.nodes)
        }

        setNode(updatedNode)
    }

    
    return {
        node: nodeState,
        editCurrent,
        removeFromCurrent,
        addChildHandler
    }
}