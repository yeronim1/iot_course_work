import React, { useState } from 'react';
import GraphVisualizer from './GraphVisualizer';
import { addEdge, addNode, bfs, removeEdge, removeNode } from '../../utils/GraphUtils';
import './GraphEditor.css';

const GraphEditor = () => {
    const [nodes, setNodes] = useState(['0', '1', '2', '3', '4']);
    const [edges, setEdges] = useState([
        ['0', '1'],
        ['1', '2'],
        ['2', '3'],
        ['3', '4'],
    ]);
    const [bfsResult, setBfsResult] = useState([]);
    const [traversedEdges, setTraversedEdges] = useState([]);
    const [animationStep, setAnimationStep] = useState(0);
    const [animationInterval, setAnimationInterval] = useState(null);

    const handleAddNode = () => {
        const newNode = prompt('Введіть нову вершину:');
        if (newNode) {
            setNodes((prevNodes) => addNode(prevNodes, newNode));
        }
    };

    const handleAddEdge = () => {
        const node1 = prompt('Введіть першу вершину:');
        const node2 = prompt('Введіть другу вершину:');
        if (node1 && node2) {
            if (!nodes.includes(node1) || !nodes.includes(node2)) {
                alert('Одна або обидві вершини не існують. Додайте їх спочатку!');
                return;
            }
            setEdges((prevEdges) => addEdge(prevEdges, node1, node2));
        }
    };

    const handleRemoveNode = () => {
        const targetNode = prompt('Введіть вершину для видалення:');
        if (targetNode) {
            const { nodes: updatedNodes, edges: updatedEdges } = removeNode(nodes, edges, targetNode);
            setNodes(updatedNodes);
            setEdges(updatedEdges);
        }
    };

    const handleRemoveEdge = () => {
        const node1 = prompt('Введіть першу вершину ребра:');
        const node2 = prompt('Введіть другу вершину ребра:');
        if (node1 && node2) {
            setEdges((prevEdges) => removeEdge(prevEdges, node1, node2));
        }
    };

    const handleStartBFS = () => {
        const startNode = prompt('Введіть стартову вершину для BFS:');
        if (startNode && nodes.includes(startNode)) {
            const { nodes: resultNodes, edges: resultEdges } = bfs(nodes, edges, startNode);
            setBfsResult(resultNodes);
            setTraversedEdges(resultEdges);
            startAnimation(resultNodes);
        } else {
            alert('Вершина не знайдена!');
        }
    };

    const handleResume = () => {
        if (!animationInterval && animationStep < bfsResult.length - 1) {
            const interval = setInterval(() => {
                setAnimationStep((step) => {
                    if (step + 1 >= bfsResult.length) {
                        clearInterval(interval);
                        return step;
                    }
                    return step + 1;
                });
            }, 1000);
            setAnimationInterval(interval);
        }
    };

    const startAnimation = (result) => {
        if (animationInterval) clearInterval(animationInterval);
        setAnimationStep(0);

        const interval = setInterval(() => {
            setAnimationStep((step) => {
                if (step + 1 >= result.length) {
                    clearInterval(interval);
                    return step;
                }
                return step + 1;
            });
        }, 1000);
        setAnimationInterval(interval);
    };

    const handlePause = () => {
        if (animationInterval) {
            clearInterval(animationInterval);
            setAnimationInterval(null);
        }
    };

    const handleStepBack = () => {
        setAnimationStep((step) => Math.max(step - 1, 0));
    };

    const handleStepForward = () => {
        setAnimationStep((step) => Math.min(step + 1, bfsResult.length - 1));
    };

    return (
        <div className="graph-editor">
            <h1>Граф</h1>
            <div className="graph-controls">
                <button onClick={handleAddNode}>Додати вершину</button>
                <button onClick={handleAddEdge}>Додати ребро</button>
                <button onClick={handleRemoveNode}>Видалити вершину</button>
                <button onClick={handleRemoveEdge}>Видалити ребро</button>
            </div>
            <div className="graph-controls-bfs">
                <button onClick={handleStartBFS}>Почати BFS</button>
                <button onClick={handleResume}>Продовжити</button>
                <button onClick={handlePause}>Пауза</button>
                <button onClick={handleStepBack}>Крок назад</button>
                <button onClick={handleStepForward}>Крок вперед</button>
            </div>
            <h3>
                Результат BFS:{' '}
                {bfsResult.slice(0, animationStep + 1).join(' -> ') || 'Результат поки що відсутній'}
            </h3>
            <GraphVisualizer
                nodes={nodes}
                edges={edges}
                bfsResult={bfsResult}
                traversedEdges={traversedEdges}
                currentStep={animationStep}/>
        </div>
    );
};

export default GraphEditor;
