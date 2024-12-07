export const addNode = (nodes, newNode) => {
    if (nodes.length >= 15) {
        alert('Максимальна кількість вершин (15) досягнута!');
        return nodes;
    }
    if (nodes.includes(newNode)) {
        alert('Вершина з таким іменем вже існує!');
        return nodes;
    }
    return [...nodes, newNode];
};

export const addEdge = (edges, node1, node2) => {
    const countEdges = (node) => edges.filter(([a, b]) => a === node || b === node).length;

    if (countEdges(node1) >= 14 || countEdges(node2) >= 14) {
        alert('Максимальна кількість ребер (14) для однієї вершини досягнута!');
        return edges;
    }

    if (edges.some(([a, b]) => (a === node1 && b === node2) || (a === node2 && b === node1))) {
        alert('Ребро між цими вершинами вже існує!');
        return edges;
    }

    return [...edges, [node1, node2]];
};

export const removeNode = (nodes, edges, targetNode) => {
    const newNodes = nodes.filter((node) => node !== targetNode);
    const newEdges = edges.filter(([a, b]) => a !== targetNode && b !== targetNode);
    return { nodes: newNodes, edges: newEdges };
};

export const removeEdge = (edges, node1, node2) => {
    return edges.filter(
        ([a, b]) => !(a === node1 && b === node2) && !(a === node2 && b === node1)
    );
};

export const bfs = (nodes, edges, startNode) => {
    const visited = new Set();
    const queue = [startNode];
    const resultNodes = [];
    const resultEdges = [];

    while (queue.length > 0) {
        const currentNode = queue.shift();

        if (!visited.has(currentNode)) {
            visited.add(currentNode);
            resultNodes.push(currentNode);

            edges.forEach(([a, b]) => {
                if (a === currentNode && !visited.has(b)) {
                    resultEdges.push([a, b]);
                    queue.push(b);
                } else if (b === currentNode && !visited.has(a)) {
                    resultEdges.push([b, a]);
                    queue.push(a);
                }
            });
        }
    }

    return { nodes: resultNodes, edges: resultEdges };
};
