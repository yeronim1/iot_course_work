import React from 'react';

const GraphVisualizer = ({ nodes, edges, bfsResult = [], traversedEdges = [], currentStep = 0 }) => {
    const canvasWidth = 800;
    const canvasHeight = 600;

    const nodePositions = nodes.map((node, index) => {
        const angle = (2 * Math.PI * index) / nodes.length;
        const radius = 200;
        return {
            id: node,
            x: canvasWidth / 2 + radius * Math.cos(angle),
            y: canvasHeight / 2 + radius * Math.sin(angle),
        };
    });

    const getNodePosition = (id) => {
        return nodePositions.find((node) => node.id === id);
    };

    const activeEdges = traversedEdges.slice(0, currentStep);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width={canvasWidth} height={canvasHeight} style={{ border: '1px solid black', marginBottom: '20px' }}>
                {edges.map(([source, target], index) => {
                    const sourcePos = getNodePosition(source);
                    const targetPos = getNodePosition(target);

                    if (!sourcePos || !targetPos) return null;

                    const isActive = activeEdges.some(
                        ([activeSource, activeTarget]) =>
                            (activeSource === source && activeTarget === target) ||
                            (activeSource === target && activeTarget === source)
                    );

                    return (
                        <line
                            key={`edge-${index}`}
                            x1={sourcePos.x}
                            y1={sourcePos.y}
                            x2={targetPos.x}
                            y2={targetPos.y}
                            stroke={isActive ? 'red' : 'black'}
                            strokeWidth="2"
                        />
                    );
                })}

                {nodePositions.map((node) => (
                    <g key={node.id}>
                        <circle
                            cx={node.x}
                            cy={node.y}
                            r="20"
                            fill={bfsResult.slice(0, currentStep + 1).includes(node.id) ? 'red' : 'lightblue'}
                            stroke="black"
                        />
                        <text
                            x={node.x}
                            y={node.y}
                            textAnchor="middle"
                            dy=".3em"
                            fontSize="12"
                            fill="black"
                        >
                            {node.id}
                        </text>
                    </g>
                ))}
            </svg>

            <div>
                <h3>Список ребер:</h3>
                <table
                    style={{
                        borderCollapse: 'collapse',
                        width: '50%',
                        border: '1px solid black',
                        textAlign: 'center',
                    }}
                >
                    <thead>
                    <tr style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                        <th style={{ border: '1px solid black', padding: '8px' }}>#</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Вершина 1</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Вершина 2</th>
                    </tr>
                    </thead>
                    <tbody>
                    {edges.map(([source, target], index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{index + 1}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{source}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{target}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GraphVisualizer;
