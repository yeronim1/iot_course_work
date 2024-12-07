import React, { useEffect } from 'react';

const AVLTreeVisualizer = ({ nodes, links }) => {
    const svgWidth = 1600;
    const svgHeight = 800;

    useEffect(() => {
        const allNodes = document.querySelectorAll('.tree-node');
        const allLinks = document.querySelectorAll('.tree-link');

        allNodes.forEach((node) => {
            node.style.transition = 'transform 0.5s ease';
        });

        allLinks.forEach((link) => {
            link.style.transition = 'x1 0.5s ease, y1 0.5s ease, x2 0.5s ease, y2 0.5s ease';
        });
    }, [nodes, links]);

    return (
        <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="xMidYMid meet"
            style={{
                border: '1px solid black',
                margin: 'auto',
                display: 'block',
                maxWidth: '100%',
                height: 'auto',
            }}
        >
            {links.map((link, index) => {
                const sourceNode = nodes.find((node) => node.id === link.source);
                const targetNode = nodes.find((node) => node.id === link.target);

                if (sourceNode && targetNode) {
                    return (
                        <line
                            key={index}
                            className="tree-link"
                            x1={sourceNode.x}
                            y1={sourceNode.y}
                            x2={targetNode.x}
                            y2={targetNode.y}
                            stroke="black"
                            strokeWidth="2"
                        />
                    );
                }
                return null;
            })}

            {nodes.map((node) => (
                <g
                    key={node.id}
                    className="tree-node"
                    transform={`translate(${node.x}, ${node.y})`}
                >
                    <circle
                        id={`node-${node.id}`}
                        r="20"
                        fill="lightgreen"
                        stroke="black"
                    />
                    <text
                        x="0"
                        y="0"
                        textAnchor="middle"
                        dy=".3em"
                        fontSize="14"
                    >
                        {node.value}
                    </text>
                    <text
                        x="0"
                        y="-25"
                        textAnchor="middle"
                        fontSize="12"
                        fill="black"
                    >
                        h: {node.height}
                    </text>
                </g>
            ))}
        </svg>
    );
};

export default AVLTreeVisualizer;
